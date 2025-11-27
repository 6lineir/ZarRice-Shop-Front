'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { items, updateItemQuantity, removeItem, clearCart, subtotal } = useCart();
  const shipping = items.length > 0 ? 50000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-secondary">
      <div className="container py-12 md:py-20 px-4">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-8">سبد خرید شما</h1>
        {items.length === 0 ? (
          <Card className="text-center p-8 sm:p-12">
            <ShoppingBag className="h-20 w-20 sm:h-24 sm:w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">سبد خرید شما خالی است</h2>
            <p className="text-muted-foreground mb-6">به نظر می‌رسد هنوز چیزی به سبد خرید خود اضافه نکرده‌اید.</p>
            <Button asChild>
              <Link href="/products">شروع خرید</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="flex items-center p-3 sm:p-4">
                  <div className="flex-1 flex items-center">
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-md overflow-hidden ml-4">
                      {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                    </div>
                    <div className="flex-grow text-right">
                      <Link href={`/products/${item.productId}`} className="font-semibold hover:text-primary text-sm sm:text-base">{item.name}</Link>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.weight}</p>
                      <p className="text-sm sm:text-base font-bold sm:hidden mt-2">{(item.price * item.quantity).toLocaleString()} تومان</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="w-28 text-right font-semibold hidden sm:block text-base">{(item.price * item.quantity).toLocaleString()} تومان</p>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8 sm:h-9 sm:w-9" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </Card>
              ))}
              <Button variant="outline" onClick={clearCart}>پاک کردن سبد خرید</Button>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>خلاصه سفارش</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-2">
                      <Input placeholder="کد تخفیف" className="flex-1" />
                      <Button variant="secondary">اعمال</Button>
                    </div>
                   <Separator />
                  <div className="flex justify-between">
                    <span>جمع کل</span>
                    <span>{subtotal.toLocaleString()} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span>هزینه ارسال</span>
                    <span>{shipping > 0 ? `${shipping.toLocaleString()} تومان` : 'رایگان'}</span>
                  </div>
                   <div className="flex justify-between text-muted-foreground">
                    <span>مالیات</span>
                    <span>محاسبه در پرداخت</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>مجموع</span>
                    <span>{total.toLocaleString()} تومان</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/checkout">ادامه جهت تسویه حساب</Link>
                  </Button>
                  <Button variant="link" asChild>
                    <Link href="/products">ادامه خرید</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
