
'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Truck, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Product, ProductCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  {
    id: '4',
    name: 'برنج دودی فریدونکنار',
    slug: 'fereydunkenar-smoked-rice',
    category: 'فریدونکنار',
    description: 'یک تخصص منحصر به فرد از منطقه فریدونکنar، این برنج به آرامی روی تراشه‌های چوب دودی می‌شود و طعمی لطیف و خوشمزه به آن می‌بخشد که هر غذایی را متحول می‌کند. ایده‌آل برای غذاهای دریایی و مرغ.',
    weightOptions: [
      { weight: '۱ کیلوگرم', price: 189900 },
      { weight: '۲.۵ کیلوگرم', price: 459900 },
    ],
    rating: 4.6,
    reviewCount: 55,
    discount: 15,
    images: [{id: 'product-fereydunkenar', type: 'image'}],
    stock: 50,
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

export default function ProductsPage() {
  const headerImage = placeholderImages.find((img) => img.id === 'products-header');

  const [products, setProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setProducts(initialProducts);
    setProductCategories(initialProductCategories);
  }, []);

  useEffect(() => {
    let results = [...products];

    // Filter by category
    if (category !== 'all') {
      results = results.filter(p => p.category === category);
    }

    // Filter by search term (if 3 or more chars)
    if (searchTerm.length >= 3) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort results
    switch(sortOption) {
        case 'price_asc':
            results.sort((a,b) => a.weightOptions[0].price - b.weightOptions[0].price);
            break;
        case 'price_desc':
            results.sort((a,b) => b.weightOptions[0].price - a.weightOptions[0].price);
            break;
        case 'rating':
            results.sort((a,b) => b.rating - a.rating);
            break;
        case 'newest':
            // Assuming higher ID is newer, need a date field for real-world app
            results.sort((a,b) => parseInt(b.id) - parseInt(a.id));
            break;
        case 'featured':
        default:
             results.sort((a, b) => b.discount - a.discount || b.rating - a.rating);
            break;
    }


    setFilteredProducts(results);
  }, [searchTerm, sortOption, category, products]);

  return (
    <div className="bg-background">
      <header className="relative py-16 md:py-24 text-center text-white">
        {headerImage && (
            <Image
                src={headerImage.imageUrl}
                alt={headerImage.description}
                fill
                className="object-cover"
                data-ai-hint={headerImage.imageHint}
                priority
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 px-4">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold">مجموعه برنج ممتاز ما</h1>
          <p className="mt-4 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            طعم اصیل ایرانی را با انواع برنج دست‌چین ما کاوش کنید. هر دانه، داستانی از کیفیت و سنت را روایت می‌کند.
          </p>
        </div>
      </header>

      <main className="py-12 md:py-20">
        <div className="container px-4">
           <div className="mb-8 md:mb-12 bg-primary/5 border-2 border-dashed border-primary/20 rounded-xl p-6 text-center">
            <div className="flex flex-col items-center justify-center">
              <Truck className="h-10 w-10 text-primary mb-3" />
              <h2 className="text-xl md:text-2xl font-bold font-headline text-primary-foreground/90">از شالیزار مستقیم به سفره شما</h2>
              <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-lg mx-auto">ما واسطه‌ها را حذف کرده‌ایم تا تازه‌ترین و باکیفیت‌ترین برنج را با بهترین قیمت به دست شما برسانیم.</p>
              <Button variant="link" asChild className="mt-2">
                <Link href="#products">
                  کاوش در تازه‌ها
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <Card className="mb-8 md:mb-12 shadow-sm sticky top-16 z-40 bg-background/95 backdrop-blur-sm">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-between items-center">
                <div className="relative w-full sm:w-auto sm:flex-1">
                  <Input 
                    placeholder="جستجوی محصولات..." 
                    className="w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <div className='flex gap-3 w-full sm:w-auto'>
                  <Select onValueChange={setCategory} defaultValue="all">
                    <SelectTrigger className="w-full md:w-[160px]">
                      <SelectValue placeholder="دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه دسته‌ها</SelectItem>
                      {productCategories.map(cat => (
                        <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setSortOption} defaultValue="featured">
                    <SelectTrigger className="w-full md:w-[160px]">
                      <SelectValue placeholder="مرتب‌سازی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">ویژه</SelectItem>
                      <SelectItem value="price_asc">قیمت: صعودی</SelectItem>
                      <SelectItem value="price_desc">قیمت: نزولی</SelectItem>
                      <SelectItem value="rating">محبوب‌ترین</SelectItem>
                      <SelectItem value="newest">جدیدترین</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">هیچ محصولی با این مشخصات یافت نشد.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
