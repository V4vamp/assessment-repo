import React, { useState } from 'react';
import { Heart, Star, Clock } from 'lucide-react';
import { Restaurant } from '../types';
import { getFallbackImage } from '../utils/imageFallback';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onToggleFavorite: (id: string, currentStatus: boolean) => void;
}

export function RestaurantCard({ restaurant, onToggleFavorite }: RestaurantCardProps) {
  const [imgSrc, setImgSrc] = useState(restaurant.image);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageError = () => {
    setImgSrc(getFallbackImage(restaurant.name));
  };

  return (
    <div className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-card-border shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted-foreground/20" />
        )}
        <img
          src={imgSrc}
          alt={restaurant.name}
          onLoad={() => setIsImageLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
        
        <button
          onClick={() => onToggleFavorite(restaurant.id, restaurant.favorite)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            restaurant.favorite 
              ? 'bg-white/90 text-destructive scale-110 shadow-md' 
              : 'bg-black/20 text-white hover:bg-black/40 hover:scale-105'
          }`}
          aria-label={restaurant.favorite ? `Remove ${restaurant.name} from favorites` : `Add ${restaurant.name} to favorites`}
          aria-pressed={restaurant.favorite}
        >
          <Heart 
            className={`w-5 h-5 transition-transform ${restaurant.favorite ? 'fill-current' : ''}`} 
          />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-foreground shadow-sm">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span>{restaurant.deliveryTime}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-card-foreground leading-tight line-clamp-1">{restaurant.name}</h3>
          <div className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span className="text-sm font-semibold text-card-foreground">{restaurant.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground font-medium">{restaurant.cuisine}</p>
        
        <div className="flex flex-wrap gap-1.5 mt-1">
          {restaurant.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-muted/50 text-muted-foreground rounded text-xs font-medium border border-border/50">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
