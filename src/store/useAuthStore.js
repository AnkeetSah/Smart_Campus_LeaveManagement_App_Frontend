import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }),
  clearUser: () => set({ user: null, loading: false }),

  fetchUser: async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/me", {
        withCredentials: true,
      });
      set({ user: res.data, loading: false });
    } catch (err) {
      set({ user: null, loading: false });
    }
  },

  logoutUser: async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      set({ user: null, loading: false });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  },
}));


export default useAuthStore;
