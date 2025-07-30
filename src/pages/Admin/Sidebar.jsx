import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const navItems = [
  { path: '/admin/dashboard', icon: <FaHome className="text-xl" />, label: 'Dashboard' },
  { path: '/admin/users', icon: <FaUser className="text-xl" />, label: 'Manage Users' },
  { path: '/admin/settings', icon: <FaCog className="text-xl" />, label: 'Settings' },
];

const Sidebar = ({ isSidebarOpen, onMenuClick }) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 640;

  // Close sidebar on mobile and navigate
  const handleLinkClick = (e, path) => {
    if (isMobile) {
      e.preventDefault();
      onMenuClick(); // Close sidebar
      setTimeout(() => {
        navigate(path);
      });
    }
  };

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? '16rem' : '5rem' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}  // smoother easing
      className={`h-full fixed z-1000 sm:mt-0  
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0
        px-4 py-4 bg-gradient-to-b from-white via-gray-50 to-white text-black font-sans md:flex flex-col overflow-hidden`}
    >
      {isSidebarOpen && (
        <motion.p
          className="text-sm hidden md:block text-gray-400 mb-2 pl-5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1, ease: 'easeInOut' }}
        >
          Menu
        </motion.p>
      )}

      {/* Links */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={(e) => handleLinkClick(e, item.path)}
            className={({ isActive }) =>
              `flex items-center ${
                isSidebarOpen ? 'justify-start pl-3' : 'justify-center px-5'
              } gap-3 px-3 py-2 rounded-md transition-all duration-300 font-medium ${
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
                transition={ isMobile 
                  ? { duration: 0.2, ease: 'easeInOut', delay: 0.05 * index } // smooth transition for mobile
                  : { duration: 0.2, type: 'spring', stiffness: 200, delay: 0.05 * index } // spring for desktop
                }
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
  isSidebarOpen: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default Sidebar;
