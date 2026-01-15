import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ allowedRoles }) => {
  // ✅ Subscribe to store updates
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  // Loading spinner while fetching user
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Checking permissions...
      </div>
    );
  }

  // If user not logged in → redirect to landing/login
  if (!user) return <Navigate to="/" replace />;

  // If first login → force change password
  if (user.firstLogin) return <Navigate to="/change-password" replace />;

  // Check role permissions
  return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
