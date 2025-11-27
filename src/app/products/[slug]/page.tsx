'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import StarRating from '@/components/star-rating';
import { Minus, Plus, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }
  
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0]);
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
  
  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-secondary rounded-lg p-4">
          {productImage && (
            <div className="aspect-square relative">
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
                data-ai-hint={productImage.imageHint}
              />
            </div>
          )}
        </div>
        
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <StarRating rating={product.rating} />
            <span className="text-muted-foreground text-sm">{product.reviewCount} نظر</span>
          </div>

          <p className="mt-6 text-lg text-muted-foreground">{product.description}</p>
          
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">انتخاب وزن</h3>
            <RadioGroup
              defaultValue={selectedWeight.weight}
              onValueChange={(value) => {
                const newWeight = product.weightOptions.find(w => w.weight === value);
                if (newWeight) setSelectedWeight(newWeight);
              }}
              className="flex gap-4 flex-wrap"
            >
              {product.weightOptions.map((option) => (
                <div key={option.weight}>
                  <RadioGroupItem value={option.weight} id={option.weight} className="sr-only" />
                  <Label 
                    htmlFor={option.weight}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedWeight.weight === option.weight ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
                  >
                    <span className="font-bold text-base">{option.weight}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="mt-8 flex items-center gap-4">
            <h3 className="font-semibold text-lg">تعداد</h3>
            <div className="flex items-center border rounded-lg">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-8">
            <div className="flex justify-between items-center mb-6">
                <span className="text-muted-foreground text-xl">قیمت کل</span>
                <span className="font-headline text-4xl font-bold text-primary">
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
                  به سبد خرید اضافه شد!
                  <CheckCircle className="mr-2 h-5 w-5" />
                </>
              ) : (
                <>
                  افزودن به سبد خرید
                  <ShoppingCart className="mr-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
