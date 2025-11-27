
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Package, FileText, ChevronLeft } from 'lucide-react';
import { products, blogPosts, productCategories } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

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
  }, [query]);

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
