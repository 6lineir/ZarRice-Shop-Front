import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, User, LogOut } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const orders = [
    { id: 'ZR-1701', date: '2023-10-25', status: 'تحویل داده شد', total: 759900 },
    { id: 'ZR-1708', date: '2023-11-12', status: 'ارسال شده', total: 1100000 },
    { id: 'ZR-1715', date: '2023-11-20', status: 'در حال پردازش', total: 129900 },
];

export default function OrdersPage() {
  return (
    <div className="bg-secondary">
      <div className="container py-16 md:py-24">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-8">حساب کاربری من</h1>
        <div className="grid md:grid-cols-3 gap-8">
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
          <main className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>سفارشات من</CardTitle>
              </CardHeader>
              <CardContent>
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
                                <TableCell className="font-medium text-primary hover:underline">
                                    <Link href="#">{order.id}</Link>
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <Badge variant={order.status === 'تحویل داده شد' ? 'default' : 'secondary'}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-left">{order.total.toLocaleString()} تومان</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
