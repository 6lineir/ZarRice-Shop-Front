from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404
from .models import Category, Product, Cart, CartItem, Order, AIJob
from .serializers import CategorySerializer, ProductSerializer, CartSerializer, CartItemSerializer, OrderSerializer, AIJobSerializer
from rest_framework.views import APIView
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.conf import settings
import os
from .models import PaymentSettings
import requests
from urllib.parse import urljoin


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    lookup_field = 'slug'


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CartView(APIView):
    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        cart, _ = Cart.objects.get_or_create(user=user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        # add item to cart
        data = request.data
        cart, _ = Cart.objects.get_or_create(user=request.user if request.user.is_authenticated else None)
        product_id = data.get('product_id')
        quantity = int(data.get('quantity', 1))
        product = get_object_or_404(Product, id=product_id)
        item = CartItem.objects.create(cart=cart, product=product, quantity=quantity, unit_price=product.price)
        serializer = CartItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CartItemDetail(APIView):
    def put(self, request, item_id):
        item = get_object_or_404(CartItem, id=item_id)
        quantity = int(request.data.get('quantity', item.quantity))
        if quantity <= 0:
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        item.quantity = quantity
        item.save()
        return Response(CartItemSerializer(item).data)

    def delete(self, request, item_id):
        item = get_object_or_404(CartItem, id=item_id)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CheckoutView(APIView):
    def post(self, request):
        # minimal: create order from cart
        user = request.user if request.user.is_authenticated else None
        cart, _ = Cart.objects.get_or_create(user=user)
        if not cart.items.exists():
            return Response({'detail': 'Cart empty'}, status=status.HTTP_400_BAD_REQUEST)
        total = sum([it.unit_price * it.quantity for it in cart.items.all()])
        order = Order.objects.create(user=user, total_amount=total, status='processing')
        for it in cart.items.all():
            order.items.create(product=it.product, quantity=it.quantity, unit_price=it.unit_price)
        # clear cart
        cart.items.all().delete()
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ZarinpalInitiateView(APIView):
    """Initiate Zarinpal payment for the current user's cart or provided order_id."""
    def post(self, request):
        user = request.user if request.user.is_authenticated else None
        # create order from current cart if not provided
        order = None
        order_id = request.data.get('order_id')
        if order_id:
            try:
                order = Order.objects.get(id=order_id)
            except Order.DoesNotExist:
                return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            cart, _ = Cart.objects.get_or_create(user=user)
            if not cart.items.exists():
                return Response({'detail': 'Cart empty'}, status=status.HTTP_400_BAD_REQUEST)
            total = sum([it.unit_price * it.quantity for it in cart.items.all()])
            order = Order.objects.create(user=user, total_amount=total, status='processing')
            for it in cart.items.all():
                order.items.create(product=it.product, quantity=it.quantity, unit_price=it.unit_price)
            cart.items.all().delete()

        # get payment settings (prefer DB admin record, fallback to env vars)
        settings_obj = PaymentSettings.objects.first()
        merchant_id = None
        sandbox = True
        if settings_obj and settings_obj.merchant_id and settings_obj.enabled:
            merchant_id = settings_obj.merchant_id
            sandbox = settings_obj.sandbox
        else:
            merchant_id = os.getenv('ZARINPAL_MERCHANT_ID')
            sandbox = os.getenv('ZARINPAL_SANDBOX', '1') in ('1', 'true', 'True')

        if not merchant_id:
            return Response({'detail': 'Payment gateway not configured'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        amount = int(order.total_amount)
        description = f"Order #{order.id} from ZarRice"
        callback_url = request.build_absolute_uri(f"/api/payments/zarinpal/callback/?order_id={order.id}")

        zarinpal_api = 'https://sandbox.zarinpal.com/pg/rest/WebGate/' if sandbox else 'https://www.zarinpal.com/pg/rest/WebGate/'
        payload = {
            'MerchantID': merchant_id,
            'Amount': amount,
            'Description': description,
            'CallbackURL': callback_url,
        }
        try:
            res = requests.post(urljoin(zarinpal_api, 'PaymentRequest.json'), json=payload, timeout=10)
            data = res.json()
        except Exception as e:
            return Response({'detail': 'Payment gateway error', 'error': str(e)}, status=status.HTTP_502_BAD_GATEWAY)

        if data.get('Status') == 100:
            authority = data.get('Authority')
            start_pay = 'https://sandbox.zarinpal.com/pg/StartPay/' if settings_obj.sandbox else 'https://www.zarinpal.com/pg/StartPay/'
            redirect_url = start_pay + authority
            # store authority in order payment_metadata for later verification
            order.payment_provider = 'zarinpal'
            order.payment_metadata = {'authority': authority}
            order.save()
            return Response({'redirect_url': redirect_url})
        else:
            return Response({'detail': 'Payment request failed', 'data': data}, status=status.HTTP_400_BAD_REQUEST)


class ZarinpalCallbackView(APIView):
    """Callback endpoint Zarinpal redirects to after payment attempt."""
    def get(self, request):
        order_id = request.GET.get('order_id')
        authority = request.GET.get('Authority')
        status_param = request.GET.get('Status')
        if not order_id or not authority:
            return Response({'detail': 'Missing parameters'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        settings_obj = PaymentSettings.objects.first()
        merchant_id = None
        sandbox = True
        if settings_obj and settings_obj.merchant_id:
            merchant_id = settings_obj.merchant_id
            sandbox = settings_obj.sandbox
        else:
            merchant_id = os.getenv('ZARINPAL_MERCHANT_ID')
            sandbox = os.getenv('ZARINPAL_SANDBOX', '1') in ('1', 'true', 'True')

        if not merchant_id:
            return Response({'detail': 'Payment gateway not configured'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        if status_param != 'OK':
            order.status = 'cancelled'
            order.payment_metadata.update({'authority': authority, 'status': status_param})
            order.save()
            return Response({'detail': 'Payment canceled by user'}, status=status.HTTP_400_BAD_REQUEST)

        zarinpal_api = 'https://sandbox.zarinpal.com/pg/rest/WebGate/' if sandbox else 'https://www.zarinpal.com/pg/rest/WebGate/'
        payload = {
            'MerchantID': merchant_id,
            'Authority': authority,
            'Amount': int(order.total_amount),
        }
        try:
            res = requests.post(urljoin(zarinpal_api, 'PaymentVerification.json'), json=payload, timeout=10)
            data = res.json()
        except Exception as e:
            return Response({'detail': 'Verification error', 'error': str(e)}, status=status.HTTP_502_BAD_GATEWAY)

        if data.get('Status') == 100 or data.get('Status') == 101:
            order.status = 'processing'
            order.payment_metadata.update({'authority': authority, 'ref_id': data.get('RefID'), 'verification_status': data.get('Status')})
            order.save()
            return Response({'detail': 'Payment verified', 'ref_id': data.get('RefID')})
        else:
            order.status = 'cancelled'
            order.payment_metadata.update({'authority': authority, 'verification_status': data.get('Status'), 'data': data})
            order.save()
            return Response({'detail': 'Payment verification failed', 'data': data}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class AIJobViewSet(viewsets.ModelViewSet):
    queryset = AIJob.objects.all().order_by('-created_at')
    serializer_class = AIJobSerializer

    def create(self, request, *args, **kwargs):
        # create job and return queued status; actual worker integration left for next steps
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        job = serializer.save(status='queued')
        return Response(AIJobSerializer(job).data, status=status.HTTP_201_CREATED)
