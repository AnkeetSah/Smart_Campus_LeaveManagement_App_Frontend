import { useMutation } from "@tanstack/react-query";
import { updateLeave } from "../services/leaveService";
import useLeaveApplicationStore from "../store/useLeaveApplicationStore";

const useUpdateApplication = () => {
  const { setIsSubmitting, formData, resetForm } = useLeaveApplicationStore(); // ✅ call the hook

  const mutation = useMutation({
    mutationFn: ({ id, formData }) => updateLeave(id, formData), // ✅ dynamic params
    onMutate: () => {
      setIsSubmitting(true);
       
    },
    onSuccess: (data) => {
  console.log("Updated leave from backend:", data);
  resetForm()
  // Optionally update store/UI here
},

    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  return mutation;
};

export default useUpdateApplication;
