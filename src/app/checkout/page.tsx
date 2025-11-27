
'use client';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Logo } from '@/components/logo';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const shipping = items.length > 0 ? 50000 : 0;
  const total = subtotal + shipping;
  const zarinpalLogo = placeholderImages.find(p => p.id === 'zarinpal-logo');

  return (
    <div className="min-h-dvh bg-secondary">
       <header className="bg-background border-b py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                 <Link href="/cart" className='flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary'>
                    <ArrowRight className='h-4 w-4' />
                    بازگشت به سبد خرید
                </Link>
                <Logo />
            </div>
       </header>

      <main className="container py-8 md:py-12 px-4">
         <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">تسویه حساب</h1>
        <div className="grid lg:grid-cols-2 gap-12">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>اطلاعات ارسال</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">نام</Label>
                                <Input id="firstName" placeholder="علی" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="lastName">نام خانوادگی</Label>
                                <Input id="lastName" placeholder="رضایی" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">آدرس کامل</Label>
                            <Input id="address" placeholder="استان، شهر، خیابان، پلاک..." />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">شماره تماس</Label>
                                <Input id="phone" placeholder="09123456789" dir='ltr' />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postalCode">کدپستی</Label>
                                <Input id="postalCode" placeholder="1234567890" dir='ltr' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className='mt-8'>
                    <CardHeader>
                        <CardTitle>انتخاب روش پرداخت</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup defaultValue="zarinpal" className="space-y-4">
                            <Label htmlFor='zarinpal' className='flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary'>
                                <div className='flex items-center gap-4'>
                                    <RadioGroupItem value="zarinpal" id="zarinpal" />
                                    <span>زرین پال</span>
                                </div>
                                {zarinpalLogo && (
                                    <Image src={zarinpalLogo.imageUrl} alt="Zarinpal Logo" width={80} height={25} />
                                )}
                            </Label>
                        </RadioGroup>
                    </CardContent>
                </Card>
            </div>
            
             <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>خلاصه سفارش</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className='max-h-60 overflow-y-auto space-y-3 pr-2'>
                   {items.map(item => (
                       <div key={item.id} className='flex items-center justify-between'>
                           <div className='flex items-center gap-3'>
                               <div className='relative h-14 w-14 rounded-md overflow-hidden'>
                                   {item.image && <Image src={item.image} alt={item.name} fill className='object-cover' />}
                               </div>
                               <div>
                                   <p className='text-sm font-semibold'>{item.name}</p>
                                   <p className='text-xs text-muted-foreground'>{item.weight} x {item.quantity}</p>
                               </div>
                           </div>
                           <p className='text-sm font-medium'>{(item.price * item.quantity).toLocaleString()} تومان</p>
                       </div>
                   ))}
                   </div>
                   <Separator />
                  <div className="flex justify-between text-sm">
                    <span>جمع کل</span>
                    <span>{subtotal.toLocaleString()} تومان</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>هزینه ارسال</span>
                    <span>{shipping > 0 ? `${shipping.toLocaleString()} تومان` : 'رایگان'}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>مبلغ قابل پرداخت</span>
                    <span>{total.toLocaleString()} تومان</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full font-bold">پرداخت و ثبت نهایی سفارش</Button>
                </CardFooter>
              </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
