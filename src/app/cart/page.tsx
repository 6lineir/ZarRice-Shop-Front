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
  const { items, updateItemQuantity, removeItem, clearCart } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Assuming a flat shipping rate for simplicity
  const shipping = items.length > 0 ? 50000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-secondary">
      <div className="container py-16 md:py-24">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-8">سبد خرید شما</h1>
        {items.length === 0 ? (
          <Card className="text-center p-12">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">سبد خرید شما خالی است</h2>
            <p className="text-muted-foreground mb-6">به نظر می‌رسد هنوز چیزی به سبد خرید خود اضافه نکرده‌اید.</p>
            <Button asChild>
              <Link href="/products">شروع خرید</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="flex items-center p-4">
                  <Button variant="ghost" size="icon" className="ml-4 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  <p className="w-32 text-right font-semibold">{(item.price * item.quantity).toLocaleString()} تومان</p>
                   <div className="flex items-center border rounded-lg mx-4">
                     <Button variant="ghost" size="icon" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-grow text-right">
                    <Link href={`/products/${item.productId}`} className="font-semibold hover:text-primary">{item.name}</Link>
                    <p className="text-sm text-muted-foreground">{item.weight}</p>
                    <p className="text-sm font-bold">{item.price.toLocaleString()} تومان</p>
                  </div>
                   <div className="relative h-24 w-24 rounded-md overflow-hidden ml-4">
                    {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                  </div>
                </Card>
              ))}
              <Button variant="outline" onClick={clearCart}>پاک کردن سبد خرید</Button>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>خلاصه سفارش</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{subtotal.toLocaleString()} تومان</span>
                    <span>جمع کل</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{shipping.toLocaleString()} تومان</span>
                    <span>هزینه ارسال</span>
                  </div>
                   <div className="flex justify-between">
                    <span>در هنگام پرداخت محاسبه می‌شود</span>
                    <span>مالیات</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>{total.toLocaleString()} تومان</span>
                    <span>مجموع</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                  <Button size="lg" className="w-full">ادامه جهت تسویه حساب</Button>
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
