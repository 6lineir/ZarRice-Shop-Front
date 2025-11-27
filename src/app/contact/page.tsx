import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const headerImage = placeholderImages.find((img) => img.id === 'contact-header');

  return (
    <div className="bg-background">
      <header className="relative h-[30vh] md:h-[40vh] w-full flex items-center justify-center text-white">
        {headerImage && (
          <Image
            src={headerImage.imageUrl}
            alt={headerImage.description}
            fill
            className="object-cover"
            data-ai-hint={headerImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">تماس با ما</h1>
          <p className="mt-2 text-lg text-gray-200">ما برای کمک اینجا هستیم. با هر سوالی تماس بگیرید.</p>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-headline text-3xl font-semibold mb-6">در تماس باشید</h2>
              <Card>
                <CardHeader>
                  <CardTitle>برای ما پیام بفرستید</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4 text-right">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lastName">نام خانوادگی</Label>
                        <Input id="lastName" placeholder="رضایی" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="firstName">نام</Label>
                        <Input id="firstName" placeholder="علی" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">ایمیل</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">پیام</Label>
                      <Textarea id="message" placeholder="پیام شما..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full">ارسال پیام</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8 text-right">
              <div>
                <h2 className="font-headline text-3xl font-semibold mb-6">اطلاعات تماس</h2>
                <div className="space-y-4 text-lg">
                  <div className="flex items-start gap-4 justify-end">
                    <div>
                      <h3 className="font-semibold">ایمیل</h3>
                      <a href="mailto:support@zarrice.com" className="text-muted-foreground hover:text-primary">support@zarrice.com</a>
                    </div>
                     <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
                  </div>
                  <div className="flex items-start gap-4 justify-end">
                    <div>
                      <h3 className="font-semibold">تلفن</h3>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary ltr">+۱ (۲۳۴) ۵۶۷-۸۹۰</a>
                    </div>
                     <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
                  </div>
                  <div className="flex items-start gap-4 justify-end">
                    <div>
                      <h3 className="font-semibold">آدرس</h3>
                      <p className="text-muted-foreground">خیابان برنج ۱۲۳، دره طلایی، کالیفرنیا ۹۴۱۲۳</p>
                    </div>
                    <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-headline text-2xl font-semibold mb-4">مکان ما</h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">نقشه گوگل</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
