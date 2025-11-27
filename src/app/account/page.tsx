import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, User, LogOut } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="bg-secondary">
      <div className="container py-16 md:py-24">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-8">My Account</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <aside className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="flex flex-col gap-2">
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/account">
                      <User className="mr-2 h-4 w-4" />
                      Account Details
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/account/orders">
                      <ListOrdered className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </Button>
                   <Button variant="ghost" className="justify-start text-destructive hover:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                   </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>
          <main className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">Welcome back, User!</p>
                <div className="space-y-4">
                    <p><span className="font-semibold">Name:</span> John Doe</p>
                    <p><span className="font-semibold">Email:</span> john.doe@example.com</p>
                </div>
                <Button className="mt-6">Edit Details</Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
