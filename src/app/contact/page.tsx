
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const headerImage = placeholderImages.find((img) => img.id === 'contact-header');

  const contactInfo = [
      {
        icon: Mail,
        title: "ایمیل",
        content: "support@zarrice.com",
        href: "mailto:support@zarrice.com"
      },
      {
        icon: Phone,
        title: "تلفن",
        content: "+۱ (۲۳۴) ۵۶۷-۸۹۰",
        href: "tel:+1234567890",
        ltr: true
      },
      {
        icon: MapPin,
        title: "آدرس",
        content: "خیابان برنج ۱۲۳، دره طلایی، کالیفرنیا ۹۴۱۲۳",
      }
  ];

  return (
    <div className="bg-background">
      <header className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center text-white text-center">
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
        <div className="relative z-10 p-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">تماس با ما</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">ما برای کمک اینجا هستیم. با هر سوال، پیشنهاد یا نظری با ما در تماس باشید.</p>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            
            <div className="lg:col-span-3">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-3xl font-headline">برای ما پیام بفرستید</CardTitle>
                  <CardDescription>فرم زیر را پر کنید تا در اسرع وقت با شما تماس بگیریم.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6 text-right">
                    <div className="grid sm:grid-cols-2 gap-6">
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
                      <Input id="email" type="email" placeholder="ali.rezaei@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">پیام شما</Label>
                      <Textarea id="message" placeholder="لطفاً پیام خود را اینجا بنویسید..." rows={6} />
                    </div>
                    <Button type="submit" size="lg" className="w-full">ارسال پیام</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-8 text-right">
                <h2 className="font-headline text-3xl font-semibold mb-6">اطلاعات تماس</h2>
                <div className="space-y-6">
                    {contactInfo.map((info) => (
                        <div key={info.title} className="flex items-start gap-4 justify-end">
                            <div className="text-right">
                                <h3 className="font-semibold text-lg">{info.title}</h3>
                                {info.href ? (
                                    <a href={info.href} className={`text-muted-foreground hover:text-primary ${info.ltr ? 'ltr' : ''}`}>{info.content}</a>
                                ) : (
                                    <p className="text-muted-foreground">{info.content}</p>
                                )}
                            </div>
                            <div className="bg-primary/10 p-3 rounded-full">
                                <info.icon className="h-6 w-6 text-primary shrink-0" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pt-8">
                  <h3 className="font-headline text-2xl font-semibold mb-4">مکان ما روی نقشه</h3>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-md">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2439999999997!2d-122.419415!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064a3454653%3A0x2d0b5e7d4b4a3a6b!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1628882512345" 
                        width="100%" 
                        height="100%" 
                        style={{ border:0 }} 
                        allowFullScreen={false}
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map Location"
                        >
                    </iframe>
                  </div>
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
