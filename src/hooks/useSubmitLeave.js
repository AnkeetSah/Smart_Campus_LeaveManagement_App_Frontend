// hooks/useSubmitLeave.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitLeave } from "../services/leaveService";
import useLeaveFormStore from "../store/useLeaveFormStore";
import useLeaveApplicationStore from "../store/useLeaveApplicationStore";

export default function useSubmitLeave() {
  const queryClient = useQueryClient();
  const { closeForm } = useLeaveFormStore();
  const {
    resetForm,
    setErrors,
    setIsSubmitting,
    formData,
  } = useLeaveApplicationStore();

  const mutation = useMutation({
    mutationFn: submitLeave,
    onSuccess: (data) => {
      console.log("Leave Submitted", data);
      alert("Leave submitted successfully!");
      queryClient.invalidateQueries(["myApplications"]);
      closeForm();
      resetForm();
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error(
        "Error submitting leave:",
        error.response?.data || error.message
      );
      setErrors({
        api: error.response?.data?.message || "Something went wrong!",
      });
      setIsSubmitting(false);
    },
  });

  const handleLeaveSubmit = () => {
    setIsSubmitting(true);

    const data = new FormData();
    for (let key in formData) {
      if (key === "documents") {
        formData.documents?.forEach((file) =>
          data.append("documents", file)
        );
      } else {
        data.append(key, formData[key]);
      }
    }

    mutation.mutate(data);
  };

  return {
    handleLeaveSubmit,
    isSubmitting: mutation.isPending,
  };
}
