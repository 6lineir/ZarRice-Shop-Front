
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, User, LogOut, Printer, FileDown, Loader2, PackageSearch, Package, PackageCheck, ThumbsUp, XCircle, Copy } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Order, OrderStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';


const initialOrdersData: Order[] = [
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
        trackingCode: '12345678901234567890',
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
        customer: { name: 'علی رضایی', address: 'تهران، خیابان آزادی، کوچه اول- پلاک ۲', phone: '09123456789' },
        items: [
             { name: 'برنج طارم هاشمی سلطنتی (۱ کیلوگرم)', quantity: 1, price: 129900 },
        ]
    },
];

const getStatusVariant = (status: OrderStatus) => {
    switch(status) {
        case 'تحویل داده شد': return 'default';
        case 'ارسال شده': return 'secondary';
        case 'در حال پردازش': return 'outline';
        case 'لغو شده': return 'destructive';
        default: return 'outline';
    }
}

const statusSteps: { status: OrderStatus, icon: React.ElementType, label: string }[] = [
    { status: 'در حال پردازش', icon: PackageSearch, label: 'ثبت و پردازش' },
    { status: 'ارسال شده', icon: Package, label: 'ارسال شده' },
    { status: 'تحویل داده شد', icon: PackageCheck, label: 'تحویل داده شد' },
];

const InvoiceContent = React.forwardRef<HTMLDivElement, { order: Order | null }>(({ order }, ref) => {
    if (!order) return null;

    const subtotal = order.items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0);
    const shipping = order.total - subtotal;

    return (
        <div ref={ref} className="bg-background text-foreground p-8 md:p-10 font-body">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-start mb-10">
                    <div className="text-right">
                        <Logo />
                        <address className="not-italic text-sm text-muted-foreground mt-4">
                            شرکت زر برنج<br />
                            خیابان برنج ۱۲۳- دره طلایی<br />
                            کالیفرنیا ۹۴۱۲۳<br />
                            support@zarrice.com
                        </address>
                    </div>
                    <div className="text-left">
                        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">فاکتور</h1>
                        <p className="text-sm mt-2">شناسه سفارش: {order.id}</p>
                        <p className="text-sm text-muted-foreground">تاریخ: {order.date}</p>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-8 mb-10 text-sm">
                     <Card className="p-4">
                        <CardHeader className='p-2 pb-3'>
                            <CardTitle className='text-base'>صورتحساب برای:</CardTitle>
                        </CardHeader>
                        <CardContent className='p-2'>
                             <address className="not-italic text-muted-foreground">
                                <strong>{order.customer.name}</strong><br />
                                {order.customer.address}<br />
                                {order.customer.phone}
                            </address>
                        </CardContent>
                    </Card>
                     <Card className="p-4">
                        <CardHeader className='p-2 pb-3'>
                            <CardTitle className='text-base'>وضعیت سفارش:</CardTitle>
                        </CardHeader>
                         <CardContent className='p-2'>
                           <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                         </CardContent>
                    </Card>
                </div>

                <div className="overflow-x-auto">
                    <Table className='text-sm'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50%]">محصول</TableHead>
                                <TableHead className="text-center">تعداد</TableHead>
                                <TableHead className="text-left">قیمت واحد</TableHead>
                                <TableHead className="text-left">جمع کل</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item: any, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                    <TableCell className="text-left whitespace-nowrap">{item.price.toLocaleString()} تومان</TableCell>
                                    <TableCell className="text-left whitespace-nowrap">{(item.price * item.quantity).toLocaleString()} تومان</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-end mt-8">
                    <div className="w-full max-w-sm space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">جمع جزء:</span>
                            <span>{subtotal.toLocaleString()} تومان</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">هزینه ارسال:</span>
                            <span>{shipping.toLocaleString()} تومان</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-base">
                            <span>مبلغ نهایی:</span>
                            <span className='text-primary'>{order.total.toLocaleString()} تومان</span>
                        </div>
                    </div>
                </div>
                
                <footer className="text-center mt-16 border-t pt-6 text-xs text-muted-foreground">
                    <p>از خرید شما سپاسگزاریم!</p>
                    <p>در صورت وجود هرگونه سوال با ما در تماس باشید.</p>
                </footer>
            </div>
        </div>
    )
});
InvoiceContent.displayName = 'InvoiceContent';


export default function OrdersPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const dialogInvoiceRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // TODO: Fetch orders from your API
    setOrders(initialOrdersData);
  }, []);

  const handleDownloadPdf = async () => {
    if (!dialogInvoiceRef.current || !selectedOrder) return;
    setIsDownloading(true);
    try {
        const canvas = await html2canvas(dialogInvoiceRef.current, { 
            scale: 2,
            useCORS: true,
            backgroundColor: window.getComputedStyle(document.body).getPropertyValue('--background').trim(),
         });
        const imgData = canvas.toDataURL('image/png');
        // Calculate PDF size to match canvas aspect ratio
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice-${selectedOrder.id}.pdf`);
    } catch(e) {
        console.error("Error generating PDF:", e);
        toast({
            variant: "destructive",
            title: "خطا در ساخت PDF",
            description: "متاسفانه در تولید فایل PDF مشکلی پیش آمد."
        })
    } finally {
        setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    if (!selectedOrder) return;
    setIsPrinting(true);
  };

  const handleCopyTrackingCode = () => {
    if(selectedOrder?.trackingCode) {
        navigator.clipboard.writeText(selectedOrder.trackingCode);
        toast({ title: "کد رهگیری کپی شد!", description: "می‌توانید از این کد در سایت شرکت پست استفاده کنید." });
    }
  }

  useEffect(() => {
    if (isPrinting) {
      setTimeout(() => {
        window.print();
      }, 100); 
    }
  }, [isPrinting]);

  useEffect(() => {
    const afterPrint = () => {
        setIsPrinting(false);
        document.body.classList.remove('print-active');
    };
    const beforePrint = () => {
      document.body.classList.add('print-active');
    }

    window.addEventListener('afterprint', afterPrint);
    window.addEventListener('beforeprint', beforePrint);

    return () => {
      window.removeEventListener('afterprint', afterPrint);
      window.removeEventListener('beforeprint', beforePrint);
    }
  }, []);


  const currentStatusIndex = selectedOrder ? statusSteps.findIndex(step => step.status === selectedOrder.status) : -1;

  return (
    <div className={`bg-secondary`}>
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
                                <TableHead>رهگیری</TableHead>
                                <TableHead className="text-left">مجموع</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">
                                        <button className="text-primary hover:underline" onClick={() => setSelectedOrder(order)}>
                                            {order.id}
                                        </button>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">{order.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(order.status)}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {order.status !== 'در حال پردازش' && order.status !== 'لغو شده' && (
                                            <Button variant="link" size="sm" onClick={() => { setSelectedOrder(order); setIsTrackingOpen(true); }}>
                                                رهگیری
                                            </Button>
                                        )}
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
      
      {/* Hidden, printable version */}
      <div className="printable-content">
          <InvoiceContent order={selectedOrder} ref={invoiceRef} />
      </div>

      {/* Dialog for viewing invoice */}
      <Dialog open={!!selectedOrder && !isPrinting && !isTrackingOpen} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-4xl p-0">
            {selectedOrder && (
                <>
                  <DialogHeader className='p-6 pb-2'>
                    <DialogTitle>فاکتور سفارش {selectedOrder.id}</DialogTitle>
                    <DialogDescription>تاریخ سفارش: {selectedOrder.date}</DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[70vh] overflow-y-auto">
                    <InvoiceContent order={selectedOrder} ref={dialogInvoiceRef} />
                  </div>
                  <DialogFooter className="border-t p-4 gap-2 flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-x-2">
                    <Button onClick={handleDownloadPdf} disabled={isDownloading}>
                        {isDownloading ? (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        ) : (
                            <FileDown className="ml-2 h-4 w-4" />
                        )}
                        دانلود PDF
                    </Button>
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="ml-2 h-4 w-4" />
                        چاپ فاکتور
                    </Button>
                </DialogFooter>
                </>
            )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isTrackingOpen} onOpenChange={(open) => { if(!open) { setIsTrackingOpen(false); setSelectedOrder(null); } }}>
        <DialogContent className="sm:max-w-md">
           {selectedOrder && (
               <>
                <DialogHeader className='p-6 pb-0'>
                    <DialogTitle>رهگیری سفارش {selectedOrder.id}</DialogTitle>
                    <DialogDescription>وضعیت لحظه‌ای سفارش خود را مشاهده کنید.</DialogDescription>
                </DialogHeader>
                <div className="p-6">
                    {selectedOrder.status === 'لغو شده' ? (
                        <div className='text-center flex flex-col items-center gap-4 py-8'>
                            <XCircle className='h-16 w-16 text-destructive' />
                            <p className='font-semibold text-lg'>این سفارش لغو شده است.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                             <div className="flex justify-between items-start">
                                {statusSteps.map((step, index) => (
                                <div key={step.status} className="flex flex-col items-center relative flex-1">
                                    <div className={cn(
                                        "w-full h-1 bg-muted absolute top-5 -z-10",
                                        index === 0 ? "right-1/2" : (index === statusSteps.length - 1 ? "left-1/2" : ""),
                                        currentStatusIndex > index ? "bg-primary" : (currentStatusIndex === index ? "bg-gradient-to-l from-primary to-muted" : "bg-muted")
                                    )}></div>
                                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center z-10", currentStatusIndex >= index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <p className={cn("mt-2 text-xs text-center", currentStatusIndex >= index ? "font-semibold text-primary" : "text-muted-foreground")}>{step.label}</p>
                                </div>
                                ))}
                            </div>
                            {selectedOrder.trackingCode && (selectedOrder.status === 'ارسال شده' || selectedOrder.status === 'تحویل داده شد') && (
                                <Card className='bg-secondary'>
                                    <CardContent className='p-4 text-center space-y-3'>
                                        <p className='text-sm text-muted-foreground'>کد رهگیری پستی شما:</p>
                                        <div className='flex items-center justify-center gap-2'>
                                            <Button variant='ghost' size='icon' onClick={handleCopyTrackingCode}>
                                                <Copy className='h-4 w-4' />
                                            </Button>
                                            <p className='font-mono font-bold text-lg tracking-widest' dir='ltr'>{selectedOrder.trackingCode}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                             {selectedOrder.status === 'تحویل داده شد' && (
                                 <div className='text-center flex flex-col items-center gap-2 pt-4'>
                                    <ThumbsUp className='h-12 w-12 text-green-500' />
                                    <p className='font-semibold'>از خرید شما متشکریم!</p>
                                </div>
                             )}
                        </div>
                    )}
                </div>
               </>
           )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
