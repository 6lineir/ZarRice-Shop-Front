'use client';
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
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

const orders = [
    { id: 'ZR-1701', customer: 'علی رضایی', date: '۱۴۰۲/۰۸/۰۳', status: 'تحویل داده شد', total: 759900 },
    { id: 'ZR-1708', customer: 'سارا محمدی', date: '۱۴۰۲/۰۸/۲۱', status: 'ارسال شده', total: 1100000 },
    { id: 'ZR-1715', customer: 'مریم حسینی', date: '۱۴۰۲/۰۸/۲۹', status: 'در حال پردازش', total: 129900 },
    { id: 'ZR-1702', customer: 'رضا احمدی', date: '۱۴۰۲/۰۸/۰۴', status: 'لغو شده', total: 450000 },
    { id: 'ZR-1709', customer: 'فاطمه کریمی', date: '۱۴۰۲/۰۸/۲۲', status: 'تحویل داده شد', total: 250000 },
    { id: 'ZR-1716', customer: 'حسین جلالی', date: '۱۴۰۲/۰۸/۳۰', status: 'در حال پردازش', total: 890000 },
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
                    <TableCell>{order.customer}</TableCell>
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
                          <DropdownMenuItem>مشاهده جزئیات</DropdownMenuItem>
                          <DropdownMenuItem>تغییر وضعیت</DropdownMenuItem>
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
            <Pagination className="mr-auto">
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
    </div>
  );
}
