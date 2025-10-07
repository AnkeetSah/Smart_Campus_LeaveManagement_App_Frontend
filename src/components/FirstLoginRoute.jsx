import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const FirstLoginRoute = () => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Checking user...
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  // Only allow users who are on first login
  if (user.firstLogin) return <Outlet />;

  // If already changed password, redirect to their dashboard
  if (user.role === "student") return <Navigate to="/dashboard/student" replace />;
  if (user.role === "guard") return <Navigate to="/dashboard/guard" replace />;
  return <Navigate to="/authority/dashboard" replace />;
};

export default FirstLoginRoute;
