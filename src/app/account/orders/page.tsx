
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, User, LogOut, Printer } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const orders = [
    { 
        id: 'ZR-1701', 
        date: '۱۴۰۲/۰۸/۰۳', 
        status: 'تحویل داده شد', 
        total: 759900,
        customer: { name: 'علی رضایی', address: 'تهران، خیابان آزادی، کوچه اول، پلاک ۲', phone: '09123456789' },
        items: [
            { name: 'برنج صدری دم‌سیاه', quantity: 1, price: 159900 },
            { name: 'برنج طارم هاشمی', quantity: 5, price: 120000 },
        ]
    },
    { 
        id: 'ZR-1708', 
        date: '۱۴۰۲/۰۸/۲۱', 
        status: 'ارسال شده', 
        total: 1100000,
        customer: { name: 'علی رضایی', address: 'تهران، خیابان آزادی، کوچه اول، پلاک ۲', phone: '09123456789' },
        items: [
            { name: 'برنج هاشمی کلاسیک (۱۰ کیلوگرم)', quantity: 1, price: 999900 },
            { name: 'برنج دودی فریدونکنار (۱ کیلوگرم)', quantity: 1, price: 100100 },
        ]
    },
    { 
        id: 'ZR-1715', 
        date: '۱۴۰۲/۰۸/۲۹', 
        status: 'در حال پردازش', 
        total: 129900,
        customer: { name: 'علی رضایی', address: 'تهران، خیابان آزادی، کوچه اول، پلاک ۲', phone: '09123456789' },
        items: [
             { name: 'برنج طارم هاشمی سلطنتی (۱ کیلوگرم)', quantity: 1, price: 129900 },
        ]
    },
];

const getStatusVariant = (status: string) => {
    switch(status) {
        case 'تحویل داده شد': return 'default';
        case 'ارسال شده': return 'secondary';
        case 'در حال پردازش': return 'outline';
        default: return 'outline';
    }
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div className="bg-secondary">
      <div className="container py-12 md:py-20 px-4">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-8">حساب کاربری من</h1>
        <div className="grid md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="flex flex-col gap-2">
                   <Button variant="ghost" asChild className="justify-start">
                    <Link href="/account">
                      <User className="ml-2 h-4 w-4" />
                      جزئیات حساب
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start bg-muted">
                    <Link href="/account/orders">
                      <ListOrdered className="ml-2 h-4 w-4" />
                      سفارشات من
                    </Link>
                  </Button>
                   <Button variant="ghost" className="justify-start text-destructive hover:text-destructive">
                      <LogOut className="ml-2 h-4 w-4" />
                      خروج
                   </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>
          <main className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>سفارشات من</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>شناسه سفارش</TableHead>
                                <TableHead>تاریخ</TableHead>
                                <TableHead>وضعیت</TableHead>
                                <TableHead className="text-left">مجموع</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="text-primary hover:underline" onClick={() => setSelectedOrder(order)}>
                                                    {order.id}
                                                </button>
                                            </DialogTrigger>
                                            {selectedOrder && selectedOrder.id === order.id && (
                                                <DialogContent className="sm:max-w-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle>فاکتور سفارش {order.id}</DialogTitle>
                                                        <DialogDescription>
                                                            تاریخ سفارش: {order.date}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4 space-y-6">
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <h3 className="font-semibold mb-2">ارسال به:</h3>
                                                                <address className="not-italic text-muted-foreground">
                                                                    {order.customer.name}<br />
                                                                    {order.customer.address}<br />
                                                                    {order.customer.phone}
                                                                </address>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold mb-2">وضعیت سفارش:</h3>
                                                                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                                                            </div>
                                                        </div>
                                                        <Separator />
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>محصول</TableHead>
                                                                    <TableHead className="text-center">تعداد</TableHead>
                                                                    <TableHead className="text-left">قیمت واحد</TableHead>
                                                                    <TableHead className="text-left">جمع</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {order.items.map(item => (
                                                                    <TableRow key={item.name}>
                                                                        <TableCell>{item.name}</TableCell>
                                                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                                                        <TableCell className="text-left">{item.price.toLocaleString()} تومان</TableCell>
                                                                        <TableCell className="text-left">{(item.price * item.quantity).toLocaleString()} تومان</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                        <Separator />
                                                         <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">جمع جزء:</span>
                                                                <span>{order.items.reduce((acc, i) => acc + i.price * i.quantity, 0).toLocaleString()} تومان</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">هزینه ارسال:</span>
                                                                <span>{(order.total - order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)).toLocaleString()} تومان</span>
                                                            </div>
                                                            <div className="flex justify-between font-bold text-base">
                                                                <span>مجموع کل:</span>
                                                                <span>{order.total.toLocaleString()} تومان</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button variant="outline" onClick={() => window.print()}>
                                                            <Printer className="ml-2 h-4 w-4" />
                                                            چاپ فاکتور
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            )}
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">{order.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(order.status)}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-left whitespace-nowrap">{order.total.toLocaleString()} تومان</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
