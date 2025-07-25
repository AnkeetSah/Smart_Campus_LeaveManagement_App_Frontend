import { io } from "socket.io-client";

// Dynamically choose backend URL based on environment
const BACKEND_URL =
  import.meta.env.PROD
    ? "https://leaveflow-app-backend.onrender.com/" // 🔁 replace with your actual Render backend URL
    : "http://localhost:5000";

const socket = io(BACKEND_URL, {
  withCredentials: true,
});

export default socket;
