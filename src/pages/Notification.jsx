import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";
import { useNotification } from "../hooks/useNotification";
import {
  FaBell,
  FaRegBell,
  FaClipboardCheck,
  FaTimes,
  FaCalendarAlt,
  FaEllipsisH,
  FaRegClock,
  FaChevronLeft,
} from "react-icons/fa";
import api from "../services/api";

// Helper to format timestamps into "x hours ago"
function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // seconds

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

const Notification = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const { notificationsQuery, updateNotificationMutation } = useNotification();
  const { data: notifications, status } = notificationsQuery;
  const { mutate } = updateNotificationMutation;
  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard/student");
    }
  };

  const handleNotificationClick = async (route, id) => {
    // First navigate
    navigate(route);

    mutate(id);
  };

  // Before filtering, ensure notifications is an array
  const filteredNotifications = (notifications || []).filter((n) =>
    activeTab === "unread" ? !n.isRead : true
  );

  // Map backend `event` → icon
  const getNotificationIcon = (event) => {
    switch (event) {
      case "approved":
        return <FaClipboardCheck className="text-green-500" />;
      case "rejected":
        return <FaTimes className="text-red-500" />;
      case "pending":
      case "forwarded":
        return <FaRegClock className="text-yellow-500" />;
      case "reminder":
        return <FaCalendarAlt className="text-blue-500" />;
      default:
        return <FaRegBell className="text-gray-500" />;
    }
  };

  // Map backend `event` → badge style
  const getStatusBadge = (event) => {
    const badgeStyles = {
      approved:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      forwarded:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      reminder: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          badgeStyles[event] || "bg-gray-200 text-gray-700"
        }`}
      >
        {event.charAt(0).toUpperCase() + event.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 font-sans relative overflow-hidden transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-10">
        <div className="relative py-6 px-6 flex items-center justify-center max-w-5xl mx-auto">
          <div className="absolute hidden  -left-30 gap-4 md:flex items-center">
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-2 py-2 rounded-full 
             hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <FaChevronLeft className="text-base hidden md:block sm:text-lg text-gray-700 dark:text-gray-300" />
            </button>

            <div className="flex items-center gap-2">
              {/* Icon Box */}
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-lg flex items-center justify-center shadow">
                <RiLeafLine className="text-white text-xl" />
              </div>

              {/* Text */}
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Back
              </span>
            </div>
          </div>

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <FaBell className="mr-2 text-blue-500" />
            Leave Notifications
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 md:py-6">
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
        {status == "pending" ? (
          <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg flex items-start bg-white dark:bg-gray-800 animate-pulse space-x-4 shadow-sm"
              >
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {" "}
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((n) => (
                  <motion.div
                    key={n._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleNotificationClick(n.redirectTo, n._id)}
                    className={`p-4 cursor-pointer rounded-lg flex items-start ${
                      n.isRead
                        ? "bg-white dark:bg-gray-800"
                        : "bg-blue-100 dark:bg-gray-700"
                    }  shadow-sm hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="mr-3 text-lg">
                      {getNotificationIcon(n.event)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {n.kind || "System"}
                            </p>
                            {getStatusBadge(n.event)}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {n.message || "No message"}
                          </p>
                          {/* ✅ Added notifiedBy */}
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                            Notified by:{" "}
                            <span className="font-semibold">
                              {n.notifiedBy}
                            </span>
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full">
                          <FaEllipsisH />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {timeAgo(n.createdAt)}
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
          </>
        )}
      </main>
    </div>
  );
};

export default Notification;
