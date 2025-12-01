
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { BlogPost } from '@/lib/types';


const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'هنر پخت برنج ایرانی: تسلط بر ته‌دیگ',
    slug: 'art-of-persian-rice-mastering-tahdig',
    date: '۲۶ اکتبر ۲۰۲۳',
    author: 'ادمین',
    imageId: 'blog-cooking',
    excerpt: 'رازهای پخت "ته‌دیگ" عالی، پوسته طلایی و ترد در کف قابلمه برنج ایرانی را کشف کنید. راهنمای گام به گام ما شما را به یک استاد ته‌دیگ تبدیل خواهد کرد.',
    content: '<p>رازهای پخت "ته‌دیگ" عالی، پوسته طلایی و ترد در کف قابلمه برنج ایرانی را کشف کنید. راهنمای گام به گام ما شما را به یک استاد ته‌دیگ تبدیل خواهد کرد.</p><p>ابتدا برنج مناسب را انتخاب کنید. یک نوع دانه‌بلند مانند طارم یا هاشمی بهترین نتیجه را می‌دهد. برنج را آبکش کنید، سپس کف قابلمه خود را با یک لایه سخاوتمندانه روغن و ماست یا سیب‌زمینی آماده کنید. در نهایت، روی حرارت کم بپزید تا یک پوسته معطر تشکیل شود. صبر کلید موفقیت است!</p>',
  },
  {
    id: '2',
    title: 'از شالیزار تا بشقاب: سفر برنج هاشمی',
    slug: 'from-paddy-to-plate-journey-of-hashemi-rice',
    date: '۱۵ اکتبر ۲۰۲۳',
    author: 'ادمین',
    imageId: 'blog-cultivation',
    excerpt: 'سفر باورنکردنی برنج هاشمی ما را کشف کنید، از شالیزارهای سرسبز شمال ایران تا میز ناهارخوری شما. با روش‌های کشاورزی سنتی که آن را بسیار خاص می‌کند، آشنا شوید.',
    content: '<p>سفر باورنکردنی برنج هاشمی ما را کشف کنید، از شالیزارهای سرسبز شمال ایران تا میز ناهارخوری شما. با روش‌های کشاورزی سنتی که آن را بسیار خاص می‌کند، آشنا شوید.</p><p>کشاورزان ما از تکنیک‌هایی استفاده می‌کنند که از نسل‌ها قبل به ارث رسیده است و به آبیاری طبیعی از کوه‌های البرز متکی هستند. برنج با دست برداشت شده و با دقت آسیاب می‌شود تا عطر لطیف و ارزش غذایی آن حفظ شود.</p>',
  },
  {
    id: '3',
    title: 'نگهداری برنج ممتاز شما: راهنمای تازگی',
    slug: 'storing-premium-rice-guide-to-freshness',
    date: '۳۰ سپتامبر ۲۰۲۳',
    author: 'ادمین',
    imageId: 'blog-storage',
    excerpt: 'شما در بهترین برنج ایرانی سرمایه‌گذاری کرده‌اید. اکنون یاد بگیرید که چگونه آن را به درستی نگهداری کنید تا عطر و طعم استثنایی آن برای ماه‌ها حفظ شود. آسان‌تر از آن چیزی است که فکر می‌کنید!',
    content: '<p>شما در بهترین برنج ایرانی سرمایه‌گذاری کرده‌اید. اکنون یاد بگیرید که چگونه آن را به درستی نگهداری کنید تا عطر و طعم استثنایی آن برای ماه‌ها حفظ شود. آسان‌تر از آن چیزی است که فکر می‌کنید!</p><p>نکته کلیدی این است که آن را خنک، خشک و دور از نور و بوهای قوی نگه دارید. یک ظرف دربسته بهترین دوست شماست. آن را در انبار یا کابینت نگهداری کنید، نه در یخچال. رعایت این مراحل ساده تضمین می‌کند که هر قابلمه برنج به تازگی اولین بار باشد.</p>',
  },
];


export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setBlogPosts(initialBlogPosts);
  }, []);

  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 bg-secondary text-center">
        <div className="container px-4">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold">از مجله زر برنج</h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            بینش‌ها، دستور پخت‌ها و داستان‌هایی از دنیای برنج ممتاز ایرانی.
          </p>
        </div>
      </header>
      
      <main className="py-12 md:py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => {
              const postImage = placeholderImages.find(p => p.id === post.imageId);
              return (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <div className="aspect-video relative overflow-hidden">
                        {postImage &&
                          <Image
                            src={postImage.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={postImage.imageHint}
                          />
                        }
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 text-right flex flex-col flex-grow">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">{post.author} &bull; {post.date}</p>
                      <h2 className="font-headline text-lg sm:text-xl font-semibold mb-3 flex-grow group-hover:text-primary transition-colors">{post.title}</h2>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="mt-auto flex items-center justify-end text-sm font-semibold text-primary">
                        بیشتر بخوانید <ArrowLeft className="mr-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
