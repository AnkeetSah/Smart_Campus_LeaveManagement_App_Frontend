// hooks/useNotification.js
import { getNotifications, updateNotification } from "../services/notificationService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useNotification = () => {
  const queryClient = useQueryClient();

  // 1️⃣ Fetch notifications
  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });

  // 2️⃣ Update notification mutation
  const updateNotificationMutation = useMutation({
    mutationFn: (id) => updateNotification(id),
    onSuccess: () => {
      // Refresh notifications after update
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => {
      console.error("Failed to update notification", error);
    },
  });

  return { notificationsQuery, updateNotificationMutation };
};
