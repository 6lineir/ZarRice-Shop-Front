
import { products, productCategories } from '@/lib/data';
import ProductCard from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 bg-secondary text-center">
        <div className="container px-4">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold">مجموعه برنج ممتاز ما</h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            طعم اصیل ایرانی را با انواع برنج دست‌چین ما کاوش کنید. هر دانه، داستانی از کیفیت و سنت را روایت می‌کند.
          </p>
        </div>
      </header>

      <main className="py-12 md:py-20">
        <div className="container px-4">
          <Card className="mb-8 md:mb-12 shadow-sm sticky top-16 z-40 bg-background/95 backdrop-blur-sm">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-between items-center">
                <div className="relative w-full sm:w-auto sm:flex-1">
                  <Input placeholder="جستجوی محصولات..." className="w-full pl-10" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <div className='flex gap-3 w-full sm:w-auto'>
                  <Select>
                    <SelectTrigger className="w-full md:w-[160px]">
                      <SelectValue placeholder="دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه دسته‌ها</SelectItem>
                      {productCategories.map(cat => (
                        <SelectItem key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full md:w-[160px]">
                      <SelectValue placeholder="مرتب‌سازی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">ویژه</SelectItem>
                      <SelectItem value="price_asc">قیمت: صعودی</SelectItem>
                      <SelectItem value="price_desc">قیمت: نزولی</SelectItem>
                      <SelectItem value="rating">محبوب‌ترین</SelectItem>
                      <SelectItem value="newest">جدیدترین</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
