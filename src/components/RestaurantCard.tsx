import { useState } from "react";
import { MapPin } from "lucide-react";
import type { RestaurantWithStats } from "../types/types";
import { FavoriteButton } from "./FavoriteButton";
import { RatingStars } from "./RatingStars";
import { Circle } from "lucide-react";

const placeHolder = `https://us.123rf.com/450wm/rahmatnurohman/rahmatnurohman2206/rahmatnurohman220600665/187296795-restaurant-logo-vector-design-illustration-and-background.jpg?ver=6`;

interface RestaurantCardProps {
  restaurant: RestaurantWithStats;
  onToggleFavorite: (id: string, currentStatus: boolean) => void;
}

const nairaSymbols: Record<number, string> = {
  1: "₦",
  2: "₦₦",
  3: "₦₦₦",
  4: "₦₦₦₦",
};

export function RestaurantCard({
  restaurant,
  onToggleFavorite,
}: RestaurantCardProps) {
  const [imgSrc, setImgSrc] = useState(
    restaurant.images[0] ?? placeHolder,
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isFavorite = Boolean(restaurant.favorite);
  const isOpen = restaurant.isOpen === 1;

  const handleImageError = () => {
    setImgSrc(placeHolder);
  };

  const priceLabel =
    nairaSymbols[Math.max(1, Math.min(4, restaurant.priceRange))];

  return (
    <div className="group flex flex-col bg-card rounded-xl overflow-hidden border border-card-border shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted-foreground/20" />
        )}
        <img
          src={imgSrc}
          alt={restaurant.name}
          onLoad={() => setIsImageLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
        />

        <FavoriteButton
          restaurantName={restaurant.name}
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(restaurant.id, isFavorite)}
        />

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-foreground shadow-sm">
          <span aria-hidden="true">
            {isOpen ? (
              <Circle className="w-4 h-4 text-green-500" />
            ) : (
              <Circle className="w-4 h-4 text-red-500" />
            )}
          </span>
          <span>{isOpen ? "Open" : "Closed"}</span>
        </div>

        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-foreground shadow-sm">
          {priceLabel}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-bold text-card-foreground leading-tight line-clamp-1">
            {restaurant.name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground font-medium">
          {restaurant.cuisine}
        </p>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">{restaurant.address}</span>
        </div>

        {restaurant.reviewCount > 0 ? (
          <div className="flex items-center gap-2">
            <RatingStars rating={restaurant.computedRating ?? 0} />
            <span className="text-sm font-semibold text-card-foreground">
              {restaurant.computedRating?.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({restaurant.reviewCount}{" "}
              {restaurant.reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground italic">
            No reviews yet
          </span>
        )}

        <div className="flex flex-wrap gap-1.5 mt-1">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-muted/50 text-muted-foreground rounded text-xs font-medium border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
