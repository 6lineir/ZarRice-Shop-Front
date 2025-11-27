import Image from 'next/image';
import { Leaf, ShieldCheck, Truck, Award } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = placeholderImages.find((img) => img.id === 'about-us-story');

  const values = [
    {
      icon: Leaf,
      title: 'خلوص',
      description: 'تامین خالص‌ترین برنج غیرتراریخته از مزارع خانوادگی معتمد.',
    },
    {
      icon: Award,
      title: 'میراث',
      description: 'احترام به قرن‌ها سنت کشاورزی ایرانی در هر دانه برنج.',
    },
    {
      icon: Truck,
      title: 'تازگی',
      description: 'مدل مستقیم به شما که تازگی و طعم بی‌نظیری را تضمین می‌کند.',
    },
  ];

  const trustBadges = [
    {
      icon: ShieldCheck,
      text: 'پرداخت ۱۰۰٪ امن'
    },
    {
      icon: Award,
      text: 'کیفیت برتر تایید شده'
    },
    {
      icon: Leaf,
      text: 'تامین اخلاقی'
    }
  ];

  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 bg-secondary text-center">
        <div className="container">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">درباره زر برنج</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            از هلال حاصلخیز ایران باستان تا سفره مدرن، داستان ما داستان شور، خلوص و کمال است.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg dark:prose-invert max-w-none text-right">
              <h2 className="font-headline text-3xl">داستان ما</h2>
              <p>
                زر برنج از یک آرزوی ساده متولد شد: به اشتراک گذاشتن طعم اصیل برنج ممتاز ایرانی با جهان. بنیان‌گذاران ما، با ریشه‌هایی عمیق در مناطق برنج‌خیز گیلان و مازندران، با عطر بی‌نظیر و طعم لطیف برنج واقعی ایرانی بزرگ شدند – کیفیتی که اغلب در صادرات انبوه از بین می‌رود.
              </p>
              <p>
                ما سفری را برای پر کردن این شکاف آغاز کردیم و روابط مستقیمی با مزارع کوچک و خانوادگی ایجاد کردیم که این دانه‌های باستانی را برای نسل‌ها کشت کرده‌اند. ما به فرآیندی معتقدیم که هم به کشاورز و هم به زمین احترام می‌گذارد و تضمین می‌کند که هر کیسه زر برنج فقط یک محصول نیست، بلکه قطعه‌ای از میراث ایران است.
              </p>
              <h3 className="font-headline text-2xl mt-8">ماموریت ما</h3>
              <p>
                ارائه بهترین برنج ایرانی جهان به مشتریان فهیم، ضمن رعایت اصول پایداری، تجارت منصفانه و حفظ فرهنگ. هدف ما ارتقای عمل ساده پختن برنج به یک تجربه واقعا طلایی است.
              </p>
            </div>
            <div>
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-xl"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12">ارزش‌های اصلی ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="p-8 bg-background rounded-lg shadow-md">
                <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-headline text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-3 text-lg text-muted-foreground">
                <badge.icon className="h-8 w-8 text-green-600" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
