import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Restaurant, RestaurantWithStats, Review } from "../types/types";
import { fetchRestaurants } from "../api/restaurants";
import { fetchReviews } from "../api/reviews";

function computeStats(
  restaurant: Restaurant,
  reviews: Review[]
): RestaurantWithStats {
  const restaurantReviews = reviews.filter(
    (review) => review.restaurantId === restaurant.id
  );

  const reviewCount = restaurantReviews.length;

  const computedRating =
    reviewCount > 0
      ? restaurantReviews.reduce((sum, review) => sum + review.rating, 0) /
        reviewCount
      : null;

  return {
    ...restaurant,
    reviewCount,
    computedRating,
  };
}

export function useRestaurants(
  searchQuery: string,
  activeFilter: string
) {
  const {
    data: restaurantsData = [],
    isLoading: restaurantsLoading,
    error: restaurantsError,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

 
  const [restaurants, setRestaurants] = useState<RestaurantWithStats[]>([]);

  useEffect(() => {
    const enriched = restaurantsData.map((restaurant) =>
      computeStats(
        {
          ...restaurant,
          favorite: restaurant.favorite ?? false,
        },
        reviews
      )
    );

    setRestaurants(enriched);
  }, [restaurantsData, reviews]);

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.cuisine.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.tags.some((tag) =>
            tag.toLowerCase().includes(query)
          )
      );
    }

    if (activeFilter !== "All") {
      result = result.filter(
        (restaurant) =>
          restaurant.cuisine === activeFilter ||
          restaurant.tags.includes(activeFilter)
      );
    }

    return result;
  }, [restaurants, searchQuery, activeFilter]);

  const toggleFavoriteState = (id: string, favorite: boolean) => {
    setRestaurants((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, favorite }
          : restaurant
      )
    );
  };

  return {
    restaurants: filteredRestaurants,
    isLoading: restaurantsLoading || reviewsLoading,
    isError: !!restaurantsError || !!reviewsError,
    error: restaurantsError || reviewsError,
    toggleFavoriteState,
  };
}