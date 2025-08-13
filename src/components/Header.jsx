import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { RiLeafLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import socket from "../socket";
import { FaHeadset, FaBell, FaUserCircle, FaCog } from "react-icons/fa";
import {
  MdDarkMode,
  MdLightMode,
  MdLogout,
  MdArrowDropDown,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

// Constants
const ROLE_CONFIG = {
  student: {
    title: "Student Dashboard",
    subtitle: "Welcome to your leave portal",
    profileRoute: "/dashboard/student/profile",
  },
  faculty: {
    title: "Faculty Portal",
    subtitle: "Leave Application Management",
    profileRoute: "/authority/dashboard/profile",
  },
  hod: {
    title: "HOD Dashboard",
    subtitle: "Leave Application Management",
    profileRoute:"/authority/dashboard/profile"
  },
  warden: {
    title: "Warden Dashboard",
    subtitle: "Leave Application Management",
     profileRoute:"/authority/dashboard/profile"
  },
  guard: {
     title: "Guard Dashboard",
    subtitle: "Leave Application Management",
     profileRoute:"/authority/dashboard/profile"
  },
  default: {
    title: "University Leave Portal",
    subtitle: "Academic Year 2024-25",
  },
};

const DASHBOARD_ROUTES = [
  "/authority/dashboard",
  "/dashboard/student",
  "/dashboard/guard",
  "/admin",
];

// Animation variants for better performance
const headerVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

const dropdownVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

const buttonHover = { scale: 1.1 };
const buttonTap = { scale: 0.95 };

function Header({ footerRef, setDarkMode, darkMode }) {
  const { user, logoutUser } = useAuthStore();
  const location = useLocation();
  const profileRef = useRef(null);
  const [loggingOut, setLoggingOut] = useState(false);


  const [profileView, setProfileView] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Memoized values for better performance
  const shouldHideSupport = useMemo(
    () => DASHBOARD_ROUTES.some((route) => location.pathname.includes(route)),
    [location.pathname]
  );

  const { title, subtitle,profileRoute } = useMemo(() => {
    const userRole = user?.role;
    if (location.pathname.includes("student")) {
      return ROLE_CONFIG.student;
    }
    return ROLE_CONFIG[userRole] || ROLE_CONFIG.default;
  }, [location.pathname, user?.role]);

  // Optimized event handlers with useCallback
  const handleSupportClick = useCallback(() => {
    footerRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [footerRef]);

 const handleLogout = useCallback(() => {
    setLoggingOut(true); // trigger animation
    logoutUser();     // perform logout
    setProfileView(false); // hide dropdown
    setLoggingOut(false); // reset after action (optional)
}, [logoutUser]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);

  const toggleProfileView = useCallback(() => {
    setProfileView((prev) => !prev);
  }, []);

  const closeProfileView = useCallback(() => {
    setProfileView(false);
  }, []);

  // Socket effect with cleanup
  useEffect(() => {
    const handleLeaveStatusUpdate = () => {
      setNotificationCount((prev) => prev + 1);
    };

    socket.on("leaveStatusUpdated", handleLeaveStatusUpdate);
    return () => socket.off("leaveStatusUpdated", handleLeaveStatusUpdate);
  }, []);

  // Click outside handler with improved cleanup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileView(false);
      }
    };

    if (profileView) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileView]);

  // Memoized components for better performance
  const DarkModeToggle = useMemo(
    () => (
      <motion.button
        whileHover={buttonHover}
        whileTap={buttonTap}
        className="p-1 sm:p-2 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <MdLightMode className="text-lg sm:text-xl text-yellow-300" />
        ) : (
          <MdDarkMode className="text-lg sm:text-xl" />
        )}
      </motion.button>
    ),
    [darkMode, toggleDarkMode]
  );

  const NotificationBell = useMemo(
    () =>
      shouldHideSupport && (
        <motion.button
          whileHover={buttonHover}
          whileTap={buttonTap}
          className="relative p-1 sm:p-2 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label={`Notifications${
            notificationCount > 0 ? ` (${notificationCount})` : ""
          }`}
        >
          <FaBell className="text-lg sm:text-xl dark:text-gray-300" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </motion.button>
      ),
    [shouldHideSupport, notificationCount]
  );

  const HelpButton = useMemo(
    () =>
      !shouldHideSupport && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={buttonTap}
          onClick={handleSupportClick}
          className="hidden md:flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-all"
          aria-label="Get help and support"
        >
          <FaHeadset className="text-blue-600 dark:text-blue-400 text-sm sm:text-base" />
          <span className="dark:text-gray-200 text-sm sm:text-base">Help</span>
        </motion.button>
      ),
    [shouldHideSupport, handleSupportClick]
  );

  const ProfileDropdown = useMemo(
    () =>
      shouldHideSupport && (
        <div className="relative" ref={profileRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-1 sm:space-x-2 bg-white dark:bg-gray-800 px-2 sm:px-3 py-1 sm:py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/20 transition-all duration-200"
            onClick={toggleProfileView}
            aria-expanded={profileView}
            aria-haspopup="true"
            aria-label="User menu"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <FaUserCircle className="text-blue-600 dark:text-blue-400 text-base sm:text-xl" />
            </div>
            <span className="text-gray-700 dark:text-gray-200 font-medium hidden sm:inline-block text-sm sm:text-base truncate max-w-24">
              {user?.name}
            </span>
            <MdArrowDropDown
              className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 text-base sm:text-xl ${
                profileView ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          <AnimatePresence>
            {profileView && (
              <motion.div
                {...dropdownVariants}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                role="menu"
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || "No email"}
                  </p>
                </div>

                <nav className="py-1" role="none">
                  <Link
                    to={profileRoute}
                    className="block"
                    onClick={closeProfileView}
                    role="menuitem"
                  >
                    <motion.div
                      whileHover={{
                        backgroundColor: darkMode ? "#1E40AF" : "#EFF6FF",
                      }}
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center transition-colors"
                    >
                      <FaUserCircle className="mr-2 text-blue-500" />
                      My Profile
                    </motion.div>
                  </Link>

                  <motion.button
                    whileHover={{
                      backgroundColor: darkMode ? "#1E40AF" : "#EFF6FF",
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center transition-colors text-left"
                    role="menuitem"
                  >
                    <FaCog className="mr-2 text-blue-500" />
                    Settings
                  </motion.button>

                  <motion.button
                    whileHover={{
                      backgroundColor: darkMode ? "#1E40AF" : "#EFF6FF",
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center transition-colors text-left"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <MdLogout className="mr-2 text-blue-500" />
                    Logout
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    [
      shouldHideSupport,
      profileView,
      user,
      darkMode,
      toggleProfileView,
      closeProfileView,
      handleLogout,
    ]
  );

  return (
    <header className="dark:bg-gray-900 bg-white shadow-sm dark:shadow-gray-800/50 w-full px-4 py-3 fixed sm:py-4 z-50">
      <div className="w-full flex items-center justify-between">
        {/* Logo and Title */}
        <motion.div
          {...headerVariants}
          className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1"
        >
          <motion.div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
            <RiLeafLine className="text-white text-lg sm:text-xl" />
          </motion.div>

          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-xl md:text-2xl font-bold dark:text-gray-100 text-gray-900 truncate">
              {title}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
              {subtitle}
            </p>
          </div>
        </motion.div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 flex-shrink-0">
          {DarkModeToggle}
          {NotificationBell}
          {HelpButton}
          {ProfileDropdown}
        </div>
      </div>
     <AnimatePresence>
  {loggingOut && (
    <motion.div
      key="logout-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 dark:bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/100 dark:bg-gray-900/60 backdrop-blur-md px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 border border-white/30 dark:border-gray-700"
      >
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          Logging out...
        </span>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </header>
  );
}

export default Header;
