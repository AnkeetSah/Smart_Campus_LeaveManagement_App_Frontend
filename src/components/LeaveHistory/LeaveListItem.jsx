import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const LeaveListItem = ({ leave, index, expandedLeave, setExpandedLeave }) => {
  const isExpanded = expandedLeave === index;

  return (
    <div
      className="flex justify-between items-start cursor-pointer"
      onClick={() => setExpandedLeave(isExpanded ? null : index)}
    >
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            leave.finalStatus === "approved"
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
              : leave.finalStatus === "rejected"
              ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
          }`}>
            {leave.leaveType} Leave
          </span>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FaCalendarAlt className="mr-1.5 opacity-70" />
            {new Date(leave.fromDate).toLocaleDateString()} to {new Date(leave.toDate).toLocaleDateString()}
          </div>
        </div>
        <p className="text-sm font-medium mt-2 dark:text-gray-300">ID: {leave._id}</p>
      </div>
      <div className="ml-4">
        {isExpanded ? (
          <IoIosArrowUp className="text-gray-400 dark:text-gray-500 text-lg" />
        ) : (
          <IoIosArrowDown className="text-gray-400 dark:text-gray-500 text-lg" />
        )}
      </div>
    </div>
  );
};

export default LeaveListItem;