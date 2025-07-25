import { motion } from "framer-motion";
import { FaPlusCircle, FaClipboardList, FaHistory } from "react-icons/fa";
import LeaveCountCard from "./LeaveCountCard";
import { useState,useEffect } from "react";
import CreateLeaveApplication from "../../components/CreateLeaveApplication";
import LeaveHistory from "../../components/LeaveHistory";
import useLeaveFormStore from "../../store/useLeaveFormStore";
import { useMyLeaves } from "../../hooks/useMyLeaves";
import ActionCards from "./ActionCards";
import useAuthStore from "../../store/useAuthStore";
import LeaveStatusTracker from "../../components/LeaveStatusTracker";
import socket from "../../socket"; // ✅ import the shared socket
import { toast } from "react-toastify";
function StudentDashboard() {
  const { showForm, openForm } = useLeaveFormStore();
  const { showLeaveFormHistory, openLeaveHistoryForm,openLeaveStatus,showLeavestatus} = useLeaveFormStore();
  const { data: leaves, isLoading, isError,refetch } = useMyLeaves();
  const { showLeaveStatus } = useLeaveFormStore();
  const { user } = useAuthStore();

      const roomId = `${user?.department}-${user?.section}-${user?._id}`;
      console.log('student id',roomId)
      socket.emit('joinRoom', roomId);
      
      useEffect(() => {
    // Join the student's room
    socket.emit('joinRoom', roomId);

    // Listen for leave status updates
    socket.on("leaveStatusUpdated", () => {
      console.log("🔄 Leave status updated, refetching...");
      refetch(); 
    });

    // Cleanup on unmount
    return () => {
      socket.off("leaveStatusUpdated");
    };
  }, [roomId, refetch]);

  useEffect(() => {
  if (
    !showForm &&
    !showLeaveFormHistory &&
    !showLeaveStatus
  ) {
    // Only scroll when dashboard is shown
    console.log("🌀 Scrolling to top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}, [showForm, showLeaveFormHistory, showLeaveStatus]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading leave data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="mt-4 text-red-500 dark:text-red-400">Failed to load leave data. Please try again later.</p>
        </div>
      </div>
    );
  }

  const statusCount = leaves.reduce((count, leave) => {
    count[leave.finalStatus] = (count[leave.finalStatus] || 0) + 1;
    return count;
  }, {});

  const finalCounts = {
    pending: statusCount.pending || 0,
    approved: statusCount.approved || 0,
    rejected: statusCount.rejected || 0
  };

  if (showForm) return <CreateLeaveApplication />;
  if (showLeaveFormHistory) return <LeaveHistory />;
  {showLeaveStatus && <LeaveStatusTracker />}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans relative overflow-hidden pb-14 transition-colors duration-300">
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
              delay: index * 2
            }}
            className={`absolute ${index === 0 ? 'top-20 left-10 w-64 h-64 bg-blue-100' : 
                        index === 1 ? 'top-1/3 right-20 w-72 h-72 bg-purple-100' : 
                        'bottom-20 left-1/3 w-80 h-80 bg-indigo-100'} rounded-full mix-blend-multiply filter blur-3xl opacity-20`}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: FaPlusCircle,
              title: "Apply for Leave",
              description: "Submit a new leave application with required details.",
              gradient: "from-blue-500 to-indigo-600",
              action: openForm,
              buttonText: "Create Leave"
            },
            {
              icon: FaClipboardList,
              title: "Leave Status",
              description: "Track your active leave requests and responses.",
              gradient: "from-indigo-500 to-blue-600",
              action: openLeaveStatus, // Add your status view function
              buttonText: "View Status"
            },
            {
              icon: FaHistory,
              title: "Leave History",
              description: "View your previously applied and approved leaves.",
              gradient: "from-purple-500 to-indigo-500",
              action: openLeaveHistoryForm,
              buttonText: "Check History"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              
              className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 text-center hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute -top-10 -right-10 w-32 h-32 ${
                index === 0 ? 'bg-blue-100 dark:bg-blue-900/20' :
                index === 1 ? 'bg-indigo-100 dark:bg-indigo-900/20' :
                'bg-purple-100 dark:bg-purple-900/20'
              } rounded-full opacity-20 dark:opacity-30`}></div>
              <div className="relative z-10">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${card.gradient} dark:${
                  index === 0 ? 'from-blue-400 to-indigo-500' :
                  index === 1 ? 'from-indigo-400 to-blue-500' :
                  'from-purple-400 to-indigo-400'
                } flex items-center justify-center shadow-md dark:shadow-lg`}>
                  <card.icon className="text-white text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{card.description}</p>
                <motion.button
                   whileHover={{ scale: 1.03 }}
                   whileTap={{ scale: 0.97 }}
                  onClick={card.action}
                  className={`w-full cursor-pointer py-3 rounded-xl text-white bg-gradient-to-r ${card.gradient} hover:${
                    index === 0 ? 'from-blue-600 to-indigo-700' :
                    index === 1 ? 'from-indigo-600 to-blue-700' :
                    'from-purple-600 to-indigo-600'
                  } dark:${
                    index === 0 ? 'from-blue-400 to-indigo-500' :
                    index === 1 ? 'from-indigo-400 to-blue-500' :
                    'from-purple-400 to-indigo-400'
                  } dark:hover:${
                    index === 0 ? 'from-blue-500 to-indigo-600' :
                    index === 1 ? 'from-indigo-500 to-blue-600' :
                    'from-purple-500 to-indigo-500'
                  } font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md dark:shadow-lg`}
                >
                  <span>{card.buttonText}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Recent Activity</h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              {
                status: "approved",
                title: "Leave Request Approved",
                description: "Your leave for 15-17 Oct has been approved by faculty",
                time: "2 hours ago",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                )
              },
              {
                status: "pending",
                title: "Leave Under Review",
                description: "Your leave for 25-27 Oct is pending with warden",
                time: "1 day ago",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                )
              },
              {
                status: "new",
                title: "New Leave Submitted",
                description: "You submitted a leave request for 5-7 Nov",
                time: "2 days ago",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                )
              }
            ].map((activity, index) => (
              <div 
                key={index}
                className="flex items-start p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200"
              >
                <div className={`w-10 h-10 rounded-full ${
                  activity.status === "approved" ? "bg-green-100 dark:bg-green-900/30" :
                  activity.status === "pending" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                  "bg-blue-100 dark:bg-blue-900/30"
                } flex items-center justify-center mr-4`}>
                  <svg 
                    className={`w-5 h-5 ${
                      activity.status === "approved" ? "text-green-600 dark:text-green-400" :
                      activity.status === "pending" ? "text-yellow-600 dark:text-yellow-400" :
                      "text-blue-600 dark:text-blue-400"
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {activity.icon}
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">{activity.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{activity.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div> */}
      </main>
    </div>
  );
}

export default StudentDashboard;