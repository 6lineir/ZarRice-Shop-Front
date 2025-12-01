
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
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'هنر پخت برنج ایرانی: تسلط بر ته‌دیگ',
    slug: 'art-of-persian-rice-mastering-tahdig',
    status: 'published',
    date: '۲۰۲۳-۱۰-۲۶T۱۰:۰۰:۰۰Z',
    author: 'ادمین',
    imageId: 'blog-cooking',
    excerpt: 'رازهای پخت "ته‌دیگ" عالی، پوسته طلایی و ترد در کف قابلمه برنج ایرانی را کشف کنید. راهنمای گام به گام ما شما را به یک استاد ته‌دیگ تبدیل خواهد کرد.',
    content: '<p>رازهای پخت "ته‌دیگ" عالی، پوسته طلایی و ترد در کف قابلمه برنج ایرانی را کشف کنید. راهنمای گام به گام ما شما را به یک استاد ته‌دیگ تبدیل خواهد کرد.</p><p>ابتدا برنج مناسب را انتخاب کنید. یک نوع دانه‌بلند مانند طارم یا هاشمی بهترین نتیجه را می‌دهد. برنج را آبکش کنید، سپس کف قابلمه خود را با یک لایه سخاوتمندانه روغن و ماست یا سیب‌زمینی آماده کنید. در نهایت، روی حرارت کم بپزید تا یک پوسته معطر تشکیل شود. صبر کلید موفقیت است!</p>',
  },
  {
    id: '2',
    title: 'از شالیزار تا بشقاب: سفر برنج هاشمی',
    slug: 'from-paddy-to-plate-journey-of-hashemi-rice',
    status: 'published',
    date: '۲۰۲۳-۱۰-۱۵T۱۰:۰۰:۰۰Z',
    author: 'ادمین',
    imageId: 'blog-cultivation',
    excerpt: 'سفر باورنکردنی برنج هاشمی ما را کشف کنید، از شالیزارهای سرسبز شمال ایران تا میز ناهارخوری شما. با روش‌های کشاورزی سنتی که آن را بسیار خاص می‌کند، آشنا شوید.',
    content: '<p>سفر باورنکردنی برنج هاشمی ما را کشف کنید، از شالیزارهای سرسبز شمال ایران تا میز ناهارخوری شما. با روش‌های کشاورزی سنتی که آن را بسیار خاص می‌کند، آشنا شوید.</p><p>کشاورزان ما از تکنیک‌هایی استفاده می‌کنند که از نسل‌ها قبل به ارث رسیده است و به آبیاری طبیعی از کوه‌های البرز متکی هستند. برنج با دست برداشت شده و با دقت آسیاب می‌شود تا عطر لطیف و ارزش غذایی آن حفظ شود.</p>',
  },
  {
    id: '3',
    title: 'نگهداری برنج ممتاز شما: راهنمای تازگی',
    slug: 'storing-premium-rice-guide-to-freshness',
    status: 'draft',
    date: '۲۰۲۳-۰۹-۳۰T۱۰:۰۰:۰۰Z',
    author: 'ادمین',
    imageId: 'blog-storage',
    excerpt: 'شما در بهترین برنج ایرانی سرمایه‌گذاری کرده‌اید. اکنون یاد بگیرید که چگونه آن را به درستی نگهداری کنید تا عطر و طعم استثنایی آن برای ماه‌ها حفظ شود. آسان‌تر از آن چیزی است که فکر می‌کنید!',
    content: '<p>شما در بهترین برنج ایرانی سرمایه‌گذاری کرده‌اید. اکنون یاد بگیرید که چگونه آن را به درستی نگهداری کنید تا عطر و طعم استثنایی آن برای ماه‌ها حفظ شود. آسان‌تر از آن چیزی است که فکر می‌کنید!</p><p>نکته کلیدی این است که آن را خنک، خشک و دور از نور و بوهای قوی نگه دارید. یک ظرف دربسته بهترین دوست شماست. آن را در انبار یا کابینت نگهداری کنید، نه در یخچال. رعایت این مراحل ساده تضمین می‌کند که هر قابلمه برنج به تازگی اولین بار باشد.</p>',
  },
];


export default function AdminBlogPage() {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setBlogPosts(initialBlogPosts);
  }, []);
  
  const handleDeletePost = (postId: string) => {
    setBlogPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
    toast({
        title: "پست حذف شد",
        description: "پست وبلاگ با موفقیت حذف گردید.",
    });
  }

  const getStatusVariant = (status: 'published' | 'draft') => {
      return status === 'published' ? 'default' : 'secondary';
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-2xl font-bold">مدیریت وبلاگ</h1>
            <p className="text-muted-foreground">پست‌های وبلاگ خود را ایجاد و مدیریت کنید.</p>
        </div>
        <Button asChild>
            <Link href="/admin/blog/new">
                <PlusCircle className="ml-2 h-4 w-4" />
                افزودن پست جدید
            </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>لیست پست‌ها</CardTitle>
            <CardDescription>
                مجموعاً {blogPosts.length} پست در وبلاگ شما موجود است.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  تصویر
                </TableHead>
                <TableHead>عنوان</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="hidden md:table-cell">نویسنده</TableHead>
                <TableHead className="hidden md:table-cell">تاریخ انتشار</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => {
                const image = placeholderImages.find(
                  (p) => p.id === post.imageId
                );
                return (
                  <TableRow key={post.id}>
                    <TableCell className="hidden sm:table-cell">
                      {image && (
                        <Image
                          alt={post.title}
                          className="aspect-video rounded-md object-cover"
                          height="64"
                          src={image.imageUrl}
                          width="100"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(post.status)}>
                        {post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.author}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(post.date).toLocaleDateString('fa-IR')}
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
                            <Link href={`/admin/blog/new?id=${post.id}`}>
                                <Edit className="ml-2 h-4 w-4" />
                                ویرایش
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePost(post.id)}>
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
                نمایش <strong>1-{blogPosts.length}</strong> از <strong>{blogPosts.length}</strong> پست
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
