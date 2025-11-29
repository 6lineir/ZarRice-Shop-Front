
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SheetClose,
} from '@/components/ui/sidebar';
import { Home, ShoppingBag, ListOrdered, Users, LogOut, Settings, LayoutGrid, Sparkles, TicketPercent, FileText, PlusCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';


const adminNavLinks = [
  { href: '/admin', label: 'داشبورد', icon: Home },
  { 
    href: '/admin/products', 
    label: 'محصولات', 
    icon: ShoppingBag,
    subLinks: [
        { href: '/admin/products', label: 'همه محصولات' },
        { href: '/admin/products/new', label: 'افزودن جدید', icon: PlusCircle },
        { href: '/admin/categories', label: 'دسته‌بندی‌ها' },
    ]
  },
  { href: '/admin/orders', label: 'سفارشات', icon: ListOrdered },
  { href: '/admin/customers', label: 'مشتریان', icon: Users },
  { href: '/admin/blog', label: 'وبلاگ', icon: FileText },
  { href: '/admin/discounts', label: 'کدهای تخفیف', icon: TicketPercent },
  { href: '/admin/ai-tools', label: 'ابزارهای AI', icon: Sparkles },
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
                <span className="font-headline text-2xl font-bold">زر برنج</span>
              <ThemeToggle />
            </div>
          </SidebarHeader>
          <SidebarMenu>
            {adminNavLinks.map((link) => (
                link.subLinks ? (
                <SidebarMenuItem key={link.href}>
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            isActive={pathname.startsWith(link.href)}
                            tooltip={{ children: link.label }}
                        >
                            <link.icon />
                            <span>{link.label}</span>
                        </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent asChild>
                            <SidebarMenuSub>
                                {link.subLinks.map((subLink) => (
                                    <SidebarMenuSubItem key={subLink.href}>
                                        <Link href={subLink.href}>
                                            <SidebarMenuSubButton asChild isActive={pathname === subLink.href}>
                                                <span>
                                                 {subLink.icon && <subLink.icon />}
                                                {subLink.label}
                                                </span>
                                            </SidebarMenuSubButton>
                                        </Link>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarMenuItem>
                ) : (
                <SidebarMenuItem key={link.href}>
                    <Link href={link.href}>
                    <SidebarMenuButton
                        isActive={pathname === link.href}
                        tooltip={{ children: link.label }}
                    >
                        <link.icon />
                        <span>{link.label}</span>
                    </SidebarMenuButton>
                    </Link>
              </SidebarMenuItem>
                )
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
          <div className="flex flex-1 items-center justify-start" />
           <div className="flex flex-1 items-center justify-center">
             <Link href="/" aria-label="بازگشت به صفحه اصلی">
              <span className="font-headline text-xl font-bold">زر برنج</span>
            </Link>
           </div>
           <div className="flex flex-1 items-center justify-end">
            <SidebarTrigger />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
