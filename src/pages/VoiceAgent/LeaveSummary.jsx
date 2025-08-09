import { BsStars } from "react-icons/bs";
import useLeaveApplicationStore from "../../store/useLeaveApplicationStore";

function LeaveSummary({ finalData, moveToForm }) {
  const { setFormData } = useLeaveApplicationStore();

  // Hardcoded data for testing form-switching
  const mockData = {
    leaveType: "Sick Leave",
    fromDate: "2025-08-12",
    toDate: "2025-08-14",
    reason: "Fever and cold",
    emergencyContact: "+91 9876543210",
    addressDuringLeave: "123 MG Road, Bangalore",
    currentAttendance: 85,
    attendanceAfterLeave: 80,
  };

  // Use mockData if finalData is empty
  const dataToShow = finalData || mockData;

  const {
    leaveType,
    fromDate,
    toDate,
    reason,
    emergencyContact,
    addressDuringLeave,
    currentAttendance,
    attendanceAfterLeave,
  } = dataToShow;

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

      <div className="flex justify-between gap-4">
        <button
          onClick={() => {
            moveToForm("manual");
            setFormData(dataToShow); // send mock data to form
          }}
          className="flex-1 py-2 px-4 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition"
          type="button"
        >
          Modify Leave
        </button>
        
         <button
          onClick={() => {
            moveToForm("manual");
            setFormData(dataToShow); // send mock data to form
          }}
          className="flex-1 py-2 px-4 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition"
          type="button"
        >
          Submit Leave
        </button>
      </div>
    </div>
  );
}

export default LeaveSummary;
