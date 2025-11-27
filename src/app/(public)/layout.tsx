'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute = ['/login', '/register'].includes(pathname);
  const isCheckoutRoute = pathname.startsWith('/checkout');

  if (isAdminRoute || isAuthRoute || isCheckoutRoute) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <div className="relative flex min-h-dvh flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </CartProvider>
  );
}
