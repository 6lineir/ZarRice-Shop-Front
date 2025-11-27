import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import { products, blogPosts } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const heroImage = placeholderImages.find((img) => img.id === 'hero-background');
  const featuredProducts = products.slice(0, 3);
  const latestPosts = blogPosts.slice(0, 2);

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
