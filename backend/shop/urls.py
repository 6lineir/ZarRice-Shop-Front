from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, CartView, CheckoutView, AIJobViewSet
from .views import CartItemDetail, RegisterView, MeView
from .views import ZarinpalInitiateView, ZarinpalCallbackView

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'ai/jobs', AIJobViewSet, basename='ai-job')

urlpatterns = [
    path('', include(router.urls)),
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/items/<int:item_id>/', CartItemDetail.as_view(), name='cart-item-detail'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/me/', MeView.as_view(), name='me'),
    path('payments/zarinpal/initiate/', ZarinpalInitiateView.as_view(), name='zarinpal-initiate'),
    path('payments/zarinpal/callback/', ZarinpalCallbackView.as_view(), name='zarinpal-callback'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
]
