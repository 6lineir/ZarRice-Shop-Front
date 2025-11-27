import Link from 'next/link';
import { Facebook, Instagram, Twitter, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/logo';

const Footer = () => {
  const quickLinks = [
    { href: '/about', label: 'درباره ما' },
    { href: '/products', label: 'محصولات' },
    { href: '/blog', label: 'وبلاگ' },
    { href: '/contact', label: 'تماس با ما' },
    { href: '/account', label: 'حساب کاربری' },
  ];

  const socialLinks = [
    { href: '#', icon: Facebook, label: 'فیسبوک' },
    { href: '#', icon: Instagram, label: 'اینستاگرام' },
    { href: '#', icon: Twitter, label: 'توییتر' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-right">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mt-2">
              عرضه بهترین و با کیفیت‌ترین برنج ایرانی از شالیزارهای سرسبز ایران به سفره شما.
            </p>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">ما را دنبال کنید</h3>
            <div className="flex space-x-4 space-x-reverse justify-end md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-headline font-semibold mb-4">اعتماد و امنیت</h3>
            <div className="flex flex-col gap-3 items-end md:items-start">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="h-7 w-7 text-green-600" />
                  <span className="text-sm">پرداخت امن</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                   <ShieldCheck className="h-7 w-7 text-green-600" />
                   <span className="text-sm">کیفیت تضمین‌شده</span>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} زر برنج. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
