// src/store/useAuthStore.js
import { create } from "zustand";
import api from "../services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useAuthStore = create((set, get) => ({
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
      // Call backend logout
      await api.post("/api/auth/logout");

      // Clear user from Zustand
      get().clearUser();

      // Clear all React Query caches
      const queryClient = useQueryClient();
      queryClient.clear(); // removes all cached queries
    } catch (err) {
      console.error("Logout failed:", err);
    }
  },
}));

export default useAuthStore;
