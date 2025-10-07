// src/routes/AuthorityRoutes.jsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthorityDashboard from "../pages/Faculty/AuthorityDashboard";
import FacultyProfile from "../pages/profile/faculty/FacultyProfile";

export const authorityRoutes = [
  <Route
    element={<ProtectedRoute allowedRoles={["faculty", "hod", "warden"]} />}
    key="authority-protected"
  >
    <Route path="/authority/dashboard" element={<AuthorityDashboard />} />
    <Route path="/authority/dashboard/profile" element={<FacultyProfile />} />
  </Route>,
];
