
# پروژه فروشگاه برنج زر برنج - آماده برای اتصال به بک‌اند

این یک پروژه فرانت‌اند مدرن با استفاده از Next.js و Tailwind CSS است که به طور کامل برای اتصال به یک بک‌اند سفارشی (مانند پایتون) آماده‌سازی شده است. تمام داده‌های استاتیک و نمونه (Mock Data) از پروژه حذف شده و با مدیریت استیت (State Management) در React جایگزین شده‌اند.

این راهنما به شما کمک می‌کند تا به سرعت بک‌اند خود را به این پروژه متصل کنید.

## ساختار فعلی پروژه

در حال حاضر، تمام داده‌های برنامه (مانند لیست محصولات، پست‌های وبلاگ، اطلاعات کاربران و ...) به صورت متغیرهای استیت در هر کامپوننت مدیریت می‌شوند. برای شبیه‌سازی دریافت داده از یک API، از هوک `useEffect` با یک مقدار اولیه استفاده شده است.

**نکته کلیدی:** وظیفه شما این است که منطق داخل این `useEffect` ها را با کد فراخوانی API واقعی خود جایگزین کنید.

## راهنمای اتصال بک‌اند (مثال گام‌به‌گام)

بیایید به عنوان مثال، نحوه اتصال لیست محصولات در صفحه `products` را بررسی کنیم. این الگو باید برای تمام بخش‌های دیگر برنامه نیز تکرار شود.

**فایل هدف:** `src/app/products/page.tsx`

### مرحله ۱: پیدا کردن کد فعلی

در فایل `src/app/products/page.tsx`، کدی شبیه به این را پیدا خواهید کرد:

```tsx
// src/app/products/page.tsx

'use client';

import { useState, useEffect } from 'react';
// ... سایر import ها

// این آرایه شامل داده‌های نمونه است که باید از API شما بیاید
const initialProducts: Product[] = [
  { id: '1', name: 'برنج طارم هاشمی سلطنتی', /* ... بقیه اطلاعات */ },
  { id: '2', name: 'برنج صدری دم‌سیاه شاهانه', /* ... بقیه اطلاعات */ },
  // ...
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  // ... سایر state ها

  useEffect(() => {
    // TODO: Fetch products from your API
    setProducts(initialProducts);
  }, []);

  // ... بقیه کد کامپوننت
}
```

### مرحله ۲: جایگزینی با فراخوانی API

حالا، `useEffect` بالا را طوری تغییر دهید که به جای استفاده از `initialProducts`، داده‌ها را از API بک‌اند شما فراخوانی کند. فرض کنید یک اندپوینت (Endpoint) به آدرس `/api/products` دارید که لیست محصولات را برمی‌گرداند.

```tsx
// src/app/products/page.tsx

'use client';

import { useState, useEffect } from 'react';
// ... سایر import ها

// آرایه initialProducts را می‌توانید حذف کنید

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // یک استیت برای مدیریت وضعیت لودینگ
  // ... سایر state ها

  useEffect(() => {
    // تابع برای فراخوانی داده‌ها از بک‌اند
    const fetchProducts = async () => {
      try {
        // آدرس API خود را جایگزin کنید
        const response = await fetch('https://your-backend-api.com/api/products'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        setProducts(data); // به‌روزرسانی استیت با داده‌های واقعی
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // می‌توانید در اینجا یک پیام خطا به کاربر نمایش دهید
      } finally {
        setIsLoading(false); // پایان وضعیت لودینگ
      }
    };

    fetchProducts(); // فراخوانی تابع
  }, []); // [] باعث می‌شود این افکت فقط یک بار پس از رندر اولیه اجرا شود

  if (isLoading) {
    return <div>در حال بارگذاری محصولات...</div>; // نمایش پیام لودینگ
  }

  // ... بقیه کد کامپوننت
}
```

### مرحله ۳: تکرار الگو برای سایر بخش‌ها

همین الگو باید برای تمام صفحات و کامپوننت‌هایی که نیاز به داده دارند، تکرار شود. لیست مهم‌ترین فایل‌هایی که باید ویرایش شوند:

*   **صفحه اصلی:** `src/app/page.tsx` (برای محصولات ویژه و آخرین پست‌ها)
*   **صفحه جزئیات محصول:** `src/app/products/[slug]/page.tsx` (برای دریافت اطلاعات یک محصول)
*   **صفحات وبلاگ:** `src/app/blog/page.tsx` و `src/app/blog/[slug]/page.tsx`
*   **صفحات پنل مدیریت:** تمام فایل‌های داخل `src/app/admin/**` (مانند سفارشات، مشتریان، پست‌ها و ...)
*   **صفحات حساب کاربری:** `src/app/account/page.tsx` و `src/app/account/orders/page.tsx`

### مدیریت عملیات CRUD (افزودن، خواندن، ویرایش، حذف)

برای عملیاتی مانند افزودن، ویرایش یا حذف داده‌ها (که عمدتاً در پنل مدیریت و صفحه حساب کاربری انجام می‌شود)، شما باید توابعی را که قبلاً برای مدیریت استیت نوشته شده‌اند، با فراخوانی‌های API جایگزین کنید.

**مثال: حذف یک محصول در پنل مدیریت**

**فایل هدف:** `src/app/admin/products/page.tsx`

**کد فعلی:**
```tsx
const handleDeleteProduct = (productId: string) => {
  setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  toast({
    title: "محصول حذف شد",
  });
};
```

**کد جدید با اتصال به API:**
```tsx
const handleDeleteProduct = async (productId: string) => {
  try {
    // فراخوانی API برای حذف محصول
    const response = await fetch(`https://your-backend-api.com/api/products/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the product.');
    }

    // اگر حذف در بک‌اند موفق بود، استیت را در فرانت‌اند به‌روز کنید
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    toast({
      title: "محصول با موفقیت حذف شد",
    });

  } catch (error) {
    console.error("Error deleting product:", error);
    toast({
      variant: "destructive",
      title: "خطا در حذف محصول",
    });
  }
};
```

با دنبال کردن این راهنما و تکرار الگوهای بالا، می‌توانید به راحتی فرانت‌اند پروژه را به بک‌اند پایتون خود متصل کرده و یک اپلیکیشن فول-استک کامل بسازید. موفق باشید!
