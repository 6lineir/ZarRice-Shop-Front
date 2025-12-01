
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Product, ProductCategory } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


const initialProducts: Product[] = [
  {
    id: '1',
    name: 'برنج طارم هاشمی سلطنتی',
    slug: 'royal-tarom-hashemi-rice',
    category: 'طارم',
    description: 'یک برنج دانه‌بلند ممتاز از شالیزارهای سرسبز شمال ایران. طارم هاشمی به خاطر عطر دل‌انگیز و بافت پفکی هنگام پخت شهرت دارد و گزینه‌ای محبوب برای غذاهای مجلسی است.',
    weightOptions: [
      { weight: '۱ کیلوگرم', price: 129900 },
      { weight: '۵ کیلوگرم', price: 599900 },
      { weight: '۱۰ کیلوگرم', price: 1100000 },
    ],
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
    reviews: [
        { author: 'مریم رضایی', rating: 5, comment: 'عطر و طعم این برنج فوق‌العاده‌ست! کاملا مجلسی و باکیفیت.' },
        { author: 'علی احمدی', rating: 4, comment: 'برنج خوبیه ولی انتظار داشتم یکم بیشتر قد بکشه.' },
    ]
  },
  {
    id: '2',
    name: 'برنج صدری دم‌سیاه شاهانه',
    slug: 'imperial-sadri-domsiah-rice',
    category: 'صدری',
    description: 'برنج صدری دم‌سیاه که به برنج "دم سیاه" معروف است، یک نوع اشرافی با عطری استثنایی و دانه‌ای کشیده و زیبا است. این برنج سبک و جدا از هم پخته می‌شود و برای همراهی با خورش‌ها عالی است.',
    weightOptions: [
      { weight: '۱ کیلوگرم', price: 159900 },
      { weight: '۵ کیلوگرم', price: 759900 },
    ],
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
    reviews: [
        { author: 'سارا کریمی', rating: 5, comment: 'بهترین برنجی که تا حالا امتحان کردم. قد کشیدنش بی‌نظیره.' },
    ]
  },
  {
    id: '3',
    name: 'برنج هاشمی کلاسیک',
    slug: 'classic-hashemi-rice',
    category: 'هاشمی',
    description: 'یک نوع محبوب و دوست‌داشتنی، برنج هاشمی تعادل فوق‌العاده‌ای از طعم، عطر و بافت را ارائه می‌دهد. این یک انتخاب همه‌کاره برای وعده‌های غذایی روزمره و مناسبت‌های خاص است.',
    weightOptions: [
      { weight: '۱ کیلوگرم', price: 109900 },
      { weight: '۵ کیلوگرم', price: 529900 },
      { weight: '۱۰ کیلوگرم', price: 999900 },
    ],
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
    reviews: [
        { author: 'حسین جلالی', rating: 5, comment: 'برای مصرف روزانه عالیه. قیمت و کیفیتش متناسبه.' },
        { author: 'فاطمه نوری', rating: 4, comment: 'برنج خوب و خوش خوراکیه.' },
    ]
  },
  {
    id: '4',
    name: 'برنج دودی فریدونکنار',
    slug: 'fereydunkenar-smoked-rice',
    category: 'فریدونکنار',
    description: 'یک تخصص منحصر به فرد از منطقه فریدونکنار، این برنج به آرامی روی تراشه‌های چوب دودی می‌شود و طعمی لطیف و خوشمزه به آن می‌بخشد که هر غذایی را متحول می‌کند. ایده‌آل برای غذاهای دریایی و مرغ.',
    weightOptions: [
      { weight: '۱ کیلوگرم', price: 189900 },
      { weight: '۲.۵ کیلوگرم', price: 459900 },
    ],
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
    reviews: [
        { author: 'رضا قاسمی', rating: 5, comment: 'طعم دودیش فوق‌العاده‌ست. برای غذاهای خاص مثل ماهی عالیه.' },
    ]
  },
  {
    id: '5',
    name: 'برنج عنبربو گیلان',
    slug: 'gilan-amber-boo-rice',
    category: 'گیلان',
    description: 'از استان سرسبز گیلان، برنج عنبربو (Ambar-Boo) می‌آید، یک برنج دانه‌کوتاه با عطری مشخصاً شیرین و بافتی کمی چسبناک. عالی برای غذاهای سنتی شمال ایران.',
    weightOptions: [
      { weight: '۱ کیلوگرم', price: 149900 },
      { weight: '۵ کیلوگرم', price: 700000 },
    ],
    rating: 4.8,
    reviewCount: 72,
    discount: 0,
    images: [{id: 'product-gilan', type: 'image'}],
    stock: 80,
    createdAt: '2023-10-29T10:00:00Z',
    cookingType: 'کته',
    aroma: 'شیرین و خاص',
    texture: 'کمی چسبناک',
    origin: 'گیلان',
    reviews: [
        { author: 'زهرا موسوی', rating: 5, comment: 'عطر این برنج آدم رو مست میکنه! برای کته عالیه.' },
    ]
  },
  {
    id: '6',
    name: 'برنج ندا گلستان',
    slug: 'golestan-neda-rice',
    category: 'گلستان',
    description: 'یک نوع پرمحصول و مقاوم که به یکی از اصلی‌ترین مواد غذایی در خانه‌های ایرانی تبدیل شده است. برنج ندا به کیفیت ثابت و خواص پخت خوبش معروف است و انتخابی قابل اعتماد برای وعده‌های روزانه است.',
    weightOptions: [
      { weight: '۵ کیلوگرم', price: 459900 },
      { weight: '۱۰ کیلوگرم', price: 850000 },
      { weight: '۲۰ کیلوگرم', price: 1600000 },
    ],
    rating: 4.5,
    reviewCount: 150,
    discount: 5,
    images: [{id: 'product-golestan', type: 'image'}],
    stock: 300,
    createdAt: '2023-10-28T10:00:00Z',
    cookingType: 'کته و آبکش',
    aroma: 'متوسط',
    texture: 'معمولی',
    origin: 'گلستان',
    reviews: [
        { author: 'محمد اکبری', rating: 4, comment: 'یه برنج اقتصادی و خوب برای دم دستی.' },
    ]
  },
];
const initialProductCategories: ProductCategory[] = [
  { name: 'طارم', description: 'به خاطر عطر دل‌انگیز و بافت پفکی شهرت دارد.' },
  { name: 'صدری', description: 'یک نوع اشرافی با عطری استثنایی.' },
  { name: 'هاشمی', description: 'یک نوع محبوب و دوست‌داشتنی که تعادل فوق‌العاده‌ای ارائه می‌دهد.' },
  { name: 'فریدونکنار', description: 'برنج دودی با طعمی لطیف و خوشمزه.' },
  { name: 'گیلان', description: 'یک برنج دانه‌کوتاه با عطری مشخصاً شیرین.' },
  { name: 'گلستان', description: 'انتخابی قابل اعتماد برای وعده‌های روزانه با کیفیت ثابت.' },
];

export default function AdminProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setProducts(initialProducts);
    setProductCategories(initialProductCategories);
  }, []);

  const handleDeleteProduct = (productId: string) => {
    // Here you would typically call an API to delete the product
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    toast({
      title: "محصول حذف شد",
      description: "محصول با موفقیت از لیست حذف گردید.",
    });
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-2xl font-bold">محصولات</h1>
            <p className="text-muted-foreground">لیست تمام محصولات فروشگاه شما.</p>
        </div>
        <Button asChild>
            <Link href="/admin/products/new">
                <PlusCircle className="ml-2 h-4 w-4" />
                افزودن محصول
            </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>لیست محصولات</CardTitle>
            <CardDescription>
                مجموعاً {products.length} محصول در فروشگاه شما موجود است.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>نام محصول</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>قیمت</TableHead>
                <TableHead className="hidden md:table-cell">موجودی</TableHead>
                <TableHead className="hidden md:table-cell">تاریخ ایجاد</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const image = placeholderImages.find(
                  (p) => p.id === product.images[0].id
                );
                return (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      {image && (
                        <Image
                          alt={product.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={image.imageUrl}
                          width="64"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                        {product.stock > 0 ? 'موجود' : 'ناموجود'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.weightOptions[0].price.toLocaleString()} تومان
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.stock}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(product.createdAt).toLocaleDateString('fa-IR')}
                    </TableCell>
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
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/products/new?id=${product.id}`}>
                              <Edit className="ml-2 h-4 w-4" />
                              ویرایش
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                             <Trash2 className="ml-2 h-4 w-4" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter>
            <div className="text-xs text-muted-foreground">
                نمایش <strong>1-{products.length}</strong> از <strong>{products.length}</strong> محصول
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
    </div>
  );
}
