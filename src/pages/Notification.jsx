import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { 
  FaBell, 
  FaRegBell, 
  FaClipboardCheck, 
  FaCalendarAlt, 
  FaEllipsisH,
  FaRegClock
} from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";

const Notification = () => {
  const [activeTab, setActiveTab] = useState('all');
const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
    setPrevPath(location.pathname);
  }, [location.pathname]);
   const [prevPath, setPrevPath] = useState(null);
  const handleBack = () => {
    if (prevPath && prevPath !== location.pathname) {
      navigate(prevPath);
    } else {
      navigate("/dashboard/student"); // fallback
    }
  };

  // Sample leave notification data
  const notifications = [
    {
      id: 1,
      type: 'approval',
      user: 'HOD - Computer Science',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      action: 'approved your leave application',
      details: 'Sick Leave from 15 Aug to 18 Aug',
      time: '2 hours ago',
      read: false,
      status: 'approved'
    },
    {
      id: 2,
      type: 'rejection',
      user: 'Principal',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      action: 'rejected your leave application',
      details: 'Personal Leave from 20 Aug to 22 Aug',
      reason: 'Exceeds available leave balance',
      time: '5 hours ago',
      read: true,
      status: 'rejected'
    },
    {
      id: 3,
      type: 'pending',
      user: 'Class Coordinator',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      action: 'forwarded your leave application',
      details: 'Emergency Leave on 25 Aug',
      time: '1 day ago',
      read: false,
      status: 'pending'
    },
    {
      id: 4,
      type: 'reminder',
      user: 'System',
      avatar: 'https://randomuser.me/api/portraits/tech/4.jpg',
      action: 'reminder about upcoming leave',
      details: 'Your approved leave starts tomorrow',
      time: '2 days ago',
      read: true,
      status: 'reminder'
    },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') {
      return !notification.read;
    }
    return true;
  });

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'approval': return <FaClipboardCheck className="text-green-500" />;
      case 'rejection': return <FaClipboardCheck className="text-red-500" />;
      case 'pending': return <FaRegClock className="text-yellow-500" />;
      case 'reminder': return <FaCalendarAlt className="text-blue-500" />;
      default: return <FaRegBell className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': 
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Rejected</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Notice</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 font-sans relative overflow-hidden transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-10 mt-3  ">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <button
           onClick={handleBack}
          >
frfrfgr
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaBell className="mr-2" />
            Leave Notifications
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'all' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'unread' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg flex items-start ${notification.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-700'} border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <div className="mr-3 text-lg">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {notification.user}
                        </p>
                        {getStatusBadge(notification.status)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.action}
                      </p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                        <FaCalendarAlt className="inline mr-1" />
                        {notification.details}
                      </p>
                      {notification.reason && (
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <span className="font-medium">Reason:</span> {notification.reason}
                        </p>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full">
                      <FaEllipsisH />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {notification.time}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <FaClipboardCheck className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {activeTab === 'unread' ? 'No unread notifications' : 'No notifications'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {activeTab === 'unread' ? 'You have no unread leave notifications' : 'You have no leave notifications'}
              </p>
            </div>
          )}
        </div>
      </main>

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
    </div>
  );
};

export default Notification;