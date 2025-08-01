import useLeaveApplicationStore from "../../store/useLeaveApplicationStore";

const DateRangePicker = () => {
  const { formData, setField, errors } = useLeaveApplicationStore();

  return (
    <div className="space-y-6 bg-blue-50/40 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-xl shadow-sm transition-colors duration-300">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="fromDate"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
          >
            From Date*
          </label>
          <div className="relative">
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={formData.fromDate}
              onChange={(e) => setField("fromDate", e.target.value)}
              className={`block w-full rounded-lg border ${
                errors.fromDate
                  ? "border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/70 dark:bg-gray-700/50 cursor-pointer dark:text-white`}
              onFocus={(e) => e.target.showPicker?.()}
            />
          </div>
          {errors.fromDate && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.fromDate}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="toDate"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
          >
            To Date*
          </label>
          <div className="relative">
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={formData.toDate}
              onChange={(e) => setField("toDate", e.target.value)}
              className={`block w-full rounded-lg border ${
                errors.toDate
                  ? "border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/70 dark:bg-gray-700/50 cursor-pointer dark:text-white`}
              onFocus={(e) => e.target.showPicker?.()}
            />
          </div>
          {errors.toDate && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.toDate}
            </p>
          )}
        </div>
      </div>

      {formData.fromDate && formData.toDate && (
        <div className="bg-white/70 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
          <p className="text-sm text-gray-700 dark:text-gray-200">
            🗓️ Total Leave Days:{" "}
            <span className="font-semibold">
              {Math.ceil(
                (new Date(formData.toDate) - new Date(formData.fromDate)) /
                  (1000 * 60 * 60 * 24)
              ) + 1}
            </span>{" "}
            day(s)
          </p>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
