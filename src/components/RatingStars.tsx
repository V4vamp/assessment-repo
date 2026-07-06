import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export function RatingStars({ rating, size = 14 }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const roundedUp = rating - fullStars >= 0.75;
  const totalFull = roundedUp ? fullStars + 1 : fullStars;
  const emptyStars = Math.max(0, 5 - totalFull - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
      {Array.from({ length: totalFull }).map((_, i) => (
        <Star key={`full-${i}`} width={size} height={size} className="fill-accent text-accent" />
      ))}
      {hasHalfStar && <StarHalf width={size} height={size} className="fill-accent text-accent" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} width={size} height={size} className="text-muted-foreground/30" />
      ))}
    </div>
  );
}
