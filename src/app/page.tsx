
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import ProductCard from '@/components/product-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product, BlogPost } from '@/lib/types';


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
    cookingType: 'کته و آبکش',
    aroma: 'معطر',
    texture: 'خوش‌پخت',
    origin: 'گیلان',
    reviews: [
        { author: 'حسین جلالی', rating: 5, comment: 'برای مصرف روزانه عالیه. قیمت و کیفیتش متناسبه.' },
        { author: 'فاطمه نوری', rating: 4, comment: 'برنج خوب و خوش خوراکیه.' },
    ]
  },
];

const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'هنر پخت برنج ایرانی: تسلط بر ته‌دیگ',
    slug: 'art-of-persian-rice-mastering-tahdig',
    date: '۲۶ اکتبر ۲۰۲۳',
    author: 'ادمین',
    imageId: 'blog-cooking',
    excerpt: 'رازهای پخت "ته‌دیگ" عالی، پوسته طلایی و ترد در کف قابلمه برنج ایرانی را کشف کنید. راهنمای گام به گام ما شما را به یک استاد ته‌دیگ تبدیل خواهد کرد.',
    content: '<p>رازهای پخت "ته‌دیگ" عالی، پوسته طلایی و ترد در کف قابلمه برنج ایرانی را کشف کنید. راهنمای گام به گام ما شما را به یک استاد ته‌دیگ تبدیل خواهد کرد.</p><p>ابتدا برنج مناسب را انتخاب کنید. یک نوع دانه‌بلند مانند طارم یا هاشمی بهترین نتیجه را می‌دهد. برنج را آبکش کنید، سپس کف قابلمه خود را با یک لایه سخاوتمendانه روغن و ماست یا سیب‌زمینی آماده کنید. در نهایت، روی حرارت کم بپزید تا یک پوسته معطر تشکیل شود. صبر کلید موفقیت است!</p>',
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
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setFeaturedProducts(initialProducts.slice(0, 3));
    setLatestPosts(initialBlogPosts.slice(0, 2));
  }, []);
  
  const heroImage = placeholderImages.find((img) => img.id === 'hero-background');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-8 text-center">
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/20 shadow-2xl">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-shadow-lg">
              طلای مزارع ایران
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
              عطر و طعم بی‌نظیر زر برنج را تجربه کنید، جایی که سنت‌های کهن با خلوص مدرن تلاقی می‌کنند.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg">
              <Link href="/products">خرید <ArrowLeft className="mr-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">
            محصولات ویژه ما
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">مشاهده همه محصولات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* From the Blog Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">
            از وبلاگ ما
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {latestPosts.map((post) => {
              const postImage = placeholderImages.find(p => p.id === post.imageId);
              return (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                  <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl">
                    <CardHeader className="p-0">
                      <div className="aspect-video relative">
                        {postImage &&
                          <Image
                            src={postImage.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={postImage.imageHint}
                          />
                        }
                      </div>
                    </CardHeader>
                    <CardContent className="p-5">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">{post.date}</p>
                      <h3 className="font-headline text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                      <div className="mt-4 flex items-center text-sm font-semibold text-primary">
                        بیشتر بخوانید <ArrowLeft className="mr-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/blog">مشاهده وبلاگ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
