import React from "react";
import useLeaveApplicationStore from "../../store/useLeaveApplicationStore";

function LeaveTypeSelector() {
  const { formData, setField } = useLeaveApplicationStore();

  return (
    <div className="bg-blue-50/40 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-5 rounded-xl shadow-sm space-y-3 transition-colors duration-300">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        Leave Type*
      </label>
      <div className="grid grid-cols-2 gap-4">
        {["personal", "medical", "emergency"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className={`flex items-center gap-2 bg-white/70 dark:bg-gray-700/80 p-3 rounded-lg border cursor-pointer transition-all
              ${
                formData.leaveType === type
                  ? "border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-900/30"
                  : "border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500"
              }
            `}
          >
            <input
              type="radio"
              id={type}
              name="leaveType"
              value={type}
              checked={formData.leaveType === type}
              onChange={(e) => setField("leaveType", e.target.value)}
              className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
            <span className="text-sm text-gray-700 dark:text-gray-200 capitalize">
              {type} Leave
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default LeaveTypeSelector;
