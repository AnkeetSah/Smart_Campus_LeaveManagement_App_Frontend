import React, { useEffect } from "react";
import { useLeaveById } from "../../hooks/useMyLeaves";
import ApplyLeaveHeader from "../StudentLeaveForm/ApplyLeaveHeader";
import LeaveTypeSelector from "../StudentLeaveForm/LeaveTypeSelector";
import DateRangePicker from "../StudentLeaveForm/DateRangePicker";
import AttendanceInput from "../StudentLeaveForm/AttendanceInput";
import InputField from "../StudentLeaveForm/InputField";
import AttachmentField from "../StudentLeaveForm/AttachmentField";
import useLeaveApplicationStore from "../../store/useLeaveApplicationStore";
import { motion } from "framer-motion";
import useUpdateApplication from "../../hooks/useUpdateApplication";

const UpdateForm = ({ changesRequired, setForm, leaveId }) => {
  const { data } = useLeaveById(leaveId);
  const { formData,setFormData, isSubmitting } = useLeaveApplicationStore();
  const updateMutation = useUpdateApplication();

  const handleClose = () => setForm(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (data) {
      setFormData({
        ...data,
        fromDate: data.fromDate?.split("T")[0] || "",
        toDate: data.toDate?.split("T")[0] || "",
      });
    }
  }, [data, setFormData]);

  const handleUpdateLeave = (e) => {
    e.preventDefault();

    // Convert to FormData for file uploads
    const form = new FormData();

    for (const key in formData) {
      if (key === "documents" && Array.isArray(formData[key])) {
        formData[key].forEach((file) => {
          form.append("documents", file);
        });
      } else {
        form.append(key, formData[key]);
      }
    }

    updateMutation.mutate({ id: leaveId, formData: form });
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ApplyLeaveHeader content=" Back To Leave Status" onClose={handleClose} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white rounded-t-xl">
            <h2 className="text-xl font-bold mb-1">
              Update Your Leave Application Form
            </h2>
            <p className="text-sm font-semibold text-yellow-200">
              Changes Required:{" "}
              <span className="font-normal text-yellow-100">
                {changesRequired}
              </span>
            </p>
          </div>

          <form className="p-6 space-y-6" onSubmit={handleUpdateLeave}>
            <LeaveTypeSelector />
            <DateRangePicker />
            <AttendanceInput />
            <InputField />
            <AttachmentField />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || updateMutation.isLoading}
              className={`w-full py-3 px-4 rounded-xl text-white font-bold shadow-md ${
                isSubmitting || updateMutation.isLoading
                  ? "bg-indigo-400"
                  : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
              }`}
            >
              {isSubmitting || updateMutation.isLoading
                ? "Updating..."
                : "Update Leave Application"}
            </motion.button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateForm;
