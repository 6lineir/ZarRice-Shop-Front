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
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 bg-secondary text-center">
        <div className="container">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">مجموعه برنج ممتاز ما</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            طعم اصیل ایرانی را با انواع برنج دست‌چین ما کاوش کنید.
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className='flex gap-4'>
              <Input placeholder="جستجوی محصولات..." className="w-full md:w-64" />
               <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="همه دسته‌ها" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه دسته‌ها</SelectItem>
                  {productCategories.map(cat => (
                    <SelectItem key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="مرتب‌سازی بر اساس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">ویژه</SelectItem>
                  <SelectItem value="price_asc">قیمت: از کم به زیاد</SelectItem>
                  <SelectItem value="price_desc">قیمت: از زیاد به کم</SelectItem>
                   <SelectItem value="rating">میانگین نظرات مشتریان</SelectItem>
                </SelectContent>
              </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
