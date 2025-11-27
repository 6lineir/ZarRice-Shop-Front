
import Image from 'next/image';
import { Leaf, ShieldCheck, Truck, Award, Users } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = placeholderImages.find((img) => img.id === 'about-us-story');

  const values = [
    {
      icon: Leaf,
      title: 'خلوص و کیفیت',
      description: 'ما متعهد به تأمین خالص‌ترین و باکیفیت‌ترین برنج غیرتراریخته از بهترین شالیزارهای خانوادگی ایران هستیم.',
    },
    {
      icon: Award,
      title: 'حفظ میراث',
      description: 'ما به قرن‌ها سنت کشاورزی ایرانی احترام می‌گذاریم و تلاش می‌کنیم این میراث گران‌بها را در هر دانه برنج حفظ کنیم.',
    },
    {
      icon: Users,
      title: 'ارتباط مستقیم',
      description: 'مدل فروش مستقیم ما، تازگی بی‌نظیر محصول و ارتباطی شفاف و منصفانه با کشاورزان و مشتریان را تضمین می‌کند.',
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
      icon: Truck,
      text: 'ارسال سریع و مطمئن'
    }
  ];

  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 bg-secondary text-center">
        <div className="container px-4">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold">درباره زر برنج</h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            از هلال حاصلخیز ایران باستان تا سفره مدرن شما، داستان ما داستان شور، خلوص و کمال در هر دانه برنج است.
          </p>
        </div>
      </header>

      <section className="py-12 md:py-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1 prose prose-base sm:prose-lg dark:prose-invert max-w-none text-right">
              <h2 className="font-headline text-3xl font-bold">داستان ما</h2>
              <p>
                زر برنج از یک آرزوی ساده متولد شد: به اشتراک گذاشتن طعم اصیل و فراموش‌نشدنی برنج ممتاز ایرانی با تمام جهان. بنیان‌گذاران ما که در مناطق برنج‌خیز گیلان و مازندران بزرگ شده‌اند، همواره با عطر بی‌نظیر و طعم لطیف برنج واقعی ایرانی زندگی کرده‌اند – کیفیتی که اغلب در دنیای صادرات انبوه و صنعتی امروز از بین می‌رود.
              </p>
              <p>
                ما سفری را برای پر کردن این شکاف آغاز کردیم و با ایجاد روابط مستقیم و پایدار با مزارع کوچک و خانوادگی که نسل اندر نسل این دانه‌های باستانی را کشت می‌کنند، پلی میان سنت و مدرنیته ساختیم. ما به فرآیندی معتقدیم که هم به کشاورز و هم به زمین احترام می‌گذارد و تضمین می‌کند که هر کیسه زر برنج فقط یک محصول نیست، بلکه قطعه‌ای از میراث غنی ایران است.
              </p>
            </div>
            <div className="order-1 md:order-2">
              {aboutImage && (
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">چشم‌انداز و ماموریت ما</h2>
              <p className="mt-4 text-muted-foreground text-base sm:text-lg">
                ارائه بهترین برنج ایرانی جهان به مشتریان فهیم، ضمن رعایت اصول پایداری، تجارت منصفانه و حفظ فرهنگ غنی کشاورزی. هدف ما ارتقای عمل ساده پختن برنج به یک تجربه واقعاً طلایی و به‌یادماندنی است.
              </p>
            </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12">ارزش‌های اصلی ما</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-right flex flex-col items-end">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <value.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="font-headline text-lg md:text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-t">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-3 text-base text-muted-foreground">
                <badge.icon className="h-8 w-8 text-primary" />
                <span className="font-semibold">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
