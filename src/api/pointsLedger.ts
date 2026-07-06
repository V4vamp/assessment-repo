import type { PointsLedger } from "../types/types";


export const fetchPointsLedger = async (): Promise<PointsLedger[]> => {
  const response = await fetch("/mock_data.json");

  if (!response.ok) {
    throw new Error("Failed to fetch points ledger");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const data = await response.json();

  return data.pointsLedger;
};