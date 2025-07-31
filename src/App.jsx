import { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import useAuthStore from "./store/useAuthStore";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import Unauthorized from "./pages/Unauthorized";
import CreateLeaveApplication from "./components/CreateLeaveApplication";
import LeaveHistory from "./components/LeaveHistory";
import LeaveStatusTracker from "./components/LeaveStatusTracker";
import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
import ScrollToTop from "./components/ScrollToTop";
import StudentLeaveForm from "./components/StudentLeaveForm";
import GuardDashboard from "./pages/GuardDashboard/GuardDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
// Dummy dashboard components for now
import AuthorityDashboard from "./pages/Faculty/AuthorityDashboard";
import UserAdd from "./pages/Admin/UserAdd";
import api from "./services/api";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserManagement from "./pages/Admin/UserManagement";
import ChangePassword from "./pages/changepassword/ChangePassword";
const HodDashboard = () => {
  const name = useAuthStore((state) => state.user?.name);
  return <h1 className="text-xl font-bold text-center">Hello HOD, {name}</h1>;
};

const WardenDashboard = () => (
  <h1 className="text-xl font-bold text-center">Hello Warden</h1>
);
const API_BASE = import.meta.env.VITE_API_URL;
function App() {
  const footerRef = useRef(null);

  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/me");
        setUser(res.data);
      } catch (err) {
        console.log("⚠️ User not authenticated");
        clearUser();
      }
    };

    fetchUser();
  }, [setUser, clearUser]);

  //dark mode feature
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
   <Router>
      <ScrollToTop />
      <div className={`min-h-screen w-full transition-all duration-500 ${darkMode ? "dark" : "light"}`}>
        <Routes>
          {/* 🔹 User Layout */}
          <Route element={<UserLayout darkMode={darkMode} setDarkMode={setDarkMode} footerRef={footerRef} />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login/:userType" element={<LoginPage />} />
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route path="/dashboard/student" element={<StudentDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["faculty", "hod", "warden"]} />}>
              <Route path="/authority/dashboard" element={<AuthorityDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["guard"]} />}>
              <Route path="/dashboard/guard" element={<GuardDashboard />} />
            </Route>
          <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

          </Route>

          {/* 🔸 Admin Layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
           
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
