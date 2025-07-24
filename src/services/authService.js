// src/services/authService.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const loginUser = async ({ email, password, role }) => {
  const res = await axios.post(`${API_BASE}/api/auth/login`, {
    email,
    password,
    role,
  }, {
    withCredentials: true,
  });

  return res.data;
};
