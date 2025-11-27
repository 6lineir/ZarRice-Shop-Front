
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function BlogPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 bg-secondary text-center">
        <div className="container px-4">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold">از مجله زر برنج</h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            بینش‌ها، دستور پخت‌ها و داستان‌هایی از دنیای برنج ممتاز ایرانی.
          </p>
        </div>
      </header>
      
      <main className="py-12 md:py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => {
              const postImage = placeholderImages.find(p => p.id === post.imageId);
              return (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <div className="aspect-video relative overflow-hidden">
                        {postImage &&
                          <Image
                            src={postImage.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={postImage.imageHint}
                          />
                        }
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 text-right flex flex-col flex-grow">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">{post.author} &bull; {post.date}</p>
                      <h2 className="font-headline text-lg sm:text-xl font-semibold mb-3 flex-grow group-hover:text-primary transition-colors">{post.title}</h2>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="mt-auto flex items-center justify-end text-sm font-semibold text-primary">
                        بیشتر بخوانید <ArrowLeft className="mr-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
