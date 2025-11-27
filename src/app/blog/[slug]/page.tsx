
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use } from 'react';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = use(params);
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const postImage = placeholderImages.find(p => p.id === post.imageId);

  return (
    <article className="bg-background">
      <header className="relative h-[40vh] md:h-[50vh] w-full flex items-end justify-center text-white pb-8 md:pb-16">
        {postImage && (
          <Image
            src={postImage.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={postImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-shadow-lg">
            {post.title}
          </h1>
          <div className="flex justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-background rounded-t-xl md:rounded-t-2xl -mt-8 relative z-20">
        <div className="container max-w-3xl mx-auto py-12 md:py-20 px-4">
          <div
            className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-right prose-p:leading-relaxed prose-headings:font-headline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-12 text-center border-t pt-8">
            <Button asChild>
              <Link href="/blog">
                <ArrowRight className="ml-2 h-5 w-5" />
                بازگشت به وبلاگ
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
