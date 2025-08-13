import { create } from "zustand";

const useLeaveApplicationStore = create((set) => ({
  formData: {
    leaveType: "casual",
    fromDate: "",
    toDate: "",
    reason: "",
    emergencyContact: "",
    addressDuringLeave: "",
    documents: null,
    currentAttendance: "",
    attendanceAfterLeave: "", // ✅ now dynamically set
  },

  errors: {},
  isSubmitting: false,

  setField: (name, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: value,
      },
      errors: {
        ...state.errors,
        [name]: "", // Clear error on update
      },
    })),

  setFormData: (newData) => set({ formData: newData }),

  setErrors: (errors) => set({ errors }),

  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),

  resetForm: () =>
    set({
      formData: {
        leaveType: "casual",
        fromDate: "",
        toDate: "",
        reason: "",
        emergencyContact: "",
        addressDuringLeave: "",
        attachments: null,
        currentAttendance: "",
        attendanceAfterLeave: "", // reset here too
      },
      errors: {},
      isSubmitting: false,
    }),
}));

export default useLeaveApplicationStore;
