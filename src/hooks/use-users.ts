import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import type { User } from "../types/types";

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};