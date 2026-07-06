import { useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../api/restaurants";

export const useRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });
};