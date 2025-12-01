
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
import Link from 'next/link';
import { ChevronRight, Upload, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
                <Link href="/admin/blog"><ChevronRight className="h-4 w-4" /></Link>
            </Button>
            <div>
                <h1 className="text-2xl font-bold">افزودن پست جدید</h1>
                <p className="text-muted-foreground">فرم زیر را برای ایجاد یک مقاله جدید پر کنید.</p>
            </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>محتوای پست</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">عنوان پست</Label>
                        <Input id="title" placeholder="مثال: هنر پخت برنج ایرانی" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="content">محتوای اصلی</Label>
                            <Button variant="outline" size="sm">
                                <Sparkles className="ml-2 h-4 w-4" />
                                بهینه‌سازی با AI
                            </Button>
                        </div>
                        <Textarea id="content" placeholder="داستان خود را اینجا بنویسید..." rows={12} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>بهینه‌سازی برای موتورهای جستجو (SEO)</CardTitle>
                    <CardDescription>این اطلاعات به بهبود رتبه شما در گوگل کمک می‌کند.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="seo-title">عنوان متا (Meta Title)</Label>
                        <Input id="seo-title" placeholder="یک عنوان جذاب برای گوگل بنویسید" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="seo-description">توضیحات متا (Meta Description)</Label>
                        <Textarea id="seo-description" placeholder="توضیحی کوتاه و جذاب (حدود ۱۶۰ کاراکتر) برای نمایش در نتایج جستجو." rows={3} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">اسلاگ (URL)</Label>
                        <Input id="slug" placeholder="example: art-of-persian-rice" dir="ltr" />
                    </div>
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
                        <Label htmlFor="status">وضعیت</Label>
                        <Select defaultValue="draft">
                            <SelectTrigger id="status">
                                <SelectValue placeholder="انتخاب وضعیت" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="published">منتشر شده</SelectItem>
                                <SelectItem value="draft">پیش‌نویس</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="author">نویسنده</Label>
                        <Select defaultValue="admin">
                             <SelectTrigger id="author">
                                <SelectValue placeholder="انتخاب نویسنده" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">ادمین</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                 <CardFooter className="flex gap-2">
                    <Button variant="outline">ذخیره پیش‌نویس</Button>
                    <Button className="flex-1">انتشار</Button>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>تصویر شاخص</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="border-2 border-dashed border-muted rounded-lg p-6 cursor-pointer hover:bg-muted/50 flex flex-col items-center justify-center text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">فایل‌ را اینجا بکشید یا برای انتخاب کلیک کنید</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>تگ‌ها و دسته‌بندی‌ها</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="tags">تگ‌ها (با کاما جدا کنید)</Label>
                        <Input id="tags" placeholder="برنج, ته دیگ, آشپزی" />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary">برنج</Badge>
                        <Badge variant="secondary">ته دیگ</Badge>
                        <Badge variant="secondary">آشپزی</Badge>
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
