import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="py-4">
        <div className="container mx-auto px-4 text-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center bg-background p-4 text-center">
        <div className="flex max-w-lg flex-col items-center">
          <SearchX
            className="mb-6 h-24 w-24 text-primary/50"
            strokeWidth={1}
          />
          <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
            ۴۰۴
          </h1>
          <h2 className="mt-4 font-headline text-2xl font-semibold text-foreground sm:text-3xl">
            صفحه مورد نظر یافت نشد
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا به آدرس دیگری
            منتقل شده است.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/">
              <ArrowRight className="ml-2 h-5 w-5" />
              بازگشت به صفحه اصلی
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
