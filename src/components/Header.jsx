import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { RiLeafLine } from "react-icons/ri";
import socket from "../socket";
import {
  FaHeadset,
  FaBell,
  FaQuestionCircle,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MdLogout, MdArrowDropDown } from "react-icons/md";
import { useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function Header({ footerRef, setDarkMode, darkMode }) {
  const { user, logoutUser } = useAuthStore();
  const location = useLocation();
  const profileRef = useRef(null);
  const [profileView, setProfileView] = useState(false);

  const [notificationCount, setNotificationCount] = useState(0);

  // Example socket listener
  useEffect(() => {
    socket.on("leaveStatusUpdated", () => {
      setNotificationCount((prev) => prev + 1);
    });

    return () => socket.off("leaveStatusUpdated");
  }, []);

  const handleSupportClick = () => {
    footerRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Check if current path should hide the support button
  let shouldHideSupport =
    location.pathname.includes("/authority/dashboard") ||
    location.pathname.includes("/dashboard/student")||
    location.pathname.includes("/dashboard/guard")||
    location.pathname.includes("/admin")


  const handleLogout = () => {
    logoutUser();

    // window.location.href = "/";
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileView(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDashboardTitle = () => {
    if (location.pathname.includes("student")) return "Student Dashboard";
    if (user?.role === "faculty") return "Faculty Portal";
    if (user?.role === "hod") return "HOD Dashboard";
    if (user?.role === "warden") return "Warden Dashboard";
    return "University Leave Portal";
  };

  const getDashboardSubtitle = () => {
    if (location.pathname.includes("student"))
      return "Welcome to your leave portal";
    if (["faculty", "hod", "warden"].includes(user?.role)) {
      return "Leave Application Management";
    }
    return "Academic Year 2024-25";
  };

  return (
    <header className=" dark:bg-gray-900 bg-white shadow-sm dark:shadow-gray-800/50 w-full px-4 py-3 fixed sm:py-4 z-50">
      <div className="w-full flex items-center justify-between">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 sm:space-x-3"
        >
          <motion.div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <RiLeafLine className="text-white text-lg sm:text-xl" />
          </motion.div>
          <div className="max-w-[180px] sm:max-w-none">
            <h1 className="text-sm sm:text-xl md:text-2xl font-bold dark:text-gray-100 text-gray-900 truncate">
              {getDashboardTitle()}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
              {getDashboardSubtitle()}
            </p>
          </div>
        </motion.div>

        {/* Navigation Icons */}
        <div className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6">
          {/* Dark Mode Toggle - Always visible */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 sm:p-2 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
             <div className="relative inline-block ">
            {darkMode ? (
            
               <MdLightMode className="text-lg sm:text-xl text-yellow-300" />
           
            ) : (
              <MdDarkMode className="text-lg sm:text-xl" />
            )}
            </div>
          </motion.button>

          {/* Notification Bell - Only when shouldHideSupport */}
          {shouldHideSupport && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-1 sm:p-2 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <div className="relative inline-block">
                <FaBell className="text-lg sm:text-xl dark:text-gray-300" />

                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </div>

             
            </motion.button>
          )}

          {/* Help & Support - Only when NOT shouldHideSupport */}
          {!shouldHideSupport && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSupportClick}
              className="hidden md:flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-all"
            >
              <FaHeadset className="text-blue-600 dark:text-blue-400 text-sm sm:text-base" />
              <span className="dark:text-gray-200 text-sm sm:text-base">
                Help
              </span>
            </motion.button>
          )}

          {/* Profile Section - Only when shouldHideSupport */}
          {shouldHideSupport && (
            <div className="relative" ref={profileRef}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex cursor-pointer items-center space-x-1 sm:space-x-2 bg-white dark:bg-gray-800 px-2 sm:px-3 py-1 sm:py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/20 transition-all duration-200"
                onClick={() => setProfileView(!profileView)}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <FaUserCircle className="text-blue-600 dark:text-blue-400 text-base sm:text-xl" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium hidden sm:inline-block text-sm sm:text-base">
                  {user?.name}
                </span>
                <MdArrowDropDown
                  className={`text-gray-500 dark:text-gray-400 transition-transform ${
                    profileView ? "rotate-180" : ""
                  } text-base sm:text-xl`}
                />
              </motion.div>

              <AnimatePresence>
                {profileView && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email || "No email"}
                      </p>
                    </div>
                    <ul className="py-1">
                      <motion.li
                        whileHover={{
                          backgroundColor: darkMode ? "#1E40AF" : "#EFF6FF",
                        }}
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer flex items-center"
                      >
                        <FaUserCircle className="mr-2 text-blue-500" />
                        My Profile
                      </motion.li>
                      <motion.li
                        whileHover={{
                          backgroundColor: darkMode ? "#1E40AF" : "#EFF6FF",
                        }}
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer flex items-center"
                      >
                        <FaCog className="mr-2 text-blue-500" />
                        Settings
                      </motion.li>
                      <motion.li
                        whileHover={{
                          backgroundColor: darkMode ? "#1E40AF" : "#EFF6FF",
                        }}
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer flex items-center"
                        onClick={handleLogout}
                      >
                        <MdLogout className="mr-2 text-blue-500" />
                        Logout
                      </motion.li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
