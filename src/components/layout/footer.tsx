import Link from 'next/link';
import { Facebook, Instagram, Twitter, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/logo';

const Footer = () => {
  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/products', label: 'Products' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/account', label: 'My Account' },
  ];

  const socialLinks = [
    { href: '#', icon: Facebook, label: 'Facebook' },
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Twitter, label: 'Twitter' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 pr-8">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Bringing the finest, ethically sourced Iranian rice from the lush fields of Persia to your table.
            </p>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
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
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
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
          
          <div>
            <h3 className="font-headline font-semibold mb-4">Trust & Safety</h3>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <ShieldCheck className="h-8 w-8 text-green-500" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground mt-2">
               <ShieldCheck className="h-8 w-8 text-green-500" />
              <span className="text-sm">Quality Guaranteed</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ZarRice. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
