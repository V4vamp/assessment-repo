import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  restaurantName: string;
  isFavorite: boolean;
  onToggle: () => void;
}

export function FavoriteButton({ restaurantName, isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
        isFavorite
          ? 'bg-white/90 text-destructive scale-110 shadow-md'
          : 'bg-black/20 text-white hover:bg-black/40 hover:scale-105'
      }`}
      aria-label={isFavorite ? `Remove ${restaurantName} from favorites` : `Add ${restaurantName} to favorites`}
      aria-pressed={isFavorite}
    >
      <Heart className={`w-5 h-5 transition-transform ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  );
}
