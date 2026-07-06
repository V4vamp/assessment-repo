export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: number;

  location: {
    lat: number;
    lng: number;
  };

  address: string;

  tags: string[];

  avgRating: string;

  isOpen: number;

  images: string[];

  favorite?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  referredBy: string | null;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  rating: number;
  comment: string;
  tags: string[];
  createdAt: string;
}

export interface PointsLedger {
  id: string;
  userId: string;
  action: string;
  points: number;
  createdAt: string;
}

export interface RestaurantWithStats extends Restaurant {
  reviewCount: number;
  computedRating: number | null;
}
