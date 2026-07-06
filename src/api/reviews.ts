export const fetchReviews = async () => {
  const response = await fetch("/mock_data.json");

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const data = await response.json();

  return data.reviews;
};