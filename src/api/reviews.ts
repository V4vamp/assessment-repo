import type { Review } from "../types/types";

export const fetchReviews = async (): Promise<Review[]> => {
  const response = await fetch("/mock_data.json");

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const data = await response.json();

  return data.reviews;
};