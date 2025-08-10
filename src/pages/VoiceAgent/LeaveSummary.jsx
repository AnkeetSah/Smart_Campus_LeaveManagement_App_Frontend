import React, { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import useLeaveApplicationStore from "../../store/useLeaveApplicationStore";
import { submitLeaveWithAttachments } from "../../services/leaveService";
import AttachmentField from "../../components/StudentLeaveForm/AttachmentField";

function LeaveSummary({ finalData, moveToForm }) {
  const { setFormData, formData } = useLeaveApplicationStore();
  const [addAttachments, setAddAttachments] = useState(false);

  const mockData = {
    leaveType: "medical",
    fromDate: "2025-08-12",
    toDate: "2025-08-14",
    reason: "Fever and cold",
    emergencyContact: "+91 9876543210",
    addressDuringLeave: "123 MG Road, Bangalore",
    currentAttendance: 85,
    attendanceAfterLeave: 80,
  };

  // On mount or finalData change, merge attachments from existing formData
  useEffect(() => {
    const baseData = !finalData || Object.keys(finalData).length === 0 ? mockData : finalData;

    // Merge attachments from current formData if exist to avoid overwriting
    const mergedData = {
      ...baseData,
      attachments: formData?.attachments || null,
    };

    setFormData(mergedData);
  }, [finalData, setFormData, formData?.attachments]);

  const handleSubmit = async () => {
    try {
      const response = await submitLeaveWithAttachments(formData); // submit full formData incl. attachments
      console.log("Leave submitted successfully:", response);
      alert("Leave application submitted successfully!");
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("Failed to submit leave application. Please try again.");
    }
  };

  const {
    leaveType,
    fromDate,
    toDate,
    reason,
    emergencyContact,
    addressDuringLeave,
    currentAttendance,
    attendanceAfterLeave,
  } = formData || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-green-50 border border-green-300 w-full rounded-xl p-6 mb-6 shadow-md mx-auto ">
      <h4 className="text-green-900 font-bold mb-4 flex items-center text-lg">
        <BsStars className="mr-2 text-green-600" />
        Leave Application Summary
      </h4>

      <div className="space-y-3 text-green-800 text-sm mb-6">
        <div><strong>Leave Type:</strong> {leaveType || "-"}</div>
        <div><strong>From Date:</strong> {formatDate(fromDate)}</div>
        <div><strong>To Date:</strong> {formatDate(toDate)}</div>
        <div><strong>Reason:</strong> {reason || "-"}</div>
        <div><strong>Emergency Contact:</strong> {emergencyContact || "-"}</div>
        <div><strong>Address During Leave:</strong> {addressDuringLeave || "-"}</div>
        <div><strong>Current Attendance:</strong> {currentAttendance ?? "-"}</div>
        <div><strong>Expected Attendance After Leave:</strong> {attendanceAfterLeave ?? "-"}</div>
      </div>

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={addAttachments}
          onChange={() => setAddAttachments(!addAttachments)}
          className="mr-2"
        />
        Would you like to add supporting documents?
      </label>

      {addAttachments && <AttachmentField />}

      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={() => {
            moveToForm("manual");
            // No need to setFormData here because already synced in useEffect
          }}
          className="flex-1 py-2 px-4 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition"
          type="button"
        >
          Modify Leave
        </button>

        <button
          onClick={handleSubmit}
          className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          type="button"
        >
          Submit Leave
        </button>
      </div>
    </div>
  );
}

export default LeaveSummary;
