
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { ChevronRight, PlusCircle, Trash2, Upload } from 'lucide-react';

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
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
                        <Label htmlFor="slug">اسلاگ (URL)</Label>
                        <Input id="slug" placeholder="مثلا: royal-tarom-hashemi-rice" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">توضیحات محصول</Label>
                        <Textarea id="description" placeholder="توضیحات کاملی در مورد محصول بنویسید..." rows={5} />
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>جزئیات محصول</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="cookingType">نوع پخت</Label>
                        <Input id="cookingType" placeholder="مثال: کته و آبکش" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="aroma">عطر</Label>
                        <Input id="aroma" placeholder="مثال: بسیار معطر" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="texture">بافت</Label>
                        <Input id="texture" placeholder="مثال: نرم و پفکی" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="origin">منطقه کشت</Label>
                        <Input id="origin" placeholder="مثال: گیلان" />
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
                            <Input id="price-1" placeholder="129,900" type="text" dir="ltr"/>
                        </div>
                         <Button variant="outline" className='mt-auto' size="icon">
                             <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                    <Button variant="secondary">
                        <PlusCircle className="ml-2 h-4 w-4" />
                        افزودن گزینه وزن جدید
                    </Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>نظرات مشتریان</CardTitle>
                    <CardDescription>نظرات ثبت شده برای این محصول را مدیریت کنید.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border p-3 rounded-lg space-y-2">
                         <div className="flex justify-between items-center">
                            <p className="font-semibold">مریم رضایی</p>
                            <Button variant="ghost" size="icon">
                                 <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <Textarea defaultValue="عطر و طعم این برنج فوق‌العاده‌ست! کاملا مجلسی و باکیفیت."/>
                    </div>
                     <Button variant="secondary">
                        <PlusCircle className="ml-2 h-4 w-4" />
                        افزودن نظر
                    </Button>
                </CardContent>
             </Card>

        </div>

        <div className="lg:col-span-1 space-y-6 lg:sticky top-24">
            <Card>
                <CardHeader>
                    <CardTitle>انتشار</CardTitle>
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
                     <div className="space-y-2">
                        <Label htmlFor="discount">تخفیف (درصد)</Label>
                        <Input id="discount" type="number" placeholder="مثلا: 10" />
                    </div>
                </CardContent>
                 <CardFooter className="flex gap-2">
                    <Button variant="outline">ذخیره به عنوان پیش‌نویس</Button>
                    <Button className="flex-1">انتشار محصول</Button>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>گالری تصاویر و ویدیو</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="border-2 border-dashed border-muted rounded-lg p-6 cursor-pointer hover:bg-muted/50 flex flex-col items-center justify-center text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">فایل‌ها را اینجا بکشید یا برای انتخاب کلیک کنید</p>
                    </div>
                    {/* Placeholder for uploaded images */}
                    <div className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 bg-secondary rounded-md"></div>
                            <span className="text-sm font-medium">product-image-1.jpg</span>
                        </div>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                     <div className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 bg-secondary rounded-md"></div>
                            <span className="text-sm font-medium">product-video.mp4</span>
                        </div>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
