
'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { products, productCategories } from '@/lib/data';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const ProductForm = ({ product, onSave, onCancel }: { product?: any, onSave: (p: any) => void, onCancel: () => void }) => {
    // A simple form state. In a real app, use react-hook-form.
    const [formData, setFormData] = useState(product || {
        name: '',
        description: '',
        category: '',
        stock: 100,
        weightOptions: [{ weight: '۱ کیلوگرم', price: 0 }]
    });

    const handleSave = () => {
        onSave(formData);
    }
    
    return (
        <>
            <DialogHeader>
                <DialogTitle>{product ? 'ویرایش محصول' : 'افزودن محصول جدید'}</DialogTitle>
                <DialogDescription>
                    {product ? 'اطلاعات محصول را ویرایش کنید.' : 'فرم زیر را برای اضافه کردن محصول جدید پر کنید.'}
                </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>اطلاعات اصلی</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">نام محصول</Label>
                                <Input id="name" defaultValue={formData.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">توضیحات</Label>
                                <Textarea id="description" defaultValue={formData.description} rows={5} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>قیمت‌گذاری و وزن</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                             {formData.weightOptions.map((opt:any, index: number) => (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label>وزن</Label>
                                        <Input defaultValue={opt.weight} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>قیمت (تومان)</Label>
                                        <Input defaultValue={opt.price} type="number" />
                                    </div>
                                    <Button variant="outline">حذف</Button>
                                </div>
                            ))}
                            <Button variant="secondary">افزودن گزینه وزن</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>دسته‌بندی و موجودی</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">دسته‌بندی</Label>
                                <Select defaultValue={formData.category}>
                                    <SelectTrigger id="category"><SelectValue placeholder="انتخاب کنید" /></SelectTrigger>
                                    <SelectContent>
                                        {productCategories.map(cat => <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">موجودی انبار</Label>
                                <Input id="stock" type="number" defaultValue={formData.stock} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>تصویر محصول</CardTitle></CardHeader>
                        <CardContent className="text-center">
                            <div className="border-2 border-dashed border-muted rounded-lg p-6 cursor-pointer hover:bg-muted/50">
                                <p>تصویر را بکشید یا کلیک کنید</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <DialogFooter>
                <Button variant="outline" onClick={onCancel}>انصراف</Button>
                <Button onClick={handleSave}>{product ? 'ذخیره تغییرات' : 'انتشار محصول'}</Button>
            </DialogFooter>
        </>
    );
};


export default function AdminProductsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(undefined);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  }

  const handleSaveProduct = (productData: any) => {
    console.log("Saving product:", productData);
    // Here you would typically call an API to save the product
    setIsDialogOpen(false);
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-2xl font-bold">محصولات</h1>
            <p className="text-muted-foreground">لیست تمام محصولات فروشگاه شما.</p>
        </div>
        <Button asChild>
            <Link href="/admin/products/new">
                <PlusCircle className="ml-2 h-4 w-4" />
                افزودن محصول
            </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>لیست محصولات</CardTitle>
            <CardDescription>
                مجموعاً {products.length} محصول در فروشگاه شما موجود است.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>نام محصول</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>قیمت</TableHead>
                <TableHead className="hidden md:table-cell">موجودی</TableHead>
                <TableHead className="hidden md:table-cell">تاریخ ایجاد</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const image = placeholderImages.find(
                  (p) => p.id === product.images[0].id
                );
                return (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      {image && (
                        <Image
                          alt={product.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={image.imageUrl}
                          width="64"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                        {product.stock > 0 ? 'موجود' : 'ناموجود'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.weightOptions[0].price.toLocaleString()} تومان
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.stock}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ۱۴۰۲/۰۸/۱۲
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            <Edit className="ml-2 h-4 w-4" />
                            ویرایش
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                             <Trash2 className="ml-2 h-4 w-4" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter>
            <div className="text-xs text-muted-foreground">
                نمایش <strong>1-{products.length}</strong> از <strong>{products.length}</strong> محصول
            </div>
            <Pagination className="ml-auto">
                <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
                </PaginationContent>
            </Pagination>
        </CardFooter>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl">
              <ProductForm 
                product={editingProduct} 
                onSave={handleSaveProduct}
                onCancel={() => setIsDialogOpen(false)}
              />
          </DialogContent>
      </Dialog>
    </div>
  );
}
