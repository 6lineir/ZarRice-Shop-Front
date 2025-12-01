
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API based on the slug
    const foundPost = initialBlogPosts.find((p) => p.slug === params.slug);
    if (foundPost) {
      setPost(foundPost);
    }
    setLoading(false);
  }, [params.slug]);
  

  if (loading) {
    // Optional: add a loading spinner or skeleton component
    return <div>در حال بارگذاری...</div>;
  }
  
  if (!post) {
    notFound();
  }

  const postImage = placeholderImages.find(p => p.id === post.imageId);

  return (
    <article className="bg-background">
      <header className="relative h-[40vh] md:h-[50vh] w-full flex items-end justify-center text-white pb-8 md:pb-16">
        {postImage && (
          <Image
            src={postImage.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={postImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-shadow-lg">
            {post.title}
          </h1>
          <div className="flex justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-background rounded-t-xl md:rounded-t-2xl -mt-8 relative z-20">
        <div className="container max-w-3xl mx-auto py-12 md:py-20 px-4">
          <div
            className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-right prose-p:leading-relaxed prose-headings:font-headline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-12 text-center border-t pt-8">
            <Button asChild>
              <Link href="/blog">
                <ArrowRight className="ml-2 h-5 w-5" />
                بازگشت به وبلاگ
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
