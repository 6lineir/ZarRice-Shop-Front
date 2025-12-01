
'use client';

import { useState, useEffect, useMemo } from 'react';
import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import StarRating from '@/components/star-rating';
import {
  Minus,
  Plus,
  ShoppingCart,
  CheckCircle,
  Leaf,
  MapPin,
  Flame,
  ChefHat,
  PlayCircle,
  ArrowRight,
  UserCircle,
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from '@/lib/utils';
import type { Product, ProductImage } from '@/lib/types';


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


export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch this data from an API based on the slug
    const foundProduct = initialProducts.find((p) => p.slug === params.slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.images[0]);
      setSelectedWeight(foundProduct.weightOptions[0]);
    }
    setLoading(false);
  }, [params.slug]);


  const { addItem } = useCart();
  
  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!product || !selectedImage || !selectedWeight) {
    notFound();
  }
  
  const mainProductImage = placeholderImages.find((p) => p.id === selectedImage.id);

  const handleAddToCart = () => {
    const itemToAdd = {
      id: `${product.id}-${selectedWeight.weight}`,
      productId: product.id,
      name: product.name,
      price: selectedWeight.price,
      weight: selectedWeight.weight,
      image: placeholderImages.find(p => p.id === product.images[0].id)?.imageUrl,
      quantity: quantity,
    };
    addItem(itemToAdd);
    setIsCartDialogOpen(true);
  };

  const productDetails = [
    { icon: ChefHat, label: 'نوع پخت', value: product.cookingType },
    { icon: Flame, label: 'عطر', value: product.aroma },
    { icon: Leaf, label: 'بافت', value: product.texture },
    { icon: MapPin, label: 'منطقه کشت', value: product.origin },
  ];
  
  const bestSellingProducts = useMemo(() => 
    [...initialProducts].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6)
  , []);

  return (
    <>
    <div className="container py-8 md:py-16 px-4">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4 sticky top-24 h-max">
           <div className="bg-secondary rounded-lg p-4 shadow-md">
            {mainProductImage && (
                <div className="aspect-square relative">
                <Image
                    src={mainProductImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                    data-ai-hint={mainProductImage.imageHint}
                />
                </div>
            )}
            </div>
            {product.images.length > 1 && (
                <div className='grid grid-cols-5 gap-2'>
                    {product.images.map(img => {
                        const thumb = placeholderImages.find(p => p.id === img.id);
                        return thumb ? (
                           <button 
                             key={img.id}
                             onClick={() => setSelectedImage(img)}
                             className={cn("aspect-square relative rounded-md overflow-hidden border-2 transition",
                                selectedImage.id === img.id ? 'border-primary' : 'border-transparent'
                             )}
                           >
                               <Image src={thumb.imageUrl} alt={thumb.description} fill className='object-cover' data-ai-hint={thumb.imageHint} />
                               {img.type === 'video' && (
                                   <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                                       <PlayCircle className='h-6 w-6 text-white' />
                                   </div>
                               )}
                           </button>
                        ) : null;
                    })}
                </div>
            )}
        </div>


        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <StarRating rating={product.rating} />
            <span className="text-muted-foreground text-sm">
              {product.reviewCount} نظر
            </span>
          </div>
          
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {productDetails.map(detail => (
                  <div key={detail.label} className="flex items-center gap-3">
                    <detail.icon className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">{detail.label}</p>
                      <p className="text-sm font-semibold">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">انتخاب وزن</h3>
            <RadioGroup
              defaultValue={selectedWeight.weight}
              onValueChange={(value) => {
                const newWeight = product.weightOptions.find(
                  (w) => w.weight === value
                );
                if (newWeight) setSelectedWeight(newWeight);
              }}
              className="flex gap-3 flex-wrap"
            >
              {product.weightOptions.map((option) => (
                <div key={option.weight}>
                  <RadioGroupItem
                    value={option.weight}
                    id={option.weight}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={option.weight}
                    className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                      selectedWeight.weight === option.weight
                        ? 'border-primary ring-2 ring-primary bg-primary/5'
                        : 'border-border'
                    }`}
                  >
                    <span className="font-bold text-sm sm:text-base">
                      {option.weight}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <h3 className="font-semibold text-lg">تعداد</h3>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="w-10 sm:w-12 text-center font-bold text-sm sm:text-base">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-baseline sm:items-center mb-4">
              <span className="text-muted-foreground text-lg mb-2 sm:mb-0">
                قیمت کل
              </span>
              <span className="font-headline text-3xl sm:text-4xl font-bold text-primary">
                {(selectedWeight.price * quantity).toLocaleString()} تومان
              </span>
            </div>
            <Button
              size="lg"
              className="w-full font-bold text-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="ml-2 h-5 w-5" />
              افزودن به سبد خرید
            </Button>
          </div>
        </div>
      </div>
      
       <div className="mt-16 md:mt-24">
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-4xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-headline">توضیحات محصول</AccordionTrigger>
            <AccordionContent className="prose prose-lg dark:prose-invert max-w-none pt-2">
                <p>{product.description}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-headline">نظرات مشتریان ({product.reviewCount})</AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-3">
                      <UserCircle className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-2 text-base">{review.comment}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

       <div className="mt-16 md:mt-24">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">
                محصولات پرفروش
            </h2>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    direction: "rtl",
                }}
                className="w-full max-w-5xl mx-auto"
                >
                <CarouselContent>
                    {bestSellingProducts.map((p) => (
                    <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <ProductCard product={p} />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    </div>
    <AlertDialog open={isCartDialogOpen} onOpenChange={setIsCartDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                محصول به سبد خرید اضافه شد!
            </AlertDialogTitle>
            <AlertDialogDescription>
              {`"${product.name}" (${selectedWeight.weight}) با موفقیت به سبد خرید شما اضافه شد. چه کاری می‌خواهید انجام دهید؟`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start flex-row-reverse sm:flex-row-reverse mt-4 gap-2">
            <AlertDialogAction onClick={() => router.push('/cart')}>
              <ShoppingCart className="ml-2 h-4 w-4" />
              مشاهده سبد خرید
            </AlertDialogAction>
            <AlertDialogCancel>
              ادامه خرید
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
