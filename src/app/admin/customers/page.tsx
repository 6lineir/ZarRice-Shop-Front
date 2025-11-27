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
  } from "@/components/ui/pagination"

const customers = [
    { id: 1, name: 'علی رضایی', email: 'ali.rezaei@example.com', orders: 5, totalSpent: 3500000 },
    { id: 2, name: 'سارا محمدی', email: 'sara.mohammadi@example.com', orders: 2, totalSpent: 1450000 },
    { id: 3, name: 'مریم حسینی', email: 'maryam.hosseini@example.com', orders: 8, totalSpent: 5200000 },
    { id: 4, name: 'رضا احمدی', email: 'reza.ahmadi@example.com', orders: 1, totalSpent: 450000 },
    { id: 5, name: 'فاطمه کریمی', email: 'fateme.karimi@example.com', orders: 3, totalSpent: 890000 },
    { id: 6, name: 'حسین جلالی', email: 'hossein.jalali@example.com', orders: 12, totalSpent: 9800000 },
];


export default function AdminCustomersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-2xl font-bold">مشتریان</h1>
            <p className="text-muted-foreground">لیست تمام مشتریان ثبت‌نام کرده در فروشگاه.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>لیست مشتریان</CardTitle>
            <CardDescription>
                مجموعاً {customers.length} مشتری ثبت نام کرده‌اند.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام مشتری</TableHead>
                <TableHead>ایمیل</TableHead>
                <TableHead>تعداد سفارشات</TableHead>
                <TableHead className="text-left">مجموع خرید</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell className='text-left' dir='ltr'>{customer.email}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell className="text-left whitespace-nowrap">{customer.totalSpent.toLocaleString()} تومان</TableCell>
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
                          <DropdownMenuItem>مشاهده پروفایل</DropdownMenuItem>
                          <DropdownMenuItem>ویرایش</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">مسدود کردن</DropdownMenuItem>
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
                نمایش <strong>1-6</strong> از <strong>{customers.length}</strong> مشتری
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
