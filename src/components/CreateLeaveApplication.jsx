import { motion } from "framer-motion";
import { useEffect } from "react";
import { RiLeafLine } from "react-icons/ri";
import useLeaveFormStore from "../store/useLeaveFormStore";
import LeaveTypeSelector from "./StudentLeaveForm/LeaveTypeSelector";
import useLeaveApplicationStore from "../store/useLeaveApplicationStore";
import DateRangePicker from "./StudentLeaveForm/DateRangePicker";
import InputField from "./StudentLeaveForm/InputField";
import AttachmentField from "./StudentLeaveForm/AttachmentField";
import validateLeaveForm from "../utils/validateLeaveForm";
import { submitLeave } from "../services/leaveService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiRobot2Line } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";

import {
  FaChevronLeft,
  
} from "react-icons/fa";
import AttendanceInput from "./StudentLeaveForm/AttendanceInput";
import useSubmitLeave from "../hooks/useSubmitLeave";
import ApplyLeaveHeader from "./StudentLeaveForm/ApplyLeaveHeader";
function CreateLeaveApplication() {
  const { formData, resetForm, setErrors,  setIsSubmitting,setFormData} =
    useLeaveApplicationStore();
  const queryClient = useQueryClient();
  const { closeForm } = useLeaveFormStore(); // ✅ Access the hook
  const { handleLeaveSubmit, isSubmitting } = useSubmitLeave();

  // Test data to populate the form
  const testData = {
    leaveType: "medical",
    fromDate: "2025-08-01",
    toDate: "2025-08-06",
    reason: "Viral Fever doctor told me to take rest.",
    emergencyContact: "+911234567890",
    addressDuringLeave: "Home",
    attachments: null,
    currentAttendance: "99.9",
    attendanceAfterLeave: "96.55"
  };

  // Populate form with test data on component mount
  useEffect(() => {
    setFormData(testData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setFormData]);
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateLeaveForm(formData);

  if (Object.keys(errors).length === 0) {
    handleLeaveSubmit();
  } else {
    setErrors(errors);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 pb-20 dark:to-gray-900 font-sans relative overflow-hidden transition-colors duration-300">
      {/* Floating Blobs Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 dark:hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
     <ApplyLeaveHeader closeForm={closeForm} />
  

      

      {/* Main Form */}
      <main className="relative z-10 mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden transition-colors duration-300"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 p-6 text-white">
            <h2 className="text-xl font-bold">Leave Application Form</h2>
            <p className="text-sm opacity-90">
              Submit your leave request and mention your details below
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Attendance Display */}
            <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Minimum 75% required for casual leave
                  </p>
                </div>
              </div>
            </div>

            {/* Leave Type */}
            <LeaveTypeSelector />

            {/* Date Range */}
            <DateRangePicker />
            <AttendanceInput />

            <InputField />

            {/* Attachments */}
            <AttachmentField />

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="focus:ring-indigo-500 dark:focus:ring-indigo-400 h-4 w-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-medium text-gray-700 dark:text-gray-200"
                >
                  I confirm all information is accurate
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Providing false information may result in disciplinary action
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
               disabled={isSubmitting}

                className={`w-full py-3 px-4 rounded-xl text-white font-bold shadow-md ${
                  isSubmitting
                    ? "bg-indigo-400 dark:bg-indigo-500"
                    : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 dark:from-blue-700 dark:to-indigo-800 dark:hover:from-blue-800 dark:hover:to-indigo-900"
                } transition-all duration-300`}
              >
               {isSubmitting ? "Submitting..." : "Submit Leave Application"}

              </motion.button>  
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

export default CreateLeaveApplication;
