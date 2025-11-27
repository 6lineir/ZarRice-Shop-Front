'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Users, ListOrdered, ShoppingBag, CheckCircle } from 'lucide-react';
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-4">
          <CardHeader>
            <CardTitle>سفارشات اخیر</CardTitle>
            <CardDescription>
              شما در این ماه ۲۶۵ سفارش داشته‌اید.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">علی رضایی</p>
                <p className="text-sm text-muted-foreground">ali.rezaei@email.com</p>
              </div>
              <div className="mr-auto font-medium">+۱,۹۹۹,۹۰۰ تومان</div>
            </div>
             <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">سارا محمدی</p>
                <p className="text-sm text-muted-foreground">sara.mohammadi@email.com</p>
              </div>
              <div className="mr-auto font-medium">+۳۹۰,۰۰۰ تومان</div>
            </div>
             <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">مریم حسینی</p>
                <p className="text-sm text-muted-foreground">maryam.hosseini@email.com</p>
              </div>
              <div className="mr-auto font-medium">+۲۹۹,۰۰۰ تومان</div>
            </div>
             <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">رضا احمدی</p>
                <p className="text-sm text-muted-foreground">reza.ahmadi@email.com</p>
              </div>
              <div className="mr-auto font-medium">+۹۹۰,۰۰۰ تومان</div>
            </div>
             <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">فاطمه کریمی</p>
                <p className="text-sm text-muted-foreground">fateme.karimi@email.com</p>
              </div>
              <div className="mr-auto font-medium">+۳۹۰,۰۰۰ تومان</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
