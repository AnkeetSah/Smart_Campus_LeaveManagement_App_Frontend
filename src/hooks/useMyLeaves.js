// hooks/useMyLeaves.js

import { useQuery } from "@tanstack/react-query";
import { getMyLeaves, getAllStudentLeaves, getLeaveById } from "../services/leaveService";
import useAuthStore from "../store/useAuthStore";

// ✅ Hook to get current user's leaves
export const useMyLeaves = (status = "") => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["myLeaves", user?.email || "", status], // cache is now user-specific
    queryFn: () => getMyLeaves(status),
    staleTime: 10 * 60 * 1000,  // 10 minutes
    refetchOnWindowFocus: true,
    keepPreviousData: true,
    enabled: !!user, // only run if user exists
  });
};

// ✅ Hook to get all student leaves (admin/authority)
export const useAllStudentLeaves = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["allStudentLeaves", user?.email || ""], // cache per logged-in authority user
    queryFn: getAllStudentLeaves,
    staleTime: 0,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
    enabled: !!user, // only run if user exists
  });
};

// ✅ Hook to get leave by ID
export const useLeaveById = (id) => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["leave", user?.email || "", id], // cache per user and leave id
    queryFn: () => getLeaveById(id),
    enabled: !!user && !!id, // only run if user exists and id is provided
  });
};
