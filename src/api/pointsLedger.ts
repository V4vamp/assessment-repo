export const fetchPointsLedger = async () => {
  const response = await fetch("/mock_data.json");

  if (!response.ok) {
    throw new Error("Failed to fetch points ledger");
  }

  const data = await response.json();

  return data.pointsLedger;
};