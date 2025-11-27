
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home, ShoppingBag, ListOrdered, Users, LogOut, Settings, LayoutGrid } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminNavLinks = [
  { href: '/admin', label: 'داشبورد', icon: Home },
  { href: '/admin/products', label: 'محصولات', icon: ShoppingBag },
  { href: '/admin/categories', label: 'دسته‌بندی‌ها', icon: LayoutGrid },
  { href: '/admin/orders', label: 'سفارشات', icon: ListOrdered },
  { href: '/admin/customers', label: 'مشتریان', icon: Users },
  { href: '/admin/settings', label: 'تنظیمات', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar side="right">
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center justify-between">
              <Logo />
              <ThemeToggle />
            </div>
          </SidebarHeader>
          <SidebarMenu>
            {adminNavLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(link.href) && (link.href !== '/admin' || pathname === '/admin')}
                    tooltip={{ children: link.label }}
                  >
                    <link.icon />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                 <Link href="/">
                    <SidebarMenuButton tooltip={{ children: "خروج" }}>
                        <LogOut />
                        <span>خروج</span>
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm md:hidden">
          <SidebarTrigger />
          <Logo />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
