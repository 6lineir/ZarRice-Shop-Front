
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ListOrdered,
  User,
  LogOut,
  Home,
  Edit,
  PlusCircle,
  Trash2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function AccountPage() {
  const [user, setUser] = useState({
    name: 'علی رضایی',
    email: 'ali.rezaei@example.com',
    phone: '09123456789',
    addresses: [
      {
        id: 1,
        title: 'خانه',
        address: 'تهران، خیابان آزادی، کوچه اول، پلاک ۲، واحد ۳',
        isDefault: true,
      },
      {
        id: 2,
        title: 'محل کار',
        address: 'تهران، میدان انقلاب، ساختمان ایران، طبقه ۴، واحد ۱۲',
        isDefault: false,
      },
    ],
    orderStats: {
      totalOrders: 7,
      totalSpent: '4,500,000 تومان',
    },
  });

  return (
    <div className="bg-secondary">
      <div className="container py-12 md:py-20 px-4">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
          حساب کاربری من
        </h1>
        <div className="grid md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start bg-muted"
                  >
                    <Link href="/account">
                      <User className="ml-2 h-4 w-4" />
                      جزئیات حساب
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/account/orders">
                      <ListOrdered className="ml-2 h-4 w-4" />
                      سفارشات من
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-destructive hover:text-destructive"
                  >
                    <LogOut className="ml-2 h-4 w-4" />
                    خروج
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>
          <main className="md:col-span-3 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>خلاصه فعالیت</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    تعداد کل سفارشات
                  </p>
                  <p className="text-2xl font-bold">
                    {user.orderStats.totalOrders}
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">مجموع خرید</p>
                  <p className="text-2xl font-bold">
                    {user.orderStats.totalSpent}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>اطلاعات شخصی</CardTitle>
                    <CardDescription>اطلاعات کاربری و تماس شما</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Edit className="ml-2 h-4 w-4" />
                        ویرایش
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="p-6 pb-4">
                      <DialogTitle>ویرایش اطلاعات شخصی</DialogTitle>
                      <DialogDescription>
                        اطلاعات خود را در اینجا به‌روزرسانی کنید.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 px-6 text-right">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          نام
                        </Label>
                        <Input
                          id="name"
                          defaultValue={user.name}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          ایمیل
                        </Label>
                        <Input
                          id="email"
                          defaultValue={user.email}
                          className="col-span-3"
                          dir="ltr"
                        />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          شماره تماس
                        </Label>
                        <Input
                          id="phone"
                          defaultValue={user.phone}
                          className="col-span-3"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <DialogFooter className="p-6 pt-4 border-t">
                      <Button type="submit">ذخیره تغییرات</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">نام:</span> {user.name}
                  </p>
                  <p>
                    <span className="font-semibold">ایمیل:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-semibold">شماره تماس:</span>{' '}
                    {user.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>آدرس‌های من</CardTitle>
                  <CardDescription>
                    آدرس‌های ذخیره شده برای ارسال سریع‌تر
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="ml-2 h-4 w-4" /> افزودن آدرس
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="p-6 pb-4">
                      <DialogTitle>افزودن آدرس جدید</DialogTitle>
                      <DialogDescription>
                        آدرس جدید خود را برای ارسال سفارشات وارد کنید.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 px-6 text-right">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address-title" className="text-right">
                          عنوان
                        </Label>
                        <Input
                          id="address-title"
                          placeholder="مثلا: خانه"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="address-details" className="text-right pt-2">
                          آدرس کامل
                        </Label>
                        <Textarea
                          id="address-details"
                          placeholder="استان، شهر، خیابان..."
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter className="p-6 pt-4 border-t">
                      <Button type="submit">ذخیره آدرس</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border p-4 rounded-lg flex items-start justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <Home className="h-6 w-6 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-semibold">
                          {addr.title}{' '}
                          {addr.isDefault && (
                            <span className="text-xs font-normal text-primary">
                              (پیش‌فرض)
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {addr.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                         <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader className="p-6 pb-4">
                                <DialogTitle>ویرایش آدرس</DialogTitle>
                                <DialogDescription>آدرس انتخاب شده را ویرایش کنید.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4 px-6 text-right">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="address-title-edit" className="text-right">عنوان</Label>
                                    <Input id="address-title-edit" defaultValue={addr.title} className="col-span-3"/>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="address-details-edit" className="text-right pt-2">آدرس کامل</Label>
                                    <Textarea id="address-details-edit" defaultValue={addr.address} className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter className="p-6 pt-4 border-t">
                                <Button type="submit">ذخیره تغییرات</Button>
                            </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </main>
        </div>
      </div>
    </div>
  );
}
