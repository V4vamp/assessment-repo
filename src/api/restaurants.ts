import type { Restaurant } from "../types/types";

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await fetch("/mock_data.json");

  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const data = await response.json();

  return data.restaurants;
};
