import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBell,
  FaRegBell,
  FaClipboardCheck,
  FaCalendarAlt,
  FaEllipsisH,
  FaRegClock,
  FaChevronLeft,
} from "react-icons/fa";

const Notification = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard/student"); // fallback if no history
    }
  };

  // Sample leave notification data
  const notifications = [
    {
      id: 1,
      type: "approval",
      user: "HOD - Computer Science",
      action: "approved your leave application",
      details: "Sick Leave from 15 Aug to 18 Aug",
      time: "2 hours ago",
      read: false,
      status: "approved",
    },
    {
      id: 2,
      type: "rejection",
      user: "Principal",
      action: "rejected your leave application",
      details: "Personal Leave from 20 Aug to 22 Aug",
      reason: "Exceeds available leave balance",
      time: "5 hours ago",
      read: true,
      status: "rejected",
    },
    {
      id: 3,
      type: "pending",
      user: "Class Coordinator",
      action: "forwarded your leave application",
      details: "Emergency Leave on 25 Aug",
      time: "1 day ago",
      read: false,
      status: "pending",
    },
    {
      id: 4,
      type: "reminder",
      user: "System",
      action: "reminder about upcoming leave",
      details: "Your approved leave starts tomorrow",
      time: "2 days ago",
      read: true,
      status: "reminder",
    },
  ];

  const filteredNotifications = notifications.filter((n) =>
    activeTab === "unread" ? !n.read : true
  );

  const getNotificationIcon = (type) => {
    switch (type) {
      case "approval":
        return <FaClipboardCheck className="text-green-500" />;
      case "rejection":
        return <FaClipboardCheck className="text-red-500" />;
      case "pending":
        return <FaRegClock className="text-yellow-500" />;
      case "reminder":
        return <FaCalendarAlt className="text-blue-500" />;
      default:
        return <FaRegBell className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const badgeStyles = {
      approved:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      rejected:
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      reminder:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          badgeStyles[status] || badgeStyles.reminder
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 font-sans relative overflow-hidden transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-10  ">
        <div className="relative py-4 px-6 flex items-center justify-center max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={goBack}
            className="absolute left-4 flex items-center gap-2 px-3 py-2 rounded-full 
                     text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                     dark:hover:bg-gray-700 transition-all duration-200"
          >
            <FaChevronLeft className="text-base hidden md:block sm:text-lg" />
            <span className="hidden sm:inline text-base font-medium">Back</span>
          </button>

          {/* Page Title */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <FaBell className="mr-2 text-blue-500" />
            Leave Notifications
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "all"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "unread"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("unread")}
          >
            Unread
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg flex items-start ${
                  n.read
                    ? "bg-white dark:bg-gray-800"
                    : "bg-blue-100 dark:bg-gray-700"
                }  shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <div className="mr-3 text-lg">{getNotificationIcon(n.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {n.user}
                        </p>
                        {getStatusBadge(n.status)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {n.action}
                      </p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                        <FaCalendarAlt className="inline mr-1" />
                        {n.details}
                      </p>
                      {n.reason && (
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <span className="font-medium">Reason:</span>{" "}
                          {n.reason}
                        </p>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full">
                      <FaEllipsisH />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {n.time}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <FaClipboardCheck className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {activeTab === "unread"
                  ? "No unread notifications"
                  : "No notifications"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {activeTab === "unread"
                  ? "You have no unread leave notifications"
                  : "You have no leave notifications"}
              </p>
            </div>
          )}
        </div>
      </main>

      
    </div>
  );
};

export default Notification;
