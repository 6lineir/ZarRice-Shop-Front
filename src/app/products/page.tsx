
'use client';

import { useState, useEffect } from 'react';
import { products, productCategories } from '@/lib/data';
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
import { Search } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';

export default function ProductsPage() {
  const headerImage = placeholderImages.find((img) => img.id === 'products-header');

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState('featured');
  const [category, setCategory] = useState('all');

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
  }, [searchTerm, sortOption, category]);

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
