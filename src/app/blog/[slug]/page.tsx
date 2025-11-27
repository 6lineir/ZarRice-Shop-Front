import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Calendar, User } from 'lucide-react';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postImage = placeholderImages.find(p => p.id === post.imageId);

  return (
    <article>
      <header className="relative h-[40vh] md:h-[50vh] w-full flex items-end justify-center text-white pb-12">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto p-4 text-center">
          <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-shadow-lg">
            {post.title}
          </h1>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-200">
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

      <div className="container max-w-3xl mx-auto py-12 md:py-16 px-4">
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
