import { useRef, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
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
import { StudentRoutes } from "./routes/StudentRoutes";
import { authorityRoutes } from "./routes/AuthorityRoutes";



function App() {
  //dark mode feature
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTop />
      <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
    </Router>
  );
}

// ✅ All hooks that need Router (like useNavigate) go here
function AppRoutes({ darkMode, setDarkMode }) {
  const footerRef = useRef(null);
  const user = useAuthStore((state) => state.user);
  const mutation = useAddSubscription();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  // Step 1: Fetch user on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/me");
        setUser(res.data);
      } catch {
        console.log("⚠️ User not authenticated");
        clearUser();
      }
    };
    fetchUser();
  }, [setUser, clearUser]);

  // Step 2: Auto navigate to dashboard if user already logged in
  useEffect(() => {
  if (!user) return;

  const currentPath = window.location.pathname;

  // ✅ Only redirect to dashboard if on a public route
  const isPublic =
    currentPath === "/" ||
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/change-password");

  if (isPublic) {
    switch (user.role) {
      case "student":
        navigate("/dashboard/student", { replace: true });
        break;
      case "faculty":
        navigate("/dashboard/faculty", { replace: true });
        break;
      case "guard":
        navigate("/dashboard/guard", { replace: true });
        break;
      case "admin":
        navigate("/admin/dashboard", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
    }
  }
}, [user, navigate]);


  // Step 3: Setup push notifications
  useEffect(() => {
    if (!user) return;

    const setupServiceWorker = async () => {
      const registration = await registerServiceWorker();
      if (registration) {
        const payload = await subscribeToPush(registration, user);
        if (payload) {
          mutation.mutate(payload, {
            onSuccess: () => console.log("✅ Subscription sent to server"),
            onError: (err) => console.error("❌ Failed to send subscription", err),
          });
        }
      }
    };

    setupServiceWorker();
  }, [user]);

  return (
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
          {/* Landing page */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          {/* Login page */}
          <Route path="/login/:userType" element={<LoginPage />} />

          {/* ✅ Student & Authority Routes */}
          {StudentRoutes()}
          {authorityRoutes}

          {/* Guard Route */}
          <Route element={<ProtectedRoute allowedRoles={["guard"]} />}>
            <Route path="/dashboard/guard" element={<GuardDashboard />} />
          </Route>

          {/* First Login Route */}
          <Route element={<FirstLoginRoute />}>
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 🔸 Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
