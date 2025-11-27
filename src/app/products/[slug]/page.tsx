'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
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
  Star,
  UserCircle,
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/product-card';

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const [selectedWeight, setSelectedWeight] = useState(
    product.weightOptions[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCart();
  const productImage = placeholderImages.find((p) => p.id === product.imageId);

  const handleAddToCart = () => {
    const itemToAdd = {
      id: `${product.id}-${selectedWeight.weight}`,
      productId: product.id,
      name: product.name,
      price: selectedWeight.price,
      weight: selectedWeight.weight,
      image: productImage?.imageUrl,
      quantity: quantity,
    };
    addItem(itemToAdd);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const productDetails = [
    { icon: ChefHat, label: 'نوع پخت', value: product.cookingType },
    { icon: Flame, label: 'عطر', value: product.aroma },
    { icon: Leaf, label: 'بافت', value: product.texture },
    { icon: MapPin, label: 'منطقه کشت', value: product.origin },
  ];
  
  const relatedProducts = products.filter(
      p => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="container py-8 md:py-16 px-4">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-secondary rounded-lg p-4 sticky top-24 h-max shadow-md">
          {productImage && (
            <div className="aspect-square relative">
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="object-contain hover:scale-105 transition-transform duration-300"
                data-ai-hint={productImage.imageHint}
              />
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
              disabled={addedToCart}
            >
              {addedToCart ? (
                <>
                  <CheckCircle className="ml-2 h-5 w-5" />
                  به سبد خرید اضافه شد!
                </>
              ) : (
                <>
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  افزودن به سبد خرید
                </>
              )}
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

      {relatedProducts.length > 0 && (
        <div className="mt-16 md:mt-24">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">
            محصولات مرتبط
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
            </div>
        </div>
      )}

    </div>
  );
}
