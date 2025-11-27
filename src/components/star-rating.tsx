import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const StarRating = ({ rating, maxRating = 5, className }: StarRatingProps) => {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            'h-4 w-4',
            rating > index
              ? 'text-primary fill-primary'
              : 'text-muted-foreground/50'
          )}
        />
      ))}
    </div>
  );
};

export default StarRating;
