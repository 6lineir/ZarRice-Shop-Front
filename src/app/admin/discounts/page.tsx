
'use client';
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
import { MoreHorizontal, PlusCircle, Trash, Edit } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const discountCodes = [
    { code: 'TABS20', type: 'درصدی', value: '20%', usageLimit: 100, used: 45, status: 'فعال' },
    { code: 'NOWRUZ1403', type: 'مبلغ ثابت', value: '50,000 تومان', usageLimit: 200, used: 150, status: 'فعال' },
    { code: 'FIRSTBUY', type: 'درصدی', value: '15%', usageLimit: null, used: 120, status: 'فعال' },
    { code: 'BAHAR99', type: 'درصدی', value: '10%', usageLimit: 50, used: 50, status: 'منقضی شده' },
];

export default function AdminDiscountsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold">کدهای تخفیف</h1>
                <p className="text-muted-foreground">کدهای تخفیف فروشگاه خود را مدیریت کنید.</p>
            </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>لیست کدهای تخفیف</CardTitle>
            <CardDescription>
              کدهای تخفیف ایجاد شده را مشاهده و مدیریت کنید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>کد</TableHead>
                  <TableHead>نوع</TableHead>
                  <TableHead>مقدار</TableHead>
                  <TableHead>استفاده شده</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discountCodes.map((discount) => (
                  <TableRow key={discount.code}>
                    <TableCell className="font-medium font-mono text-left" dir="ltr">{discount.code}</TableCell>
                    <TableCell>{discount.type}</TableCell>
                    <TableCell>{discount.value}</TableCell>
                    <TableCell>{discount.used} / {discount.usageLimit || 'نامحدود'}</TableCell>
                    <TableCell>
                        <Badge variant={discount.status === 'فعال' ? 'default' : 'outline'}>{discount.status}</Badge>
                    </TableCell>
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
                          <DropdownMenuItem><Edit className='ml-2 h-4 w-4' /> ویرایش</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><Trash className='ml-2 h-4 w-4' /> حذف</DropdownMenuItem>
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
         <div className="flex items-center justify-between mb-6 invisible">
            <h1 className="text-2xl font-bold">.</h1>
         </div>
         <Card>
            <CardHeader>
                <CardTitle>افزودن کد تخفیف جدید</CardTitle>
                <CardDescription>یک کد تخفیف جدید برای مشتریان خود بسازید.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="code-name">کد تخفیف</Label>
                    <Input id="code-name" placeholder="مثال: BAHAR1404" dir="ltr" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="code-type">نوع تخفیف</Label>
                        <Select>
                            <SelectTrigger id="code-type">
                                <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="percent">درصدی</SelectItem>
                                <SelectItem value="fixed">مبلغ ثابت</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="code-value">مقدار</Label>
                        <Input id="code-value" placeholder="مثلا ۲۰ یا ۵۰۰۰۰" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="usage-limit">محدودیت استفاده (اختیاری)</Label>
                    <Input id="usage-limit" type="number" placeholder="مثلا: ۱۰۰" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="expiry-date">تاریخ انقضا (اختیاری)</Label>
                    <Input id="expiry-date" type="text" placeholder="مثلا: ۱۴۰۴/۰۱/۱۵" />
                </div>
                <Button className="w-full">
                    <PlusCircle className="ml-2 h-4 w-4" />
                    افزودن کد تخفیف
                </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
