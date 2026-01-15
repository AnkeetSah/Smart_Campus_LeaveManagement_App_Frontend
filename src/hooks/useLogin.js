import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import socket from "../socket";


const useLogin = (role) => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password, role }),

   onSuccess: (data) => {
  setUser(data.user);
  console.log("Login success:", data);

  // ✅ If first login, redirect only to change-password
  if (data.user.firstLogin) {
    navigate("/change-password", { replace: true });
    return; // Stop further navigation
  }

  // Navigation based on role
  switch (data.user.role) {
    case "student":
      navigate("/dashboard/student", { replace: true });
      break;
    case "faculty":
    case "hod":
    case "warden":
      navigate("/authority/dashboard", { replace: true });
      break;
    case "admin":
      navigate("/dashboard/admin", { replace: true });
      break;
    case "guard":
      navigate("/dashboard/guard", { replace: true });
      break;
    default:
      navigate("/unauthorized", { replace: true });
  }
}


    ,

    onError: (error) => {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    },
  });
};

export default useLogin;
