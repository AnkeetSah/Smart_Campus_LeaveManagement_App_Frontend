// src/store/useAuthStore.js
import { create } from "zustand";
import api from "./api"; // Ensure this has baseURL and withCredentials configured

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }),
  clearUser: () => set({ user: null, loading: false }),

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
