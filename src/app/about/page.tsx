import Image from 'next/image';
import { Leaf, ShieldCheck, Truck, Award } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = placeholderImages.find((img) => img.id === 'about-us-story');

  const values = [
    {
      icon: Leaf,
      title: 'Purity',
      description: 'Sourcing only the most natural, non-GMO rice from trusted family farms.',
    },
    {
      icon: Award,
      title: 'Heritage',
      description: 'Honoring centuries of Persian agricultural tradition in every grain.',
    },
    {
      icon: Truck,
      title: 'Freshness',
      description: 'A direct-to-you model ensuring unparalleled freshness and flavor.',
    },
  ];

  const trustBadges = [
    {
      icon: ShieldCheck,
      text: '100% Secure Payments'
    },
    {
      icon: Award,
      text: 'Certified Premium Quality'
    },
    {
      icon: Leaf,
      text: 'Ethically Sourced'
    }
  ];

  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 bg-secondary text-center">
        <div className="container">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">About ZarRice</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From the fertile crescent of ancient Persia to the modern table, our story is one of passion, purity, and perfection.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="font-headline text-3xl">Our Story</h2>
              <p>
                ZarRice was born from a simple desire: to share the authentic taste of premium Iranian rice with the world. Our founders, with roots deep in the rice-growing regions of Gilan and Mazandaran, grew up with the unparalleled aroma and delicate flavor of true Persian rice – a quality often lost in mass-market exports.
              </p>
              <p>
                We embarked on a journey to bridge the gap, building direct relationships with small, family-owned farms that have cultivated these ancient grains for generations. We believe in a process that respects both the farmer and the land, ensuring that every bag of ZarRice is not just a product, but a piece of Persian heritage.
              </p>
              <h3 className="font-headline text-2xl mt-8">Our Mission</h3>
              <p>
                To deliver the world's finest Iranian rice to discerning customers, while upholding principles of sustainability, fair trade, and cultural preservation. We aim to elevate the simple act of cooking rice into a truly golden experience.
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
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12">Our Core Values</h2>
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
