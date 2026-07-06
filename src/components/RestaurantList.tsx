/* eslint-disable react-hooks/purity*/

import type { RestaurantWithStats } from '../types/types';
import { RestaurantCard } from './RestaurantCard';
import { SkeletonCard } from './SkeletonCard';
import { EmptyState } from './EmptyState';

interface RestaurantListProps {
  restaurants: RestaurantWithStats[];
  isLoading: boolean;
  onToggleFavorite: (id: string, currentStatus: boolean) => void;
}

export function RestaurantList({ restaurants, isLoading, onToggleFavorite }: RestaurantListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1  xl:grid-cols-2 gap-6">
      {restaurants.map(restaurant => (
        <div
          key={restaurant.id}
          className="animate-in fade-in zoom-in-95 duration-500 fill-mode-both"
          style={{ animationDelay: `${Math.random() * 100}ms` }}
        >
          <RestaurantCard restaurant={restaurant} onToggleFavorite={onToggleFavorite} />
        </div>
      ))}
    </div>
  );
}
