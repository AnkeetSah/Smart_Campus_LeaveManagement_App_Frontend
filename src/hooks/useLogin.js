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
  console.log('use data ', data.user.firstLogin);

  // Always prioritize first login redirect
  if (data.user.firstLogin) {
    // Use setTimeout to ensure navigation happens after state updates
    setTimeout(() => {
      navigate("/change-password");
    }, 0);
    return; // stop further execution
  }

  // Navigation based on role
  switch (data.user.role) {
    case "student":
      navigate("/dashboard/student");
      break;
    case "faculty":
    case "hod":
    case "warden":
      navigate("/authority/dashboard");
      break;
    case "admin":
      navigate("/dashboard/admin");
      break;
    case "guard":
      navigate("/dashboard/guard");
      break;
    default:
      navigate("/unauthorized");
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
