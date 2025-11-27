
export type WeightOption = {
  weight: string;
  price: number;
};

export type Review = {
    author: string;
    rating: number;
    comment: string;
}

export type ProductImage = {
  id: string;
  type: 'image' | 'video';
}

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  weightOptions: WeightOption[];
  rating: number;
  reviewCount: number;
  discount: number;
  images: ProductImage[];
  stock: number;
  // New detailed properties
  cookingType: string;
  aroma: string;
  texture: string;
  origin: string;
  reviews: Review[];
};

export type ProductCategory = {
    name: string;
    description: string;
}

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  imageId: string;
  excerpt: string;
  content: string;
};

export type CartItem = {
    id: string; // Combination of productId and weight
    productId: string;
    name: string;
    price: number;
    weight: string;

    quantity: number;
    image?: string;
}

export type OrderStatus = 'در حال پردازش' | 'ارسال شده' | 'تحویل داده شد' | 'لغو شده';

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  trackingCode?: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
};
