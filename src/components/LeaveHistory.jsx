import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";
import socket from "../socket";
import {
  FaChevronLeft,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaRegFileAlt,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import useLeaveFormStore from "../store/useLeaveFormStore";
import { useMyLeaves } from "../hooks/useMyLeaves";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import CompletedLeaveDetail from "./LeaveHistory/CompletedLeaveDetail";
import TopFilter from "./LeaveHistory/TopFilter";
import LeaveExpandedDetails from "./LeaveHistory/LeaveExpandedDetails";
import LeaveListItem from "./LeaveHistory/LeaveListItem";

function LeaveHistory() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [expandedLeave, setExpandedLeave] = useState(null);
  const [leaveHistoryStatus, setLeaveHistoryStatus] = useState("approved");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const { closeLeaveHistoryForm } = useLeaveFormStore();
  const {
    data: leaves = [],
    isLoading,
    isError,
    refetch,
  } = useMyLeaves(leaveHistoryStatus);

  useEffect(() => {
    // Listen for leave status updates
    socket.on("leaveStatusUpdated", () => {
      console.log("🔄 Leave status updated, refetching...");
      refetch();
    });
    // Cleanup on unmount
    return () => {
      socket.off("leaveStatusUpdated");
    };
  }, [refetch]);

  const renderStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return (
          <FaCheck className="text-green-500 dark:text-green-400 mr-1.5" />
        );
      case "rejected":
        return <FaTimes className="text-red-500 dark:text-red-400 mr-1.5" />;
      default:
        return (
          <IoMdTime className="text-yellow-500 dark:text-yellow-400 mr-1.5" />
        );
    }
  };

  const renderStatusText = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="font-medium text-green-600 dark:text-green-400">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="font-medium text-red-600 dark:text-red-400">
            Rejected
          </span>
        );
      default:
        return (
          <span className="font-medium text-yellow-600 dark:text-yellow-400">
            Pending
          </span>
        );
    }
  };

  if (selectedLeave) {
    return (
      <CompletedLeaveDetail
        selectedLeave={selectedLeave}
        setSelectedLeave={setSelectedLeave}
        renderStatusIcon={renderStatusIcon}
        renderStatusText={renderStatusText}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans relative overflow-hidden pb-14 transition-colors duration-300">
      {/* Floating Blobs - Light Mode Only */}
      <div className="fixed dark:hidden inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <header className="relative py-4 px-6 flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={closeLeaveHistoryForm}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
        </motion.button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:to-indigo-800 rounded-lg flex items-center justify-center shadow">
            <RiLeafLine className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Leave History
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Track your past leave applications
            </p>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <TopFilter
          setLeaveHistoryStatus={setLeaveHistoryStatus}
          leaves={leaves}
          leaveHistoryStatus={leaveHistoryStatus}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden transition-colors duration-300"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
              <FaRegFileAlt className="mr-2 text-blue-500 dark:text-blue-400" />
              Leave Applications
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {leaves.map((leave, index) => (
              <div
                key={leave._id}
                className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200"
              >
                <LeaveListItem
                  leave={leave}
                  index={index}
                  expandedLeave={expandedLeave}
                  setExpandedLeave={setExpandedLeave}
                />
                {expandedLeave === index && (
                  <LeaveExpandedDetails
                    leave={leave}
                    setSelectedLeave={setSelectedLeave}
                    renderStatusIcon={renderStatusIcon}
                    setExpandedLeave={setExpandedLeave}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default LeaveHistory;
