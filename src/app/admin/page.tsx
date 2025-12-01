
'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Users, ListOrdered, ShoppingBag, ArrowLeft, Trash2, Plus } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Order, Product } from '@/lib/types';


const initialSalesData = [
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

const initialTasks = [
    { id: 'task1', label: 'بررسی سفارشات جدید', completed: false },
    { id: 'task2', label: 'پاسخ به تیکت‌های پشتیبانی', completed: false },
    { id: 'task3', label: 'به‌روزرسانی موجودی انبار', completed: false },
    { id: 'task4', label: 'نوشتن مقاله جدید برای وبلاگ', completed: true },
    { id: 'task5', label: 'برنامه‌ریزی کمپین تخفیف بعدی', completed: false },
]

const initialRecentOrders : (Order & {customer: {name: string, email: string}})[] = [
    { id: 'ZR-1708', customer: {name: 'سارا محمدی', email: 'sara.m@example.com', address: '', phone:''}, total: 1100000, status: 'ارسال شده', date: '1403/02/12', items: [] },
    { id: 'ZR-1715', customer: {name: 'مریم حسینی', email: 'maryam.h@example.com', address: '', phone:''}, total: 129900, status: 'در حال پردازش', date: '1403/02/12', items: [] },
    { id: 'ZR-1701', customer: {name: 'علی رضایی', email: 'ali.r@example.com', address: '', phone:''}, total: 759900, status: 'تحویل داده شد', date: '1403/02/12', items: [] },
    { id: 'ZR-1716', customer: {name: 'حسین جلالی', email: 'hossein.j@example.com', address: '', phone:''}, total: 890000, status: 'در حال پردازش', date: '1403/02/12', items: [] },
    { id: 'ZR-1709', customer: {name: 'فاطمه کریمی', email: 'fateme.k@example.com', address: '', phone:''}, total: 250000, status: 'تحویل داده شد', date: '1403/02/12', items: [] },
]

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'برنج طارم هاشمی سلطنتی',
    slug: 'royal-tarom-hashemi-rice',
    category: 'طارم',
    description: '',
    weightOptions: [],
    rating: 4.8,
    reviewCount: 125,
    discount: 10,
    images: [{id: 'product-tarom', type: 'image'}],
    stock: 100,
    createdAt: '2023-11-03T10:00:00Z',
    cookingType: 'کته و آبکش',
    aroma: 'بسیار معطر',
    texture: 'نرم و پفکی',
    origin: 'گیلان',
    reviews: []
  },
  {
    id: '2',
    name: 'برنج صدری دم‌سیاه شاهانه',
    slug: 'imperial-sadri-domsiah-rice',
    category: 'صدری',
    description: '',
    weightOptions: [ ],
    rating: 4.9,
    reviewCount: 98,
    discount: 0,
    images: [{id: 'product-sadri', type: 'image'}],
    stock: 75,
    createdAt: '2023-11-02T10:00:00Z',
    cookingType: 'آبکش',
    aroma: 'استثنایی',
    texture: 'بسیار سبک',
    origin: 'آستانه اشرفیه',
    reviews: []
  },
  {
    id: '3',
    name: 'برنج هاشمی کلاسیک',
    slug: 'classic-hashemi-rice',
    category: 'هاشمی',
    description: '',
    weightOptions: [],
    rating: 4.7,
    reviewCount: 210,
    discount: 0,
    images: [{id: 'product-hashemi', type: 'image'}],
    stock: 200,
    createdAt: '2023-11-01T10:00:00Z',
    cookingType: 'کته و آبکش',
    aroma: 'معطر',
    texture: 'خوش‌پخت',
    origin: 'گیلان',
    reviews: []
  },
   {
    id: '4',
    name: 'برنج دودی فریدونکنار',
    slug: 'fereydunkenar-smoked-rice',
    category: 'فریدونکنار',
    description: '',
    weightOptions: [ ],
    rating: 4.6,
    reviewCount: 55,
    discount: 15,
    images: [{id: 'product-fereydunkenar', type: 'image'}],
    stock: 50,
    createdAt: '2023-10-30T10:00:00Z',
    cookingType: 'کته',
    aroma: 'دودی',
    texture: 'کمی چسبناک',
    origin: 'فریدونکنار',
    reviews: []
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


export default function AdminDashboardPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskLabel, setNewTaskLabel] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<(Order & {customer: {name: string, email: string}})[]>([]);
  const [salesData, setSalesData] = useState(initialSalesData);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setProducts(initialProducts);
    setRecentOrders(initialRecentOrders);
    setSalesData(initialSalesData);
  }, []);

  const bestSellingProducts = products.slice(0,4).map((p,i) => ({...p, sales: 210 - (i*30)}));


  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    if (newTaskLabel.trim() === '') return;
    const newTask = {
        id: `task${Date.now()}`,
        label: newTaskLabel,
        completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskLabel('');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

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
        <Card>
          <CardHeader>
            <CardTitle>لیست کارها</CardTitle>
            <CardDescription>
              کارهای مهمی که باید انجام دهید.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {tasks.map(task => (
                 <div key={task.id} className="flex items-center gap-3 group">
                    <Checkbox id={task.id} checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} />
                    <Label htmlFor={task.id} className={`flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.label}</Label>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => handleDeleteTask(task.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                 </div>
             ))}
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center gap-2">
                <Input 
                    placeholder="وظیفه جدید..." 
                    value={newTaskLabel} 
                    onChange={(e) => setNewTaskLabel(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <Button onClick={handleAddTask}>
                    <Plus className="ml-2 h-4 w-4" />
                    افزودن
                </Button>
            </div>
          </CardFooter>
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
                        <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                        <p className="font-semibold">{order.customer.name}</p>
                        <p className="text-sm text-muted-foreground" dir="ltr">{order.customer.email}</p>
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
                const image = placeholderImages.find(p => p.id === product.images[0].id);
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
                        <p className="font-bold">{product.reviewCount}</p>
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
                <div key={customer.customer.email} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>{customer.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{customer.customer.name}</p>
                        <p className="text-sm text-muted-foreground" dir="ltr">{customer.customer.email}</p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>

       <Card>
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
    </div>
  );
}
