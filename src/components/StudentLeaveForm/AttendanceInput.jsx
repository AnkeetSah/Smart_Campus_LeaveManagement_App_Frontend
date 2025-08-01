import React, { useEffect, useMemo } from "react";
import useLeaveApplicationStore from "../../store/useLeaveApplicationStore";
import useAuthStore from "../../store/useAuthStore";

function AttendanceInput() {
  const { formData, setField } = useLeaveApplicationStore();
  const { user } = useAuthStore();

  const leaveDays = useMemo(() => {
    if (!formData.fromDate || !formData.toDate) return 0;
    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);
    if (isNaN(from.getTime()) || isNaN(to.getTime()) || to < from) return 0;

    let count = 0;
    const current = new Date(from);
    while (current <= to) {
      const day = current.getDay();
      if (day !== 0) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  }, [formData.fromDate, formData.toDate]);

  const getWorkingDaysBetween = (start, end) => {
    let count = 0;
    const current = new Date(start);
    while (current <= end) {
      const day = current.getDay();
      if (day !== 0) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  const predictedAttendance = useMemo(() => {
    const current = parseFloat(formData.currentAttendance);
    if (
      isNaN(current) ||
      current <= 0 ||
      leaveDays <= 0 ||
      !user?.semesterStartDate ||
      !user?.semesterEndDate
    )
      return null;

    const semStart = new Date(user.semesterStartDate);
    const semEnd = new Date(user.semesterEndDate);
    const totalWorkingDays = getWorkingDaysBetween(semStart, semEnd);
    const estimatedTotalClasses = totalWorkingDays * 4;

    const attendedClasses = (current / 100) * estimatedTotalClasses;
    const missedLeaveClasses = leaveDays * 4;
    const newTotalClasses = estimatedTotalClasses + missedLeaveClasses;
    const newAttendance = (attendedClasses / newTotalClasses) * 100;

    return Math.max(0, newAttendance).toFixed(2);
  }, [formData.currentAttendance, leaveDays, user]);

  useEffect(() => {
    if (predictedAttendance !== null) {
      setField("attendanceAfterLeave", predictedAttendance);
    } else {
      setField("attendanceAfterLeave", "");
    }
  }, [predictedAttendance, setField]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start bg-blue-50/40 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-xl shadow-sm transition-colors duration-300">
      <div>
        <label
          htmlFor="currentAttendance"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
        >
          Enter Your Current Attendance (%)
        </label>
        <input
          type="number"
          name="currentAttendance"
          id="currentAttendance"
          value={formData.currentAttendance || ""}
          onChange={(e) => setField("currentAttendance", e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700/50 dark:text-white"
          placeholder="Eg: 78.5"
          step="0.1"
          min="0"
          max="100"
        />
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-gray-700/80 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
        {predictedAttendance ? (
          <>
            <p className="leading-relaxed">
              📉 After <strong>{leaveDays}</strong> day(s) of leave, your
              attendance may drop to{" "}
              <span
                className={`font-semibold ${
                  parseFloat(predictedAttendance) < 75
                    ? "text-red-600 dark:text-red-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {predictedAttendance}%
              </span>
              .
            </p>
            {parseFloat(predictedAttendance) < 75 && (
              <p className="mt-2 text-red-500 dark:text-red-400 text-xs font-medium">
                ⚠️ Warning: Below 75% attendance requirement.
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            📊 Your predicted attendance after leave will appear here.
          </p>
        )}
      </div>
    </div>
  );
}

export default AttendanceInput;
