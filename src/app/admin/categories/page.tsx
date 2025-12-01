
'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

const initialProductCategories: ProductCategory[] = [
  { id: '1', name: 'طارم', description: 'به خاطر عطر دل‌انگیز و بافت پفکی شهرت دارد.' },
  { id: '2', name: 'صدری', description: 'یک نوع اشرافی با عطری استثنایی.' },
  { id: '3', name: 'هاشمی', description: 'یک نوع محبوب و دوست‌داشتنی که تعادل فوق‌العاده‌ای ارائه می‌دهد.' },
  { id: '4', name: 'فریدونکنار', description: 'برنج دودی با طعمی لطیف و خوشمزه.' },
  { id: '5', name: 'گیلان', description: 'یک برنج دانه‌کوتاه با عطری مشخصاً شیرین.' },
  { id: '6', name: 'گلستان', description: 'انتخابی قابل اعتماد برای وعده‌های روزانه با کیفیت ثابت.' },
];

export default function AdminCategoriesPage() {
  const { toast } = useToast();
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setProductCategories(initialProductCategories);
  }, []);

  const handleAddCategory = () => {
    if (!newCategoryName) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "نام دسته‌بندی نمی‌تواند خالی باشد.",
      });
      return;
    }
    const newCategory: ProductCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      description: newCategoryDesc,
    };
    setProductCategories(prev => [...prev, newCategory]);
    setNewCategoryName('');
    setNewCategoryDesc('');
    toast({
        title: "دسته‌بندی اضافه شد",
        description: `دسته‌بندی "${newCategoryName}" با موفقیت ایجاد شد.`,
    })
  };

  const handleDeleteCategory = (categoryId: string) => {
      setProductCategories(prev => prev.filter(c => c.id !== categoryId));
      toast({
          title: "دسته‌بندی حذف شد",
      });
  };
  
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
                  <TableRow key={category.id}>
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
                          <DropdownMenuItem>
                            <Edit className='ml-2 h-4 w-4' /> ویرایش
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCategory(category.id)}>
                            <Trash2 className='ml-2 h-4 w-4' /> حذف
                          </DropdownMenuItem>
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
                    <Input 
                      id="category-name" 
                      placeholder="مثال: طارم" 
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="category-description">توضیحات</Label>
                    <Input 
                      id="category-description" 
                      placeholder="توضیح کوتاه در مورد دسته" 
                      value={newCategoryDesc}
                      onChange={(e) => setNewCategoryDesc(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter>
               <Button onClick={handleAddCategory} className='w-full'>
                    <PlusCircle className="ml-2 h-4 w-4" />
                    افزودن
                </Button>
            </CardFooter>
         </Card>
      </div>
    </div>
  );
}
