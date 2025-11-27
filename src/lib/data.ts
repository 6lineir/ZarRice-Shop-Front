import { Product, BlogPost, ProductCategory } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Royal Tarom Hashemi Rice',
    slug: 'royal-tarom-hashemi-rice',
    category: 'Tarom',
    description: 'A premium long-grain rice from the lush paddies of northern Iran. Tarom Hashemi is celebrated for its delightful aroma and fluffy texture when cooked, making it a favorite for festive dishes.',
    weightOptions: [
      { weight: '1kg', price: 12.99 },
      { weight: '5kg', price: 59.99 },
      { weight: '10kg', price: 110.00 },
    ],
    rating: 4.8,
    reviewCount: 125,
    discount: 10,
    imageId: 'product-tarom',
    stock: 100
  },
  {
    id: '2',
    name: 'Imperial Sadri Domsiah Rice',
    slug: 'imperial-sadri-domsiah-rice',
    category: 'Sadri',
    description: 'Known as the "black tail" rice, Sadri Domsiah is an aristocratic variety with an exceptionally fragrant aroma and a slender, elegant grain. It cooks up light and separate, perfect for pairing with stews.',
    weightOptions: [
      { weight: '1kg', price: 15.99 },
      { weight: '5kg', price: 75.99 },
    ],
    rating: 4.9,
    reviewCount: 98,
    discount: 0,
    imageId: 'product-sadri',
    stock: 75
  },
  {
    id: '3',
    name: 'Classic Hashemi Rice',
    slug: 'classic-hashemi-rice',
    category: 'Hashemi',
    description: 'A popular and beloved variety, Hashemi rice offers a wonderful balance of flavor, fragrance, and texture. It is a versatile choice for everyday meals and special occasions alike.',
    weightOptions: [
      { weight: '1kg', price: 10.99 },
      { weight: '5kg', price: 52.99 },
      { weight: '10kg', price: 99.99 },
    ],
    rating: 4.7,
    reviewCount: 210,
    discount: 0,
    imageId: 'product-hashemi',
    stock: 200
  },
  {
    id: '4',
    name: 'Fereydunkenar Smoked Rice',
    slug: 'fereydunkenar-smoked-rice',
    category: 'Fereydunkenar',
    description: 'A unique specialty from the Fereydunkenar region, this rice is gently smoked over wood chips, imparting a subtle, savory flavor that transforms any dish. Ideal for seafood and poultry.',
    weightOptions: [
      { weight: '1kg', price: 18.99 },
      { weight: '2.5kg', price: 45.99 },
    ],
    rating: 4.6,
    reviewCount: 55,
    discount: 15,
    imageId: 'product-fereydunkenar',
    stock: 50
  },
  {
    id: '5',
    name: 'Gilan Amber-Boo Rice',
    slug: 'gilan-amber-boo-rice',
    category: 'Gilan',
    description: 'From the verdant province of Gilan comes Amber-Boo (Ambar-Boo), a short-grain rice with a distinctively sweet aroma and a slightly sticky texture. Perfect for traditional northern Iranian dishes.',
    weightOptions: [
      { weight: '1kg', price: 14.99 },
      { weight: '5kg', price: 70.00 },
    ],
    rating: 4.8,
    reviewCount: 72,
    discount: 0,
    imageId: 'product-gilan',
    stock: 80
  },
  {
    id: '6',
    name: 'Golestan Neda Rice',
    slug: 'golestan-neda-rice',
    category: 'Golestan',
    description: 'A high-yield, resilient variety that has become a staple in Iranian households. Neda rice is known for its consistent quality and good cooking properties, making it a reliable choice for daily meals.',
    weightOptions: [
      { weight: '5kg', price: 45.99 },
      { weight: '10kg', price: 85.00 },
      { weight: '20kg', price: 160.00 },
    ],
    rating: 4.5,
    reviewCount: 150,
    discount: 5,
    imageId: 'product-golestan',
    stock: 300
  },
];


export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Persian Rice: Mastering Tahdig',
    slug: 'art-of-persian-rice-mastering-tahdig',
    date: 'October 26, 2023',
    author: 'Admin',
    imageId: 'blog-cooking',
    excerpt: 'Unlock the secrets to the perfect "tahdig," the coveted crispy golden crust at the bottom of the Persian rice pot. Our step-by-step guide will make you a tahdig master.',
    content: '<p>Unlock the secrets to the perfect "tahdig," the coveted crispy golden crust at the bottom of the Persian rice pot. Our step-by-step guide will make you a tahdig master.</p><p>First, select the right rice. A long-grain variety like Tarom or Hashemi works best. Parboil the rice, then prepare your pot with a generous layer of oil and yogurt or potato slices. Finally, cook on low heat until a fragrant crust forms. Patience is key!</p>',
  },
  {
    id: '2',
    title: 'From Paddy to Plate: The Journey of Hashemi Rice',
    slug: 'from-paddy-to-plate-journey-of-hashemi-rice',
    date: 'October 15, 2023',
    author: 'Admin',
    imageId: 'blog-cultivation',
    excerpt: 'Discover the incredible journey of our Hashemi rice, from the lush green paddies of northern Iran to your dining table. Learn about the traditional farming methods that make it so special.',
    content: '<p>Discover the incredible journey of our Hashemi rice, from the lush green paddies of northern Iran to your dining table. Learn about the traditional farming methods that make it so special.</p><p>Our farmers use techniques passed down through generations, relying on natural irrigation from the Alborz mountains. The rice is harvested by hand and carefully milled to preserve its delicate aroma and nutritional value.</p>',
  },
  {
    id: '3',
    title: 'Storing Your Premium Rice: A Guide to Freshness',
    slug: 'storing-premium-rice-guide-to-freshness',
    date: 'September 30, 2023',
    author: 'Admin',
    imageId: 'blog-storage',
    excerpt: 'You\'ve invested in the finest Iranian rice. Now, learn how to store it properly to maintain its exceptional aroma and flavor for months to come. It\'s easier than you think!',
    content: '<p>You\'ve invested in the finest Iranian rice. Now, learn how to store it properly to maintain its exceptional aroma and flavor for months to come. It\'s easier than you think!</p><p>The key is to keep it cool, dry, and away from light and strong odors. An airtight container is your best friend. Store it in a pantry or cupboard, not the refrigerator. Following these simple steps will ensure every pot of rice is as fresh as the first.</p>',
  },
];

export const productCategories: ProductCategory[] = [
  { name: 'Tarom', description: 'Celebrated for its delightful aroma and fluffy texture.' },
  { name: 'Sadri', description: 'An aristocratic variety with an exceptionally fragrant aroma.' },
  { name: 'Hashemi', description: 'A popular and beloved variety, offering a wonderful balance.' },
  { name: 'Fereydunkenar', description: 'Gently smoked rice with a subtle, savory flavor.' },
  { name: 'Gilan', description: 'A short-grain rice with a distinctively sweet aroma.' },
  { name: 'Golestan', description: 'A reliable choice for daily meals with consistent quality.' },
];
