
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/star-rating';
import type { Product } from '@/lib/types';
import { placeholderImages } from '@/lib/placeholder-images';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const productImage = placeholderImages.find((p) => p.id === product.images[0].id);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const itemToAdd = {
      id: `${product.id}-${product.weightOptions[0].weight}`,
      productId: product.id,
      name: product.name,
      price: product.weightOptions[0].price,
      weight: product.weightOptions[0].weight,
      image: productImage?.imageUrl,
      quantity: 1,
    };
    addItem(itemToAdd);
  };


  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`} className="block group">
          <div className="aspect-video w-full overflow-hidden">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={productImage.imageHint}
              />
            )}
          </div>
        </Link>
        {product.discount > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2"
          >
            {product.discount}% تخفیف
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-4 text-right">
        <div className="flex items-center justify-between mb-2">
            <StarRating rating={product.rating} />
            <Badge variant="outline">{product.category}</Badge>
        </div>
        <Link href={`/products/${product.slug}`}>
          <CardTitle className="mt-2 text-base sm:text-lg font-headline font-semibold hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-col items-stretch gap-2">
        <div className="text-lg font-bold text-primary text-right sm:text-center w-full mb-2">
          {product.weightOptions[0].price.toLocaleString()} تومان
          <span className="text-sm font-normal text-muted-foreground">/{product.weightOptions[0].weight}</span>
        </div>
        <div className='flex gap-2 w-full'>
            <Button size="sm" asChild className="w-full">
              <Link href={`/products/${product.slug}`}>
                مشاهده و انتخاب
              </Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
