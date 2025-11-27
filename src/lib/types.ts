export type WeightOption = {
  weight: string;
  price: number;
};

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
  imageId: string;
  stock: number;
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
