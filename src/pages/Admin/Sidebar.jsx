import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUser, 
  FaCog, 
  FaTimes 
} from 'react-icons/fa';
import { PiChalkboardTeacherBold } from 'react-icons/pi';

const navItems = [
  { 
    path: '/admin/dashboard', 
    icon: <FaHome className="text-xl" />, 
    label: 'Dashboard' 
  },
  { 
    path: '/admin/users', 
    icon: <FaUser className="text-xl" />, 
    label: 'Manage Users' 
  },
  { 
    path: '/admin/settings', 
    icon: <FaCog className="text-xl" />, 
    label: 'Settings' 
  },
];

const Sidebar = ({ isSidebarOpen}) => {
  return (
    <motion.aside
  animate={{ width: isSidebarOpen ? '16rem' : '5rem' }}
  transition={{ duration: 0.3, type: 'tween' }}
  className={`border-r-2 mt-16 sm:mt-0 sm:border-r-0 border-gray-400 h-dvh px-4 py-4 bg-gradient-to-b from-white via-gray-50 to-white text-black font-sans flex flex-col overflow-hidden`}
>

      {/* Mobile Close Button */}
  

      {/* Logo / Heading */}
      <div className={`flex items-center ${isSidebarOpen ? 'pl-3' : 'justify-center'} gap-2 text-2xl font-semibold mb-6`}>
        <PiChalkboardTeacherBold className="text-blue-600 text-[32px]" />
        {isSidebarOpen && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
            className="ml-1 origin-left"
          >
            Admin Panel
          </motion.span>
        )}
      </div>

      {isSidebarOpen && (
        <motion.p
          className="text-sm text-gray-400 mb-2 pl-5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          Menu
        </motion.p>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${
                isSidebarOpen ? 'justify-start pl-3' : 'justify-center px-5'
              } gap-3  px-3 py-2 rounded-md transition-all duration-300 font-medium ${
                isActive 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center text-xl">
              {item.icon}
            </div>
            {isSidebarOpen && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.2, 
                  type: 'spring',
                  stiffness: 200,
                  delay: 0.05 * index
                }}
                className="origin-left"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired
};

export default Sidebar;