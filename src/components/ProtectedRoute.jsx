import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-gray-800 dark:text-gray-200 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 transition-all duration-500">
        Checking permissions...
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  // ✅ Prevent access if firstLogin is true
  if (user.firstLogin) return <Navigate to="/change-password" replace />;

  // Check role permissions
  const userRole = user.role;
  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProtectedRoute;
