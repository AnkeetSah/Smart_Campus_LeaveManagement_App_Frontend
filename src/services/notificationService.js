import api from "./api";

export const addSubscription = async (payload) => {
  const res = await api.post('/api/notifications/subscribe', payload)
  return res.data
}

/*for sending notiofication to he user */
export const getNotifications = async () => {
  const res = await api.get("/api/notifications");
  console.log('bhjgh', res.data)
  return res.data;
};

export const updateNotification = async (id) => {
  const res = await api.post("/api/notifications/update", { id });
  return res.data;

}