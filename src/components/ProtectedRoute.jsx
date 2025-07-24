import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Checking permissions...
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  const userRole = user.role;
  console.log(allowedRoles, userRole);
  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProtectedRoute;
