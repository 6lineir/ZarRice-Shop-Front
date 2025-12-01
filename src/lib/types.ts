

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
  createdAt: string;
  // New detailed properties
  cookingType: string;
  aroma: string;
  texture: string;
  origin: string;
  reviews: Review[];
};

export type ProductCategory = {
    id: string;
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
  status: 'published' | 'draft';
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
    email?: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
};

export type DiscountCode = {
    id: string;
    code: string;
    type: 'درصدی' | 'مبلغ ثابت';
    value: number;
    usageLimit: number | null;
    used: number;
    status: 'فعال' | 'منقضی شده';
    expiryDate: string | null;
}

export type UserProfile = {
    name: string;
    email: string;
    phone: string;

    addresses: {
        id: string;
        title: string;
        recipientName: string;
        phone: string;
        address: string;
        isDefault: boolean;
    }[];
    orderStats: {
        totalOrders: number;
        totalSpent: string;
    }
}
