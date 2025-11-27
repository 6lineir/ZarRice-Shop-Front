
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productCategories } from '@/lib/data';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
                <Link href="/admin/products"><ChevronRight className="h-4 w-4" /></Link>
            </Button>
            <div>
                <h1 className="text-2xl font-bold">افزودن محصول جدید</h1>
                <p className="text-muted-foreground">فرم زیر را برای اضافه کردن محصول جدید پر کنید.</p>
            </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>اطلاعات اصلی محصول</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">نام محصول</Label>
                        <Input id="name" placeholder="مثلا: برنج طارم هاشمی سلطنتی" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">توضیحات محصول</Label>
                        <Textarea id="description" placeholder="توضیحات کاملی در مورد محصول بنویسید..." rows={5} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>قیمت‌گذاری و وزن</CardTitle>
                    <CardDescription>
                        می‌توانید چندین گزینه وزن و قیمت برای محصول تعریف کنید.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="weight-1">وزن (مثلا: ۱ کیلوگرم)</Label>
                            <Input id="weight-1" placeholder="۱ کیلوگرم" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price-1">قیمت (تومان)</Label>
                            <Input id="price-1" placeholder="129,900" type="number" />
                        </div>
                         <Button variant="outline" className='mt-auto'>حذف</Button>
                    </div>
                    <Button variant="secondary">افزودن گزینه وزن جدید</Button>
                </CardContent>
            </Card>

        </div>

        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>دسته‌بندی و موجودی</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="category">دسته‌بندی محصول</Label>
                        <Select>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="یک دسته انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent>
                                {productCategories.map(cat => (
                                    <SelectItem key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="stock">موجودی انبار</Label>
                        <Input id="stock" type="number" placeholder="100" />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>تصویر محصول</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 cursor-pointer hover:bg-muted/50">
                        <p>تصویر را اینجا بکشید یا برای انتخاب کلیک کنید</p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-2">
                <Button variant="outline">ذخیره به عنوان پیش‌نویس</Button>
                <Button className="flex-1">انتشار محصول</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
