import React from "react";
import useLeaveApplicationStore from "../../store/useLeaveApplicationStore";

const InputField = () => {
  const { formData, setField, errors } = useLeaveApplicationStore();

  return (
    <div className="space-y-6 bg-blue-50/40 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-xl shadow-sm transition-colors duration-300">
      {/* Reason for Leave */}
      <div>
        <label
          htmlFor="reason"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
        >
          Reason for Leave*
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={4}
          value={formData.reason}
          onChange={(e) => setField("reason", e.target.value)}
          className={`block w-full rounded-lg border ${
            errors.reason
              ? "border-red-400"
              : "border-gray-300 dark:border-gray-600"
          } p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none bg-white/70 dark:bg-gray-700/50 dark:text-white`}
          placeholder="Please describe the reason for your leave in detail..."
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.reason}
          </p>
        )}
      </div>

      {/* Emergency Contact */}
      <div>
        <label
          htmlFor="emergencyContact"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
        >
          Emergency Contact Number*
        </label>
        <input
          type="tel"
          id="emergencyContact"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={(e) => setField("emergencyContact", e.target.value)}
          className={`block w-full rounded-lg border ${
            errors.emergencyContact
              ? "border-red-400"
              : "border-gray-300 dark:border-gray-600"
          } p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/70 dark:bg-gray-700/50 dark:text-white`}
          placeholder="+91 9876543210"
        />
        {errors.emergencyContact && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.emergencyContact}
          </p>
        )}
      </div>

      {/* Address During Leave */}
      <div>
        <label
          htmlFor="addressDuringLeave"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
        >
          Address During Leave Period
        </label>
        <textarea
          id="addressDuringLeave"
          name="addressDuringLeave"
          rows={3}
          value={formData.addressDuringLeave}
          onChange={(e) => setField("addressDuringLeave", e.target.value)}
          className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none bg-white/70 dark:bg-gray-700/50 dark:text-white"
          placeholder="Where will you be staying during your leave?"
        />
      </div>
    </div>
  );
};

export default InputField;
