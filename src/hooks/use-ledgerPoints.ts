import { useQuery } from "@tanstack/react-query";
import { fetchPointsLedger } from "../api/pointsLedger";

export const useledgerPoints = () => {
  return useQuery({
    queryKey: ["pointsLedger"],
    queryFn: fetchPointsLedger,
  });
};