import { useQuery } from "@tanstack/react-query";
import { fetchPointsLedger } from "../api/pointsLedger";
import type { PointsLedger } from "../types/types";

export const useLedgerPoints = () => {
  return useQuery<PointsLedger[], Error>({
    queryKey: ["pointsLedger"],
    queryFn: fetchPointsLedger,
  });
};