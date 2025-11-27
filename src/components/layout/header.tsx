'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"


const navLinks = [
  { href: '/products', label: 'محصولات' },
  { href: '/blog', label: 'وبلاگ' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
];

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu on pathname change
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const NavContent = () => (
    <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-lg md:text-sm font-medium">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'py-2 transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-foreground/80'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
             <div className="md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">باز کردن منو</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[320px] p-0">
                  <SheetHeader className="p-4 border-b">
                     <SheetTitle>
                       <SheetClose asChild>
                        <Link href="/" aria-label="بازگشت به صفحه اصلی">
                          <Logo />
                        </Link>
                      </SheetClose>
                     </SheetTitle>
                  </SheetHeader>
                   <div className="p-6">
                    <NavContent />
                   </div>
                </SheetContent>
              </Sheet>
            </div>
            <Link href="/cart" className="relative" aria-label={`سبد خرید با ${cartItemCount} کالا`}>
              <ShoppingCart className="h-6 w-6 text-foreground/80 hover:text-primary transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Link>
             <Link href="/account">
              <User className="h-6 w-6 text-foreground/80 hover:text-primary transition-colors" />
            </Link>
            <ThemeToggle />
          </div>
          <div className="hidden md:flex md:items-center">
            <NavContent />
          </div>
           <Link href="/" aria-label="بازگشت به صفحه اصلی">
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
