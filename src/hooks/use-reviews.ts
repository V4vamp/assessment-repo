import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "../api/reviews";
import type { Review } from "../types/types";


export const useReviews = () => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });
};