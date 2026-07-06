export const fetchLocalBukaData = async () => {
  const response = await fetch("/mock_data.json");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return response.json();
};