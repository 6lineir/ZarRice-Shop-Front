
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">تنظیمات فروشگاه</h1>
        <p className="text-muted-foreground">
          تنظیمات کلی فروشگاه، درگاه‌های پرداخت و سرویس‌های پیامکی را مدیریت کنید.
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">عمومی</TabsTrigger>
          <TabsTrigger value="payment">درگاه پرداخت</TabsTrigger>
          <TabsTrigger value="sms">پنل پیامک</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات عمومی</CardTitle>
              <CardDescription>
                اطلاعات کلی وب‌سایت خود را به‌روزرسانی کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">نام فروشگاه</Label>
                <Input id="site-name" defaultValue="زر برنج" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">توضیحات متا سایت (SEO)</Label>
                <Textarea id="site-description" defaultValue="بهترین انتخاب برنج ممتاز ایرانی، مستقیم تا درب منزل شما." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
           <Card>
            <CardHeader>
              <CardTitle>تنظیمات درگاه پرداخت</CardTitle>
              <CardDescription>
                اطلاعات مربوط به درگاه‌های پرداخت ایرانی را وارد کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="border p-4 rounded-lg space-y-4">
                     <h3 className='font-semibold'>زرین پال</h3>
                     <div className="space-y-2">
                        <Label htmlFor="zarinpal-merchant">مرچنت کد</Label>
                        <Input id="zarinpal-merchant" placeholder="کد مرچنت زرین پال" dir="ltr" />
                    </div>
                </div>
                 <div className="border p-4 rounded-lg space-y-4">
                     <h3 className='font-semibold'>به پرداخت ملت</h3>
                     <div className="space-y-2">
                        <Label htmlFor="behpardakht-terminal">کد ترمینال</Label>
                        <Input id="behpardakht-terminal" placeholder="کد ترمینال به پرداخت" dir="ltr" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="behpardakht-user">نام کاربری</Label>
                        <Input id="behpardakht-user" placeholder="نام کاربری به پرداخت" dir="ltr" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="behpardakht-pass">رمز عبور</Label>
                        <Input id="behpardakht-pass" type="password" placeholder="رمز عبور به پرداخت" dir="ltr" />
                    </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
           <Card>
            <CardHeader>
              <CardTitle>تنظیمات پنل پیامک</CardTitle>
              <CardDescription>
                برای ارسال پیامک‌های اطلاع‌رسانی، اطلاعات پنل خود را وارد کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="sms-provider">سرویس‌دهنده پیامک</Label>
                  <Input id="sms-provider" placeholder="مثلا: کاوه نگار" />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="sms-apikey">کلید API</Label>
                  <Input id="sms-apikey" placeholder="کلید API سرویس پیامک" dir="ltr" />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="sms-sender">شماره فرستنده</Label>
                  <Input id="sms-sender" placeholder="مثلا: 50001234" dir="ltr" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
          <Button>ذخیره تغییرات</Button>
      </div>

    </div>
  );
}
