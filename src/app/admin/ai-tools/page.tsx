
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Sparkles, Loader2 } from 'lucide-react';
import { generateBlogArticle, BlogArticleInput } from '@/ai/flows/blog-article-generator';
import { generateProductDescription, ProductDescriptionInput } from '@/ai/flows/product-description-generator';

export default function AIToolsPage() {
  const [blogTopic, setBlogTopic] = useState('');
  const [blogKeywords, setBlogKeywords] = useState('');
  const [blogResult, setBlogResult] = useState({ title: '', content: '' });
  const [isBlogLoading, setIsBlogLoading] = useState(false);

  const [productInfo, setProductInfo] = useState({
      name: 'طارم هاشمی',
      variety: 'طارم',
      origin: 'فریدونکنار',
      aroma: 'عطر متوسط و دلنشین',
      texture: 'نرم و پفکی',
      flavor: 'خوش طعم',
      cookingTips: 'پخت به صورت کته یا آبکش'
  });
  const [productDescResult, setProductDescResult] = useState('');
  const [isProductDescLoading, setIsProductDescLoading] = useState(false);


  const handleGenerateBlog = async () => {
    setIsBlogLoading(true);
    setBlogResult({ title: '', content: '' });
    try {
      const input: BlogArticleInput = {
        topic: blogTopic,
        keywords: blogKeywords,
        tone: 'professional',
        length: 'medium',
      };
      const result = await generateBlogArticle(input);
      setBlogResult(result);
    } catch (error) {
      console.error('Error generating blog article:', error);
      setBlogResult({ title: 'خطا', content: 'در تولید محتوا خطایی رخ داد. لطفا دوباره تلاش کنید.' });
    } finally {
      setIsBlogLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
      setIsProductDescLoading(true);
      setProductDescResult('');
      try {
        const result = await generateProductDescription(productInfo);
        setProductDescResult(result.description);
      } catch (error) {
          console.error("Error generating product description", error);
          setProductDescResult("در تولید توضیحات محصول خطایی رخ داد. لطفا دوباره تلاش کنید.")
      } finally {
        setIsProductDescLoading(false);
      }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sparkles className="h-7 w-7 text-primary" />
        <div>
            <h1 className="text-2xl font-bold">ابزارهای هوش مصنوعی</h1>
            <p className="text-muted-foreground">
                محتوای خود را با قدرت هوش مصنوعی تولید و بهینه کنید.
            </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>تولید کننده مقاله وبلاگ</CardTitle>
            <CardDescription>
              یک موضوع و چند کلمه کلیدی وارد کنید تا یک پیش‌نویس کامل برای مقاله وبلاگ خود تحویل بگیرید.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blog-topic">موضوع مقاله</Label>
              <Input
                id="blog-topic"
                placeholder="مثال: بهترین روش پخت برنج صدری"
                value={blogTopic}
                onChange={(e) => setBlogTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-keywords">کلمات کلیدی (جدا شده با کاما)</Label>
              <Input
                id="blog-keywords"
                placeholder="مثال: برنج صدری, پخت برنج, ته دیگ"
                value={blogKeywords}
                onChange={(e) => setBlogKeywords(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerateBlog} disabled={isBlogLoading || !blogTopic}>
              {isBlogLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  در حال تولید...
                </>
              ) : (
                <>
                  <Sparkles className="ml-2 h-4 w-4" />
                  تولید مقاله
                </>
              )}
            </Button>
          </CardFooter>
          {blogResult.content && (
            <CardContent className="border-t pt-6">
                <h3 className='font-bold text-lg mb-2'>{blogResult.title}</h3>
                <p className='text-sm text-muted-foreground whitespace-pre-wrap'>{blogResult.content}</p>
            </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تولید کننده توضیحات محصول</CardTitle>
            <CardDescription>
              ویژگی‌های برنج را مشخص کنید تا یک توضیح جذاب و فروش‌پسند برای محصولتان ایجاد شود.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>نام برنج</Label>
                    <Input value={productInfo.name} onChange={(e) => setProductInfo({...productInfo, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>نوع</Label>
                    <Input value={productInfo.variety} onChange={(e) => setProductInfo({...productInfo, variety: e.target.value})} />
                </div>
                 <div className="space-y-2">
                    <Label>منطقه کشت</Label>
                    <Input value={productInfo.origin} onChange={(e) => setProductInfo({...productInfo, origin: e.target.value})} />
                </div>
                 <div className="space-y-2">
                    <Label>عطر</Label>
                    <Input value={productInfo.aroma} onChange={(e) => setProductInfo({...productInfo, aroma: e.target.value})} />
                </div>
            </div>
             <div className="space-y-2">
                <Label>نکات پخت</Label>
                <Textarea value={productInfo.cookingTips} onChange={(e) => setProductInfo({...productInfo, cookingTips: e.target.value})} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerateDescription} disabled={isProductDescLoading}>
                 {isProductDescLoading ? (
                    <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    در حال تولید...
                    </>
                ) : (
                    <>
                    <Sparkles className="ml-2 h-4 w-4" />
                    تولید توضیحات
                    </>
                )}
            </Button>
          </CardFooter>
           {productDescResult && (
            <CardContent className="border-t pt-6">
                 <p className='text-sm text-muted-foreground whitespace-pre-wrap'>{productDescResult}</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
