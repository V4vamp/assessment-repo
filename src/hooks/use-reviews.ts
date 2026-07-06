import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "../api/reviews";

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });
};