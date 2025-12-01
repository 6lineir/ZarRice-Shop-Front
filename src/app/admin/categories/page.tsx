
'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ProductCategory } from '@/lib/types';


const initialProductCategories: ProductCategory[] = [
  { name: 'طارم', description: 'به خاطر عطر دل‌انگیز و بافت پفکی شهرت دارد.' },
  { name: 'صدری', description: 'یک نوع اشرافی با عطری استثنایی.' },
  { name: 'هاشمی', description: 'یک نوع محبوب و دوست‌داشتنی که تعادل فوق‌العاده‌ای ارائه می‌دهد.' },
  { name: 'فریدونکنار', description: 'برنج دودی با طعمی لطیف و خوشمزه.' },
  { name: 'گیلان', description: 'یک برنج دانه‌کوتاه با عطری مشخصاً شیرین.' },
  { name: 'گلستان', description: 'انتخابی قابل اعتماد برای وعده‌های روزانه با کیفیت ثابت.' },
];

export default function AdminCategoriesPage() {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setProductCategories(initialProductCategories);
  }, []);
  
  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-6">دسته‌بندی‌های محصولات</h1>
        <Card>
          <CardHeader>
            <CardTitle>لیست دسته‌بندی‌ها</CardTitle>
            <CardDescription>
              دسته‌بندی‌های موجود برای محصولات خود را مدیریت کنید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام دسته‌بندی</TableHead>
                  <TableHead>توضیحات</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productCategories.map((category) => (
                  <TableRow key={category.name}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-muted-foreground">{category.description}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                          <DropdownMenuItem>ویرایش</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-6 invisible">.</h1>
         <Card>
            <CardHeader>
                <CardTitle>افزودن دسته‌بندی جدید</CardTitle>
                <CardDescription>یک دسته‌بندی جدید برای محصولات خود ایجاد کنید.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="category-name">نام دسته‌بندی</Label>
                    <Input id="category-name" placeholder="مثال: طارم" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="category-description">توضیحات</Label>
                    <Input id="category-description" placeholder="توضیح کوتاه در مورد دسته" />
                </div>
                <Button>
                    <PlusCircle className="ml-2 h-4 w-4" />
                    افزودن
                </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
