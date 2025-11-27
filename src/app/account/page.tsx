
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, User, LogOut, Home, Edit, PlusCircle, Trash2 } from 'lucide-react';

export default function AccountPage() {

    const user = {
        name: "علی رضایی",
        email: "ali.rezaei@example.com",
        addresses: [
            {
                id: 1,
                title: "خانه",
                address: "تهران، خیابان آزادی، کوچه اول، پلاک ۲، واحد ۳",
                isDefault: true
            },
            {
                id: 2,
                title: "محل کار",
                address: "تهران، میدان انقلاب، ساختمان ایران، طبقه ۴، واحد ۱۲",
                isDefault: false
            }
        ],
        orderStats: {
            totalOrders: 7,
            totalSpent: "4,500,000 تومان"
        }
    }

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
          <main className="md:col-span-3 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>اطلاعات شخصی</CardTitle>
                <CardDescription>اطلاعات کاربری و تماس شما</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    <p><span className="font-semibold">نام:</span> {user.name}</p>
                    <p><span className="font-semibold">ایمیل:</span> {user.email}</p>
                </div>
                <Button className="mt-6">ویرایش اطلاعات</Button>
              </CardContent>
            </Card>

             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>آدرس‌های من</CardTitle>
                        <CardDescription>آدرس‌های ذخیره شده برای ارسال سریع‌تر</CardDescription>
                    </div>
                    <Button variant="outline" size="sm"><PlusCircle className="ml-2 h-4 w-4" /> افزودن آدرس</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                   {user.addresses.map(addr => (
                    <div key={addr.id} className="border p-4 rounded-lg flex items-start justify-between">
                        <div className='flex items-start gap-4'>
                            <Home className="h-6 w-6 text-muted-foreground mt-1" />
                            <div>
                                <p className="font-semibold">{addr.title} {addr.isDefault && <span className="text-xs font-normal text-primary">(پیش‌فرض)</span>}</p>
                                <p className="text-sm text-muted-foreground">{addr.address}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    </div>
                   ))}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>خلاصه فعالیت</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">تعداد کل سفارشات</p>
                        <p className="text-2xl font-bold">{user.orderStats.totalOrders}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">مجموع خرید</p>
                        <p className="text-2xl font-bold">{user.orderStats.totalSpent}</p>
                    </div>
                </CardContent>
            </Card>

          </main>
        </div>
      </div>
    </div>
  );
}
