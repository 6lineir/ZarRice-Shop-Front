
'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { useToast } from '@/hooks/use-toast';
import { DiscountCode } from '@/lib/types';

const initialDiscountCodes: DiscountCode[] = [
    { id: '1', code: 'TABS20', type: 'درصدی', value: 20, usageLimit: 100, used: 45, status: 'فعال', expiryDate: '1404-12-29' },
    { id: '2', code: 'NOWRUZ1403', type: 'مبلغ ثابت', value: 50000, usageLimit: 200, used: 150, status: 'فعال', expiryDate: '1403-01-15' },
    { id: '3', code: 'FIRSTBUY', type: 'درصدی', value: 15, usageLimit: null, used: 120, status: 'فعال', expiryDate: null },
    { id: '4', code: 'BAHAR99', type: 'درصدی', value: 10, usageLimit: 50, used: 50, status: 'منقضی شده', expiryDate: '1402-03-31' },
];

export default function AdminDiscountsPage() {
  const { toast } = useToast();
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [newDiscount, setNewDiscount] = useState({
      code: '',
      type: 'درصدی' as 'درصدی' | 'مبلغ ثابت',
      value: '',
      usageLimit: '',
      expiryDate: '',
  });

  useEffect(() => {
      setDiscountCodes(initialDiscountCodes);
  }, []);

  const handleAddDiscount = () => {
    if (!newDiscount.code || !newDiscount.value) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'کد و مقدار تخفیف نمی‌توانند خالی باشند.',
      });
      return;
    }
    const newCode: DiscountCode = {
      id: Date.now().toString(),
      code: newDiscount.code.toUpperCase(),
      type: newDiscount.type,
      value: Number(newDiscount.value),
      usageLimit: newDiscount.usageLimit ? Number(newDiscount.usageLimit) : null,
      used: 0,
      status: 'فعال',
      expiryDate: newDiscount.expiryDate || null,
    };
    setDiscountCodes(prev => [newCode, ...prev]);
    setNewDiscount({ code: '', type: 'درصدی', value: '', usageLimit: '', expiryDate: '' });
    toast({
        title: "کد تخفیف اضافه شد",
        description: `کد "${newCode.code}" با موفقیت ایجاد شد.`
    });
  };

  const handleDeleteDiscount = (discountId: string) => {
      setDiscountCodes(prev => prev.filter(d => d.id !== discountId));
      toast({ title: "کد تخفیف حذف شد." });
  };

  const handleInputChange = (field: keyof typeof newDiscount, value: string) => {
      setNewDiscount(prev => ({...prev, [field]: value}));
  };

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
                  <TableRow key={discount.id}>
                    <TableCell className="font-medium font-mono text-left" dir="ltr">{discount.code}</TableCell>
                    <TableCell>{discount.type}</TableCell>
                    <TableCell>{discount.type === 'درصدی' ? `${discount.value}%` : `${discount.value.toLocaleString()} تومان`}</TableCell>
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
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteDiscount(discount.id)}><Trash className='ml-2 h-4 w-4' /> حذف</DropdownMenuItem>
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
                    <Input id="code-name" placeholder="مثال: BAHAR1404" dir="ltr" value={newDiscount.code} onChange={(e) => handleInputChange('code', e.target.value)} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="code-type">نوع تخفیف</Label>
                        <Select value={newDiscount.type} onValueChange={(val: 'درصدی' | 'مبلغ ثابت') => handleInputChange('type', val)}>
                            <SelectTrigger id="code-type">
                                <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="درصدی">درصدی</SelectItem>
                                <SelectItem value="مبلغ ثابت">مبلغ ثابت</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="code-value">مقدار</Label>
                        <Input id="code-value" type="number" placeholder={newDiscount.type === 'درصدی' ? 'مثلا: 20' : 'مثلا: 50000'} value={newDiscount.value} onChange={(e) => handleInputChange('value', e.target.value)} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="usage-limit">محدودیت استفاده (اختیاری)</Label>
                    <Input id="usage-limit" type="number" placeholder="مثلا: ۱۰۰" value={newDiscount.usageLimit} onChange={(e) => handleInputChange('usageLimit', e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="expiry-date">تاریخ انقضا (اختیاری)</Label>
                    <Input id="expiry-date" type="text" placeholder="مثلا: 1404-01-15" value={newDiscount.expiryDate} onChange={(e) => handleInputChange('expiryDate', e.target.value)} />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleAddDiscount}>
                    <PlusCircle className="ml-2 h-4 w-4" />
                    افزودن کد تخفیف
                </Button>
            </CardFooter>
         </Card>
      </div>
    </div>
  );
}
