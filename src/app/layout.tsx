import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';

const vazirmatn = Vazirmatn({ subsets: ['latin', 'arabic'], variable: '--font-vazirmatn' });

export const metadata: Metadata = {
  title: 'زر برنج - برنج ممتاز ایرانی',
  description: 'بهترین انتخاب برنج ممتاز ایرانی، مستقیم تا درب منزل شما. انواع طارم، هاشمی و موارد دیگر را کاوش کنید.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-body antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
