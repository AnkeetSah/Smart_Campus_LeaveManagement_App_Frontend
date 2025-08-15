// src/components/LeaveTrackerCard.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";
import {
  FaUserTie,
  FaShieldAlt,
  FaUniversity,
  FaClock,
  FaCheck,
  FaEdit,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const LeaveTrackerCard = ({ setChangesrequired, leaveData,setForm,setLeaveId }) => {
  
   const stageWithChanges = leaveData.stages.find(
    stage => stage.status === "changes_requested"
  );
  
  
  const getStageIcon = (stage) => {
    switch (stage.id) {
      case "faculty":
        return <FaUserTie className="text-lg" />;
      case "warden":
        return <FaShieldAlt className="text-lg" />;
      case "hod":
        return <FaUniversity className="text-lg" />;
      default:
        return <FaUserTie className="text-lg" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheck className="text-green-500" />;
      case "rejected":
        return <span className="text-red-500">✕</span>;
      case "pending":
        return <IoMdTime className="text-yellow-500" />;
      case "changes_requested":
        return <FaEdit className="text-orange-500" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80  dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden  transition-colors duration-300 mb-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 sm:p-6 text-white">
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
    <div>
      <h2 className="text-lg sm:text-xl font-bold break-words">
        Application #{leaveData._id}
      </h2>
      <p className="text-xs sm:text-sm opacity-90">{leaveData.leaveType}</p>
    
    </div>
    <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/20 rounded-full text-[10px] sm:text-xs font-medium capitalize self-start sm:self-auto">
      {leaveData.status === "pending" ? "In Progress" : leaveData.status}
    </span>
  </div>
</div>


      {/* Details */}
      <div className="p-6">
        <div className="grid  gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500  dark:text-blue-300 mb-1">
              Leave Period
            </h3>
            <p className="font-medium dark:text-gray-400">
              {leaveData.fromDate} to {leaveData.toDate}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-blue-300  mb-1">Reason</h3>
            <p className="font-medium dark:text-gray-400">{leaveData.reason}</p>
          </div>
        </div>

       <div className="bg-blue-50/50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4 transition-colors">
  <p className="text-sm text-gray-700 dark:text-gray-200">
    {leaveData.attendanceImpact}
  </p>
</div>


        {/* Stages */}
       <div>
  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
    Approval Progress
  </h2>
  <div className="relative">
    <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
    <ul className="space-y-8">
      {leaveData.stages.map((stage) => (
        <li key={stage.id} className="relative">
          <div className="flex items-start">
            <div
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
                stage.status === "approved"
                  ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-400"
                  : stage.status === "changes_requested"
                  ? "bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-400"
                  : stage.id === leaveData.currentStage
                  ? "bg-blue-100 text-blue-600 animate-pulse dark:bg-blue-800 dark:text-blue-400"
                  : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              {getStageIcon(stage)}
            </div>

            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-sm font-medium transition-colors duration-200 ${
                    stage.status === "approved"
                      ? "text-green-600 dark:text-green-400"
                      : stage.status === "changes_requested"
                      ? "text-orange-600 dark:text-orange-400"
                      : stage.id === leaveData.currentStage
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {stage.name}
                </h3>

                <div className="flex items-center">
                  {getStatusIcon(stage.status)}
                  <span
                    className={`ml-1 text-xs capitalize transition-colors duration-200 ${
                      stage.status === "approved"
                        ? "text-green-600 dark:text-green-400"
                        : stage.status === "changes_requested"
                        ? "text-orange-600 dark:text-orange-400"
                        : stage.status === "pending"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>
              </div>

              {/* Status-specific content */}
              {stage.status === "approved" && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    on {stage.approvedOn}
                  </p>
                </div>
              )}

              {stage.status === "changes_requested" && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-300 mb-2">
                    on {stage.approvedOn}
                  </p>
                  {stage.comment && (
                    <div className="bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-700 rounded-md p-3 mb-2 transition-colors duration-200">
                      <p className="text-sm text-orange-800 dark:text-orange-300">
                        {stage.comment}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setForm(true);
                      setLeaveId(leaveData._id);
                      setChangesrequired(stage.comment);
                    }}
                    className="text-xs cursor-pointer bg-orange-100 dark:bg-orange-800 hover:bg-orange-200 dark:hover:bg-orange-700 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-md transition-colors duration-200"
                  >
                    Update Application
                  </button>
                </div>
              )}

              {stage.status === "pending" && stage.expectedTime && (
                <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 flex items-center">
                  <IoMdTime className="mr-1" />
                  <span>Expected: {stage.expectedTime}</span>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

      </div>
    </motion.div>
  );
};

export default LeaveTrackerCard;