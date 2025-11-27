
'use client';
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
import { products } from '@/lib/data';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

export default function AdminProductsPage() {
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
                  (p) => p.id === product.imageId
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
                          <DropdownMenuItem>ویرایش</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
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
                نمایش <strong>1-6</strong> از <strong>{products.length}</strong> محصول
            </div>
            <Pagination className="mr-auto">
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
    </div>
  );
}
