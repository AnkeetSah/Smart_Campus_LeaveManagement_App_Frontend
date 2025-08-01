import api from "./api";

export const addSubscription = async (payload)=>{
  const res= await api.post('/api/notifications/subscribe',payload)
  return res.data
}