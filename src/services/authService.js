// src/services/authService.js
import api from "./api"; // ✅ Import centralized Axios instance

export const loginUser = async ({ email, password, role }) => {
  const res = await api.post("/api/auth/login", {
    email,
    password,
    role,
  });

  return res.data;
};
