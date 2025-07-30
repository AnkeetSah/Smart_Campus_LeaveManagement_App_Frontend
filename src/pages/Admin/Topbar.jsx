import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { FaRegMoon } from "react-icons/fa";
import { motion } from 'framer-motion';
import { RiLeafLine } from "react-icons/ri";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
const Topbar = ({ onMenuClick,isSidebarOpen }) => {
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <header className="w-full fixed h-16 z-1000   bg-gradient-to-b from-white via-gray-50 to-white  border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shadow-sm py-9">
      
      {/* Left side: Logo & Menu */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu */}
        <button
          className="group relative hidden md:block text-gray-600 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-indigo-50"
          onClick={onMenuClick}   
        >
          {isSidebarOpen?<TbLayoutSidebarLeftCollapse className="text-2xl" />:<TbLayoutSidebarRightCollapse className="text-2xl" />}
          
          <div className="absolute inset-0 bg-indigo-500/20 rounded-lg scale-0 group-hover:scale-100 transition duration-300 -z-10"></div>
        </button>

        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg"
          >
            <RiLeafLine className="text-white text-lg sm:text-xl" />
          </motion.div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
  <span className="hidden md:inline">Smart Campus </span>
  Admin Dashboard
</h1>

        </div>
      </div>

      {/* Right side: Controls */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Dark Mode Button */}
        <button className="group relative text-gray-500 hover:text-amber-500 transition-all duration-300 p-2 rounded-lg hover:bg-amber-50">
          <FaRegMoon className="text-xl group-hover:rotate-12 group-hover:text-amber-600 transition" />
          <div className="absolute inset-0 bg-amber-400/20 rounded-lg scale-0 group-hover:scale-100 transition duration-300 -z-10"></div>
        </button>

        {/* Notification Bell */}
        {/* <div className="relative group">
          <button
            onClick={() => setNotificationCount(Math.max(0, notificationCount - 1))}
            className="relative text-gray-500 hover:text-red-500 p-2 rounded-lg transition hover:bg-red-50"
          >
            <FaBell className="text-xl group-hover:animate-pulse" />
            <div className="absolute inset-0 bg-red-400/20 rounded-lg scale-0 group-hover:scale-100 transition duration-300 -z-10"></div>
          </button>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium shadow">
              {notificationCount}
            </span>
          )}
        </div> */}

        {/* User Info */}
        <div className="md:flex items-center gap-3 pl-4 border-l hidden border-gray-200 group cursor-pointer hover:bg-indigo-50 rounded-lg px-3 py-2 transition">
          <div className="relative">
            <FaUserCircle className="text-gray-500 group-hover:text-indigo-600 text-2xl transition" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700 transition">
              Ankeet Kumar Sah
            </span>
            <span className="text-xs text-gray-500 group-hover:text-indigo-500 transition">
              Administrator
            </span>
          </div>
        </div>
        <button
          className="group relative block md:hidden text-gray-600 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-indigo-50"
          onClick={onMenuClick}   
        >
          {isSidebarOpen?<TbLayoutSidebarLeftCollapse className="text-2xl" />:<TbLayoutSidebarRightCollapse className="text-2xl" />}
          
          <div className="absolute inset-0 bg-indigo-500/20 rounded-lg scale-0 group-hover:scale-100 transition duration-300 -z-10"></div>
        </button>
      </div>
      
    </header>
  );
};

export default Topbar;
