import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-headline text-2xl font-bold tracking-tight">
        زر برنج
      </span>
      <Leaf className="h-7 w-7 text-primary" />
    </div>
  );
}
