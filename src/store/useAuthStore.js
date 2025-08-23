// src/store/useAuthStore.js
import { create } from "zustand";
import api from "../services/api"; 

const useAuthStore = create((set) => ({
   user: JSON.parse(localStorage.getItem("user")) || null,
  loading: true,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, loading: false });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null, loading: false });
  },

  fetchUser: async () => {
    try {
      const res = await api.get("/api/me");
      set({ user: res.data, loading: false });
    } catch (err) {
      console.error("Fetch user failed:", err);
      set({ user: null, loading: false });
    }
  },
 
  logoutUser: async () => {
    try {
      await api.post("/api/auth/logout");
      set({ user: null, loading: false });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  },
}));

export default useAuthStore;
