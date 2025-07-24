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
import AdminDashboard from "./components/AdminDashboard";
// Dummy dashboard components for now
import AuthorityDashboard from "./pages/Faculty/AuthorityDashboard";
import UserAdd from "./pages/Admin/UserAdd";
import api from "./services/api";


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
      <div
        className={`min-h-screen  w-full font-sans transition-all duration-500 ${
          darkMode == "dark" ? "dark" : "light"
        }`}
      >
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          footerRef={footerRef}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login/:userType" element={<LoginPage />} />

            {/* Protected Role-Based Dashboards */}

            {/* <Route element={<ProtectedRoute allowedRoles={["faculty"]} />}>
              <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
            </Route> */}

            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route path="/dashboard/student" element={<StudentDashboard />} />
            </Route>

            <Route
              element={
                <ProtectedRoute allowedRoles={["faculty", "hod", "warden"]} />
              }
            >
              <Route
                path="/authority/dashboard"
                element={<AuthorityDashboard />}
              />
            </Route>
           <Route element={<ProtectedRoute allowedRoles={["guard"]} />}>
  <Route path="/dashboard/guard" element={<GuardDashboard />} />
</Route>


            {/* <Route element={<ProtectedRoute allowedRoles={["warden"]} />}>
              <Route path="/dashboard/warden" element={<WardenDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["hod"]} />}>
              <Route path="/dashboard/hod" element={<HodDashboard />} />
            </Route> */}

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/leave" element={<LeaveStatusTracker/>} />
          </Routes>
        </main>

        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
