// src/services/authService.js
import axios from "axios";

export const loginUser = async ({ email, password, role }) => {
  const res = await axios.post("/api/auth/login", { email, password, role }, {
    withCredentials: true,
  });
  
  return res.data;

};
