
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Package, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Product, BlogPost, ProductCategory } from '@/lib/types';


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
];
const initialProductCategories: ProductCategory[] = [
  { name: 'طارم', description: 'به خاطر عطر دل‌انگیز و بافت پفکی شهرت دارد.' },
  { name: 'صدری', description: 'یک نوع اشرافی با عطری استثنایی.' },
];

type SearchResult = {
    type: 'product' | 'blog' | 'category';
    title: string;
    url: string;
    description: string;
    image?: string;
};

export function SearchDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setProducts(initialProducts);
    setBlogPosts(initialBlogPosts);
    setProductCategories(initialProductCategories);
  }, []);

  const performSearch = useCallback(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const productResults = products
      .filter(p => p.name.toLowerCase().includes(lowerCaseQuery) || p.description.toLowerCase().includes(lowerCaseQuery))
      .map(p => ({
        type: 'product' as const,
        title: p.name,
        url: `/products/${p.slug}`,
        description: p.category,
        image: placeholderImages.find(img => img.id === p.images[0].id)?.imageUrl
      }));

    const blogResults = blogPosts
      .filter(b => b.title.toLowerCase().includes(lowerCaseQuery) || b.excerpt.toLowerCase().includes(lowerCaseQuery))
      .map(b => ({
        type: 'blog' as const,
        title: b.title,
        url: `/blog/${b.slug}`,
        description: b.excerpt,
        image: placeholderImages.find(img => img.id === b.imageId)?.imageUrl
      }));
      
    const categoryResults = productCategories
      .filter(c => c.name.toLowerCase().includes(lowerCaseQuery))
      .map(c => ({
          type: 'category' as const,
          title: c.name,
          url: `/products?category=${c.name}`,
          description: c.description
      }));

    setResults([...productResults, ...blogResults, ...categoryResults]);
  }, [query, products, blogPosts, productCategories]);

  useEffect(() => {
    const debounce = setTimeout(() => {
        performSearch();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, performSearch]);
  
  useEffect(() => {
      if(isOpen) {
          setQuery('');
          setResults([]);
      }
  }, [isOpen])

  const getIcon = (type: SearchResult['type']) => {
      switch(type) {
          case 'product': return <Package className="h-5 w-5 text-muted-foreground" />;
          case 'blog': return <FileText className="h-5 w-5 text-muted-foreground" />;
          case 'category': return <Package className="h-5 w-5 text-muted-foreground" />;
          default: return null;
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 gap-0">
        <DialogHeader className="p-4 border-b">
            <div className='flex items-center gap-2'>
                <Search className='h-5 w-5 text-muted-foreground' />
                <Input
                    placeholder="جستجو در زر برنج..."
                    className="border-none focus-visible:ring-0 shadow-none text-base"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
        </DialogHeader>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
            {results.length > 0 ? (
                <div className='space-y-2'>
                    {results.map((result, index) => (
                        <Link 
                            href={result.url} 
                            key={`${result.type}-${index}`} 
                            className="block p-3 rounded-lg hover:bg-muted"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className='flex items-center gap-4'>
                                {result.image ? (
                                    <div className='relative h-12 w-12 rounded-md overflow-hidden'>
                                        <Image src={result.image} alt={result.title} fill className='object-cover'/>
                                    </div>
                                ) : (
                                    <div className='h-12 w-12 rounded-md bg-secondary flex items-center justify-center'>
                                        {getIcon(result.type)}
                                    </div>
                                )}
                                <div className='flex-1'>
                                    <p className='font-semibold'>{result.title}</p>
                                    <p className='text-sm text-muted-foreground line-clamp-1'>{result.description}</p>
                                </div>
                                <ChevronLeft className='h-5 w-5 text-muted-foreground' />
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                query.length > 1 ? (
                    <p className='text-center text-muted-foreground p-8'>نتیجه‌ای یافت نشد.</p>
                ) : (
                    <p className='text-center text-muted-foreground p-8'>محصولات، مقالات یا دسته‌بندی‌ها را جستجو کنید.</p>
                )
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
