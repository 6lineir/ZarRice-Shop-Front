'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Users, ListOrdered, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { products } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


const salesData = [
  { month: 'فروردین', sales: 186, revenue: 80 },
  { month: 'اردیبهشت', sales: 305, revenue: 200 },
  { month: 'خرداد', sales: 237, revenue: 120 },
  { month: 'تیر', sales: 73, revenue: 190 },
  { month: 'مرداد', sales: 209, revenue: 130 },
  { month: 'شهریور', sales: 214, revenue: 140 },
];

const chartConfig = {
  revenue: {
    label: 'درآمد (میلیون تومان)',
    color: 'hsl(var(--primary))',
  },
  sales: {
    label: 'فروش (عدد)',
    color: 'hsl(var(--accent))',
  },
};

const tasks = [
    { id: 'task1', label: 'بررسی سفارشات جدید' },
    { id: 'task2', label: 'پاسخ به تیکت‌های پشتیبانی' },
    { id: 'task3', label: 'به‌روزرسانی موجودی انبار' },
    { id: 'task4', label: 'نوشتن مقاله جدید برای وبلاگ' },
    { id: 'task5', label: 'برنامه‌ریزی کمپین تخفیف بعدی' },
]

const recentOrders = [
    { id: 'ZR-1708', customerName: 'سارا محمدی', email: 'sara.m@example.com', total: 1100000, status: 'ارسال شده' },
    { id: 'ZR-1715', customerName: 'مریم حسینی', email: 'maryam.h@example.com', total: 129900, status: 'در حال پردازش' },
    { id: 'ZR-1701', customerName: 'علی رضایی', email: 'ali.r@example.com', total: 759900, status: 'تحویل داده شد' },
    { id: 'ZR-1716', customerName: 'حسین جلالی', email: 'hossein.j@example.com', total: 890000, status: 'در حال پردازش' },
    { id: 'ZR-1709', customerName: 'فاطمه کریمی', email: 'fateme.k@example.com', total: 250000, status: 'تحویل داده شد' },
]

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'تحویل داده شد': return 'default';
        case 'ارسال شده': return 'secondary';
        case 'در حال پردازش': return 'outline';
        case 'لغو شده': return 'destructive';
        default: return 'outline';
    }
}

const bestSellingProducts = products.slice(0,4).map((p,i) => ({...p, sales: 210 - (i*30)}));

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">داشبورد ادمین</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مجموع درآمد</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۴۵,۲۳۱,۸۹۰ تومان</div>
            <p className="text-xs text-muted-foreground">
              +۲۰.۱٪ نسبت به ماه گذشته
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مشتریان جدید</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+۲۳۵</div>
            <p className="text-xs text-muted-foreground">
              +۱۸۰.۱٪ نسبت به ماه گذشته
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تعداد سفارشات</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+۱۲,۲۳۴</div>
            <p className="text-xs text-muted-foreground">
              +۱۹٪ نسبت به ماه گذشته
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">محصولات موجود</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۵۷۳</div>
            <p className="text-xs text-muted-foreground">
              +۲ محصول جدید از دیروز
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>نمودار فروش و درآمد</CardTitle>
            <CardDescription>نمای کلی فروش و درآمد در ۶ ماه گذشته</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <BarChart data={salesData} accessibilityLayer>
                 <CartesianGrid vertical={false} />
                 <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                 <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                 <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--primary))" radius={4} name="درآمد" />
                <Bar yAxisId="right" dataKey="sales" fill="hsl(var(--accent))" radius={4} name="فروش" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>لیست کارها</CardTitle>
            <CardDescription>
              کارهای مهمی که باید انجام دهید.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {tasks.map(task => (
                 <div key={task.id} className="flex items-center gap-3">
                    <Checkbox id={task.id} />
                    <Label htmlFor={task.id} className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>{task.label}</Label>
                 </div>
             ))}
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
            <CardTitle>سفارشات اخیر</CardTitle>
            <CardDescription>
              ۵ سفارش اخیری که در فروشگاه ثبت شده است.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>{order.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                        <p className="font-semibold">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground" dir="ltr">{order.email}</p>
                    </div>
                     <div className='text-right'>
                        <p className='font-bold whitespace-nowrap'>{order.total.toLocaleString()} تومان</p>
                        <Badge variant={getStatusVariant(order.status)} className="mt-1">{order.status}</Badge>
                    </div>
                </div>
            ))}
             <Button asChild variant="outline" className="w-full mt-4">
                <Link href="/admin/orders">
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    مشاهده همه سفارشات
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>پرفروش‌ترین محصولات</CardTitle>
             <CardDescription>محصولاتی که بیشترین فروش را این ماه داشته‌اند.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bestSellingProducts.map((product) => {
                const image = placeholderImages.find(p => p.id === product.imageId);
                return (
                  <div key={product.id} className="flex items-center gap-4">
                    {image && (
                      <Link href={`/products/${product.slug}`}>
                        <Image
                          src={image.imageUrl}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="rounded-md object-cover h-16 w-16"
                        />
                      </Link>
                    )}
                    <div className="flex-1">
                      <Link href={`/products/${product.slug}`} className="font-semibold hover:text-primary">{product.name}</Link>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">{product.sales}</p>
                        <p className="text-xs text-muted-foreground">فروش</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
            <CardTitle>آخرین مشتریان</CardTitle>
            <CardDescription>
              ۵ مشتری که اخیراً ثبت‌نام کرده‌اند.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {recentOrders.slice(0, 5).map((customer) => (
                <div key={customer.email} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>{customer.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{customer.customerName}</p>
                        <p className="text-sm text-muted-foreground" dir="ltr">{customer.email}</p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
