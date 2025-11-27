
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, User, LogOut, Printer, FileDown, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [isPrinting, setIsPrinting] = useState(false);
  const invoiceRef = useRef(null);
  const dialogInvoiceRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
      if (!dialogInvoiceRef.current || !selectedOrder) return;
      setIsDownloading(true);
      try {
        const canvas = await html2canvas(dialogInvoiceRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`invoice-${selectedOrder.id}.pdf`);
      } catch(e) {
          console.error("Error generating PDF:", e);
      } finally {
        setIsDownloading(false);
      }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
        window.print();
    }, 100);
  };

  useEffect(() => {
    const afterPrint = () => {
        setIsPrinting(false);
    };
    window.addEventListener('afterprint', afterPrint);
    return () => window.removeEventListener('afterprint', afterPrint);
  }, []);

  return (
    <div className={`bg-secondary ${isPrinting ? 'print-active' : ''}`}>
      <div className="container py-12 md:py-20 px-4 non-printable">
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
                                        <Dialog onOpenChange={(open) => !open && setSelectedOrder(null)}>
                                            <DialogTrigger asChild>
                                                <button className="text-primary hover:underline" onClick={() => setSelectedOrder(order)}>
                                                    {order.id}
                                                </button>
                                            </DialogTrigger>
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
      
      {selectedOrder && (
          <div className={`printable-content ${isPrinting ? 'visible' : 'hidden'}`}>
            <div ref={invoiceRef} className="p-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">فاکتور سفارش {selectedOrder.id}</h2>
                    <p className="text-sm text-gray-600">
                        تاریخ سفارش: {selectedOrder.date}
                    </p>
                </div>
                <div className="py-4 space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <h3 className="font-semibold mb-2">ارسال به:</h3>
                            <address className="not-italic text-gray-700">
                                {selectedOrder.customer.name}<br />
                                {selectedOrder.customer.address}<br />
                                {selectedOrder.customer.phone}
                            </address>
                        </div>
                        <div className='text-left'>
                            <h3 className="font-semibold mb-2">وضعیت سفارش:</h3>
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800">{selectedOrder.status}</span>
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
                            {selectedOrder.items.map((item: any) => (
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
                    <div className="space-y-2 text-sm pt-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">جمع جزء:</span>
                            <span>{selectedOrder.items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0).toLocaleString()} تومان</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">هزینه ارسال:</span>
                            <span>{(selectedOrder.total - selectedOrder.items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0)).toLocaleString()} تومان</span>
                        </div>
                        <div className="flex justify-between font-bold text-base">
                            <span>مجموع کل:</span>
                            <span>{selectedOrder.total.toLocaleString()} تومان</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

      <Dialog open={!!selectedOrder && !isPrinting} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-3xl">
            {selectedOrder && (
                <>
                <div ref={dialogInvoiceRef} className="p-8">
                    <DialogHeader>
                        <DialogTitle className="text-2xl mb-2">فاکتور سفارش {selectedOrder.id}</DialogTitle>
                        <DialogDescription>
                            تاریخ سفارش: {selectedOrder.date}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <h3 className="font-semibold mb-2">ارسال به:</h3>
                                <address className="not-italic text-muted-foreground">
                                    {selectedOrder.customer.name}<br />
                                    {selectedOrder.customer.address}<br />
                                    {selectedOrder.customer.phone}
                                </address>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">وضعیت سفارش:</h3>
                                <Badge variant={getStatusVariant(selectedOrder.status)}>{selectedOrder.status}</Badge>
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
                                {selectedOrder.items.map((item: any) => (
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
                            <div className="space-y-2 text-sm pt-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">جمع جزء:</span>
                                <span>{selectedOrder.items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0).toLocaleString()} تومان</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">هزینه ارسال:</span>
                                <span>{(selectedOrder.total - selectedOrder.items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0)).toLocaleString()} تومان</span>
                            </div>
                            <div className="flex justify-between font-bold text-base">
                                <span>مجموع کل:</span>
                                <span>{selectedOrder.total.toLocaleString()} تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter className="border-t pt-4">
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="ml-2 h-4 w-4" />
                        چاپ فاکتور
                    </Button>
                    <Button onClick={handleDownloadPdf} disabled={isDownloading}>
                        {isDownloading ? (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        ) : (
                            <FileDown className="ml-2 h-4 w-4" />
                        )}
                        دانلود PDF
                    </Button>
                </DialogFooter>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
