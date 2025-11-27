import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, User, LogOut } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="bg-secondary">
      <div className="container py-12 md:py-20 px-4">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-8">حساب کاربری من</h1>
        <div className="grid md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="flex flex-col gap-2">
                  <Button variant="ghost" asChild className="justify-start bg-muted">
                    <Link href="/account">
                      <User className="ml-2 h-4 w-4" />
                      جزئیات حساب
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/account/orders">
                      <ListOrdered className="ml-2 h-4 w-4" />
                      سفارشات من
                    </Link>
                  </Button>
                   <Button variant="ghost" className="justify-start text-destructive hover:text-destructive">
                      <LogOut className="ml-2 h-4 w-4" />
                      خروج
                   </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>
          <main className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>جزئیات حساب</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">خوش آمدید، کاربر!</p>
                <div className="space-y-4">
                    <p><span className="font-semibold">نام:</span> علی رضایی</p>
                    <p><span className="font-semibold">ایمیل:</span> john.doe@example.com</p>
                </div>
                <Button className="mt-6">ویرایش جزئیات</Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
