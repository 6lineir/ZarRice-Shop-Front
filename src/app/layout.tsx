import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import PublicLayout from './(public)/layout';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';

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
          <AuthProvider>
            <CartProvider>
              <PublicLayout>{children}</PublicLayout>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
