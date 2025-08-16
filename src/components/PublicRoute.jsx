import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
