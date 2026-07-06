import type { User } from "../types/types";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/mock_data.json");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const data = await response.json();

  return data.users;
};
