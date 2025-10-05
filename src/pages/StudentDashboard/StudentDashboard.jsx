import { motion } from "framer-motion";
import { FaPlusCircle, FaClipboardList, FaHistory } from "react-icons/fa";
import LeaveCountCard from "./LeaveCountCard";
import { useState, useEffect, useMemo, useCallback } from "react";

import LeaveHistory from "../../components/LeaveHistory";
import useLeaveFormStore from "../../store/useLeaveFormStore";
import { useMyLeaves } from "../../hooks/useMyLeaves";

import useAuthStore from "../../store/useAuthStore";
import LeaveStatusTracker from "../../components/LeaveStatus/LeaveStatus";
import socket from "../../socket"; // ✅ import the shared socket

import LeaveActions from "./LeaveActions";
import ApplicationMethodSelector from "../../components/StudentLeaveForm/ApplicationMethodSelector";

// Custom hook for persistent state
function usePersistentState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function StudentDashboard() {
  const { showForm, openForm } = useLeaveFormStore();
  const {
    showLeaveFormHistory,
    openLeaveHistoryForm,
    showLeaveStatus,
    openLeaveStatus,
  } = useLeaveFormStore();
  
  // Use persistent state to remember the last active tab
  const [lastActiveView, setLastActiveView] = usePersistentState(
    "studentDashboardView", 
    "dashboard"
  );
  
  const { data: leaves, isLoading, isError, refetch } = useMyLeaves();
  const { user } = useAuthStore();
  
  // Memoize the roomId to prevent recalculations
  const roomId = useMemo(() => 
    `${user?.branch}-${user?.section}-${user?.id || user?._id}`, 
    [user?.branch, user?.section, user?.id, user?._id]
  );

  // Memoize status count calculation
  const finalCounts = useMemo(() => {
    if (!leaves) return { pending: 0, approved: 0, rejected: 0 };
    
    const statusCount = leaves.reduce((count, leave) => {
      count[leave.finalStatus] = (count[leave.finalStatus] || 0) + 1;
      return count;
    }, {});
    
    return {
      pending: statusCount.pending || 0,
      approved: statusCount.approved || 0,
      rejected: statusCount.rejected || 0,
    };
  }, [leaves]);

  // Optimized socket connection with cleanup
  useEffect(() => {
    if (!roomId) return;
    
    console.log("student id", roomId);
    socket.emit("joinRoom", roomId);

    const handleStatusUpdate = () => {
      console.log("🔄 Leave status updated, refetching...");
      refetch();
    };

    socket.on("leaveStatusUpdated", handleStatusUpdate);

    return () => {
      socket.off("leaveStatusUpdated", handleStatusUpdate);
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId, refetch]);

  // Scroll to top only when returning to dashboard
  useEffect(() => {
    if (!showForm && !showLeaveFormHistory && !showLeaveStatus) {
      if (lastActiveView !== "dashboard") {
        console.log("🌀 Scrolling to top");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLastActiveView("dashboard");
      }
    } else if (showForm && lastActiveView !== "form") {
      setLastActiveView("form");
    } else if (showLeaveFormHistory && lastActiveView !== "history") {
      setLastActiveView("history");
    } else if (showLeaveStatus && lastActiveView !== "status") {
      setLastActiveView("status");
    }
  }, [showForm, showLeaveFormHistory, showLeaveStatus, lastActiveView, setLastActiveView]);

  // Memoized loading component
  const loadingComponent = useMemo(() => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Loading leave data...
        </p>
      </div>
    </div>
  ), []);

  // Memoized error component
  const errorComponent = useMemo(() => (
    <div className="min-h-screen flex items-center  justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-red-500 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-red-500 dark:text-red-400">
          Failed to load leave data. Please try again later.
        </p>
      </div>
    </div>
  ), []);

  if (isLoading) return loadingComponent;
  if (isError) return errorComponent;

  if (showForm) return <ApplicationMethodSelector />;
  if (showLeaveFormHistory) return <LeaveHistory />;
  if (showLeaveStatus) return <LeaveStatusTracker />;

  return (
    <div className="min-h-screen bg-gradient-to-br 
from-blue-200 via-sky-200 to-indigo-300 
dark:from-gray-950 dark:via-gray-900 dark:to-indigo-900 
font-sans relative overflow-hidden transition-all duration-500">

      {/* Floating Blobs - Light Mode Only */}
      <div className="fixed dark:hidden inset-0 pointer-events-none overflow-hidden z-0">
        {[0, 20, 40].map((delay, index) => (
          <motion.div
            key={index}
            animate={{
              x: [0, index % 2 === 0 ? 20 : -30, 0],
              y: [0, index % 2 === 0 ? -30 : 20, 0],
            }}
            transition={{
              duration: 15 + index * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 2,
            }}
            className={`absolute ${
              index === 0
                ? "top-20 left-10 w-64 h-64 bg-blue-100"
                : index === 1
                ? "top-1/3 right-20 w-72 h-72 bg-purple-100"
                : "bottom-20 left-1/3 w-80 h-80 bg-indigo-100"
            } rounded-full mix-blend-multiply filter blur-3xl opacity-20`}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="z-10 relative mx-auto px-4 py-8 md:py-12 ">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <LeaveCountCard finalCounts={finalCounts} />
        </motion.div>

        {/* Action Cards */}
        <LeaveActions
          openForm={openForm}
          openLeaveStatus={openLeaveStatus}
          openLeaveHistoryForm={openLeaveHistoryForm}
        />
        {/* Recent Activity Section */}
       
      </main>
    </div>
  );
}

export default StudentDashboard;