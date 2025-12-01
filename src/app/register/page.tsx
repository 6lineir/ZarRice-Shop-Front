import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ username: email, email, password, first_name: name });
      router.push('/');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex min-h-dvh items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center items-center">
           <Link href="/" className="mb-4 inline-block">
            <Logo />
          </Link>
          <CardTitle className="font-headline text-2xl">ایجاد حساب کاربری</CardTitle>
          <CardDescription>برای شروع سفر برنج ممتاز خود به زر برنج بپیوندید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 text-right" onSubmit={handleSubmit}>
             <div className="space-y-2">
              <Label htmlFor="name">نام</Label>
              <Input id="name" type="text" placeholder="علی رضایی" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" placeholder="m@example.com" required dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" type="password" required dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'درحال ساخت حساب...' : 'ایجاد حساب'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
           <div className="text-center text-sm w-full">
            قبلا حساب کاربری ساخته‌اید؟{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              وارد شوید
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
