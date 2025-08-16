import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    // Show a blank screen or spinner while checking user
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-600 dark:text-gray-300">Loading...</span>
      </div>
    );
  }

  if (!user) return children;

  // Redirect based on role
  switch (user.role) {
    case "student":
      return <Navigate to="/dashboard/student" replace />;
    case "faculty":
      return <Navigate to="/authority/dashboard" replace />;
    case "guard":
      return <Navigate to="/dashboard/guard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default PublicRoute;
