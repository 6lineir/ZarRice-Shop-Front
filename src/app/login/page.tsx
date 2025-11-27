import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center items-center">
          <Link href="/" className="mb-4 inline-block">
            <Logo />
          </Link>
          <CardTitle className="font-headline text-2xl">خوش آمدید</CardTitle>
          <CardDescription>برای دسترسی به حساب خود وارد شوید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 text-right">
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" placeholder="m@example.com" required dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" type="password" required dir="ltr" />
            </div>
            <Button type="submit" className="w-full">
              ورود
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-4 text-sm">
           <div className="text-center">
            حساب کاربری ندارید؟{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              ثبت نام کنید
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
