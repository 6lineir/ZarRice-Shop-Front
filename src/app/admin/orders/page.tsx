
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Order, OrderStatus } from '@/lib/types';


const initialOrders: Order[] = [
    { id: 'ZR-1701', customer: { name: 'علی رضایی', address: 'تهران', phone: '123'}, items: [], date: '۱۴۰۲/۰۸/۰۳', status: 'تحویل داده شد', total: 759900 },
    { id: 'ZR-1708', customer: { name: 'سارا محمدی', address: 'تهران', phone: '123'}, items: [], date: '۱۴۰۲/۰۸/۲۱', status: 'ارسال شده', total: 1100000, trackingCode: '12345678901234567890' },
    { id: 'ZR-1715', customer: { name: 'مریم حسینی', address: 'تهران', phone: '123'}, items: [], date: '۱۴۰۲/۰۸/۲۹', status: 'در حال پردازش', total: 129900 },
    { id: 'ZR-1702', customer: { name: 'رضا احمدی', address: 'تهران', phone: '123'}, items: [], date: '۱۴۰۲/۰۸/۰۴', status: 'لغو شده', total: 450000 },
    { id: 'ZR-1709', customer: { name: 'فاطمه کریمی', address: 'تهران', phone: '123'}, items: [], date: '۱۴۰۲/۰۸/۲۲', status: 'تحویل داده شد', total: 250000 },
    { id: 'ZR-1716', customer: { name: 'حسین جلالی', address: 'تهران', phone: '123'}, items: [], date: '۱۴۰۲/۰۸/۳۰', status: 'در حال پردازش', total: 890000 },
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
  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');
  const [trackingCode, setTrackingCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setTrackingCode(order.trackingCode || '');
    setIsStatusDialogOpen(true);
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
                <TableHead>تاریخ</TableHead>
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
                    <TableCell className="whitespace-nowrap">{order.date}</TableCell>
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
                          <DropdownMenuItem>
                            <Eye className="ml-2 h-4 w-4" />
                            مشاهده جزئیات
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="ml-2 h-4 w-4" />
                            چاپ فاکتور
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                           <DropdownMenuItem onClick={() => handleOpenStatusDialog(order)}>
                             <Truck className="ml-2 h-4 w-4" />
                            تغییر وضعیت
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
                نمایش <strong>1-6</strong> از <strong>{orders.length}</strong> سفارش
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
    </div>
  );
}
