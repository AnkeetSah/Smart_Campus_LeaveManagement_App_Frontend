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
  console.log(data)
  const userRole = data.user.role;
  
  if(data.user.firstLogin=="true"){
    navigate("/change-password");
    return;
  }
  

  

  // Navigation based on role
  switch (userRole) {
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
