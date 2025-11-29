
'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye, Printer, Truck, Check, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import type { Order, OrderStatus } from '@/lib/types';


const initialOrders: Order[] = [
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
        customer: { name: 'سارا محمدی', address: 'اصفهان، خیابان چهارباغ، ساختمان پارس', phone: '09130000000' },
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
        customer: { name: 'مریم حسینی', address: 'شیراز، خیابان زند، کوچه پنجم', phone: '09170000000' },
        items: [
             { name: 'برنج طارم هاشمی سلطنتی (۱ کیلوگرم)', quantity: 1, price: 129900 },
        ]
    },
    { 
        id: 'ZR-1702', 
        date: '۱۴۰۲/۰۸/۰۴', 
        status: 'لغو شده', 
        total: 450000,
        customer: { name: 'رضا احمدی', address: 'مشهد، بلوار سجاد', phone: '09150000000' },
        items: [
             { name: 'برنج ندا گلستان (۵ کیلوگرم)', quantity: 1, price: 450000 },
        ]
    },
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'تحویل داده شد': return 'default';
        case 'ارسال شده': return 'secondary';
        case 'در حال پردازش': return 'outline';
        case 'لغو شده': return 'destructive';
        default: return 'outline';
    }
}


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');
  const [trackingCode, setTrackingCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setTrackingCode(order.trackingCode || '');
    setIsStatusDialogOpen(true);
  }

  const handleOpenDetailsDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  }

  const handleSaveStatus = () => {
    if (!selectedOrder || !newStatus) return;
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
        setOrders(orders.map(o => 
            o.id === selectedOrder.id 
            ? { ...o, status: newStatus, trackingCode: newStatus === 'ارسال شده' ? trackingCode : undefined }
            : o
        ));
        setIsSaving(false);
        setIsStatusDialogOpen(false);
    }, 1000);
  }


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-2xl font-bold">سفارشات</h1>
            <p className="text-muted-foreground">لیست تمام سفارشات ثبت‌شده در فروشگاه.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>لیست سفارشات</CardTitle>
            <CardDescription>
                مجموعاً {orders.length} سفارش ثبت شده است.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شناسه سفارش</TableHead>
                <TableHead>مشتری</TableHead>
                <TableHead className="hidden md:table-cell">تاریخ</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="text-left">مجموع</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell className="whitespace-nowrap hidden md:table-cell">{order.date}</TableCell>
                    <TableCell>
                        <Badge variant={getStatusVariant(order.status)}>
                            {order.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-left whitespace-nowrap">{order.total.toLocaleString()} تومان</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleOpenDetailsDialog(order)}>
                            <Eye className="ml-2 h-4 w-4" />
                            مشاهده جزئیات
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenStatusDialog(order)}>
                             <Truck className="ml-2 h-4 w-4" />
                            تغییر وضعیت
                          </DropdownMenuItem>
                           <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Printer className="ml-2 h-4 w-4" />
                            چاپ فاکتور
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter>
            <div className="text-xs text-muted-foreground">
                نمایش <strong>1-{orders.length}</strong> از <strong>{orders.length}</strong> سفارش
            </div>
            <Pagination className="ml-auto">
                <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
                </PaginationContent>
            </Pagination>
        </CardFooter>
      </Card>
      
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>تغییر وضعیت سفارش {selectedOrder?.id}</DialogTitle>
                <DialogDescription>وضعیت جدید سفارش را انتخاب کنید.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className='space-y-2'>
                    <Label htmlFor="status">وضعیت سفارش</Label>
                    <Select value={newStatus} onValueChange={(val: OrderStatus) => setNewStatus(val)}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="انتخاب وضعیت" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="در حال پردازش">در حال پردازش</SelectItem>
                            <SelectItem value="ارسال شده">ارسال شده</SelectItem>
                            <SelectItem value="تحویل داده شد">تحویل داده شد</SelectItem>
                             <SelectItem value="لغو شده">لغو شده</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {newStatus === 'ارسال شده' && (
                    <div className="space-y-2 animate-in fade-in">
                        <Label htmlFor="tracking-code">کد رهگیری پستی</Label>
                        <Input 
                            id="tracking-code" 
                            dir="ltr" 
                            placeholder="کد رهگیری ۲۴ رقمی پست"
                            value={trackingCode}
                            onChange={(e) => setTrackingCode(e.target.value)} 
                        />
                    </div>
                )}
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>انصراف</Button>
                <Button onClick={handleSaveStatus} disabled={isSaving}>
                    {isSaving ? (
                        <>
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            در حال ذخیره...
                        </>
                    ) : (
                        <>
                            <Check className="ml-2 h-4 w-4" />
                            ذخیره تغییرات
                        </>
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
            {selectedOrder && (
                <>
                <DialogHeader>
                    <DialogTitle className="text-2xl mb-2">جزئیات سفارش {selectedOrder.id}</DialogTitle>
                    <DialogDescription>
                        تاریخ سفارش: {selectedOrder.date}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 px-1 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="px-5 grid grid-cols-2 gap-4 text-sm">
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
                            {selectedOrder.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                    <TableCell className="text-left">{item.price.toLocaleString()} تومان</TableCell>
                                    <TableCell className="text-left">{(item.price * item.quantity).toLocaleString()} تومان</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Separator />
                        <div className="px-5 space-y-2 text-sm pt-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">جمع جزء:</span>
                            <span>{selectedOrder.items.reduce((acc, i) => acc + i.price * i.quantity, 0).toLocaleString()} تومان</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">هزینه ارسال:</span>
                            <span>{(selectedOrder.total - selectedOrder.items.reduce((acc, i) => acc + i.price * i.quantity, 0)).toLocaleString()} تومان</span>
                        </div>
                        <div className="flex justify-between font-bold text-base">
                            <span>مجموع کل:</span>
                            <span>{selectedOrder.total.toLocaleString()} تومان</span>
                        </div>
                    </div>
                </div>
                <DialogFooter className="border-t pt-4">
                     <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>بستن</Button>
                </DialogFooter>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
