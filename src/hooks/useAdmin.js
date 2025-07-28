
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../services/adminService";

const useAddUsers = () => {
  return useMutation({
    mutationFn: addUser,
  });
};

export default useAddUsers;
