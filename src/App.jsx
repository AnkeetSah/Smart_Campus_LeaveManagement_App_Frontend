import { useRef, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import useAuthStore from "./store/useAuthStore";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import Unauthorized from "./pages/Unauthorized";

import ScrollToTop from "./components/ScrollToTop";
import PublicRoute from "./components/PublicRoute";
import GuardDashboard from "./pages/GuardDashboard/GuardDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
// Dummy dashboard components for now
import AuthorityDashboard from "./pages/Faculty/AuthorityDashboard";
import api from "./services/api";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserManagement from "./pages/Admin/UserManagement";
import ChangePassword from "./pages/changepassword/ChangePassword";
import MyProfile from "./pages/profile/studentProfile/MyProfile";
import { registerServiceWorker } from "./utils/registerServiceWorker";
import { subscribeToPush } from "./utils/subscribeToPush";
import useAddSubscription from "./hooks/useAddSubscription";
import FacultyProfile from "./pages/profile/faculty/FacultyProfile";
import ApplicationMethodSelector from "./components/StudentLeaveForm/ApplicationMethodSelector";
import VoiceAgent from "./pages/VoiceAgent/VoiceAgent";
import LeaveStatusTracker from "./components/LeaveStatus/LeaveStatus";
import LeaveHistory from "./components/LeaveHistory";
import CreateLeaveApplication from "./components/CreateLeaveApplication";
import Notification from "./pages/notification/Notification";
import NotFound from "./pages/NotFound";
import FirstLoginRoute from "./components/FirstLoginRoute";
import { studentRoutes } from "./routes/StudentRoutes";
import { authorityRoutes } from "./routes/AuthorityRoutes";
const API_BASE = import.meta.env.VITE_API_URL;
function App() {
  const footerRef = useRef(null);
  const user = useAuthStore((state) => state.user);
  const mutation = useAddSubscription();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/me");
         console.log(res)
        setUser(res.data);
      } catch (err) {
        console.log("⚠️ User not authenticated");
        clearUser();
      }
    };

    fetchUser();
  }, [setUser, clearUser]);

  useEffect(() => {
    if (!user) return; // Don't run if user is not set

    const setupServiceWorker = async () => {
      const registration = await registerServiceWorker();
      if (registration) {
        const payload = await subscribeToPush(registration, user);
        if (payload) {
          mutation.mutate(payload, {
            onSuccess: () => console.log("✅ Subscription sent to server"),
            onError: (err) =>
              console.error("❌ Failed to send subscription", err),
          });
        }
      }
    };

    setupServiceWorker();
  }, [user]); // 👈 re-run when `user` is set

  //dark mode feature
  const [darkMode, setDarkMode] = useState(() => {
    // Load from localStorage on first render
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true"; // converts string to boolean
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save to localStorage whenever darkMode changes
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTop />
      <div
        className={`min-h-screen w-full transition-all duration-500 ${
          darkMode ? "dark" : "light"
        }`}
      >
        <Routes>
          {/* 🔹 User Layout */}
          <Route
            element={
              <UserLayout
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                footerRef={footerRef}
              />
            }
          >
            // Landing page
            <Route
              path="/"
              element={
                 <PublicRoute>
                  <LandingPage />
                 </PublicRoute>
                  

                
              }
            />
            // Login page
            <Route
              path="/login/:userType"
              element={
                
                  <LoginPage />
                
              }
            />
            {/* ✅ Spread student routes */}
            {studentRoutes}
            {authorityRoutes}
            <Route element={<ProtectedRoute allowedRoles={["guard"]} />}>
              <Route path="/dashboard/guard" element={<GuardDashboard />} />
            </Route>
            <Route element={<FirstLoginRoute />}>
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 🔸 Admin Layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
