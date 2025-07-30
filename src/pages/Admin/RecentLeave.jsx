import React, { useState } from 'react';
import { 
  FaEye, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle, 
  FaArrowRight, 
  FaCalendarAlt,
  FaUser,
  FaFilter,
  FaSearch,
  FaDownload,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const RecentLeaveApplications = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Sample data with full approval flow
  const leaveApplications = [
    {
      id: 1,
      applicant: 'Jane Smith',
      avatar: 'JS',
      type: 'Medical',
      duration: '2024-01-15 to 2024-01-18',
      days: 4,
      status: 'Approved',
      priority: 'High',
      submittedDate: '2024-01-10',
      approvalFlow: [
        { role: 'Faculty In-Charge', name: 'Dr. Wilson', status: 'Approved', timestamp: '2024-01-11 10:30 AM' },
        { role: 'HOD', name: 'Prof. Sharma', status: 'Approved', timestamp: '2024-01-12 02:15 PM' },
        { role: 'Warden', name: 'Kapoor', status: 'Approved', timestamp: '2024-01-13 09:45 AM' }
      ]
    },
    {
      id: 2,
      applicant: 'Mike Brown',
      avatar: 'MB',
      type: 'Casual',
      duration: '2024-01-20 to 2024-01-21',
      days: 2,
      status: 'Pending',
      priority: 'Medium',
      submittedDate: '2024-01-18',
      approvalFlow: [
        { role: 'Faculty In-Charge', name: 'Prof. Johnson', status: 'Approved', timestamp: '2024-01-19 11:20 AM' },
        { role: 'HOD', name: 'Prof. Sharma', status: 'Pending', timestamp: '' },
        { role: 'Warden', name: 'Ram', status: 'Pending', timestamp: '' }
      ]
    },
    {
      id: 3,
      applicant: 'Sarah Wilson',
      avatar: 'SW',
      type: 'Emergency',
      duration: '2024-01-10 to 2024-01-12',
      days: 3,
      status: 'Rejected',
      priority: 'High',
      submittedDate: '2024-01-08',
      approvalFlow: [
        { role: 'Faculty In-Charge', name: 'Dr. Smith', status: 'Approved', timestamp: '2024-01-09 03:00 PM' },
        { role: 'HOD', name: 'Prof. Gupta', status: 'Rejected', timestamp: '2024-01-10 10:30 AM' },
        { role: 'Warden', name: '', status: '', timestamp: '' }
      ]
    },
    {
      id: 4,
      applicant: 'John Doe',
      avatar: 'JD',
      type: 'Medical',
      duration: '2024-01-22 to 2024-01-25',
      days: 4,
      status: 'Pending',
      priority: 'Low',
      submittedDate: '2024-01-20',
      approvalFlow: [
        { role: 'Faculty In-Charge', name: 'Dr. Wilson', status: 'Pending', timestamp: '' },
        { role: 'HOD', name: '', status: 'Pending', timestamp: '' },
        { role: 'Warden', name: '', status: 'Pending', timestamp: '' }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <FaCheckCircle className="text-emerald-500" />;
      case 'Pending':
        return <FaClock className="text-amber-500 animate-pulse" />;
      case 'Rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-200 rounded-full"></div>;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case 'Approved':
        return `${baseClasses} bg-emerald-100 text-emerald-800 border border-emerald-200`;
      case 'Pending':
        return `${baseClasses} bg-amber-100 text-amber-800 border border-amber-200`;
      case 'Rejected':
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Medical':
        return '🏥';
      case 'Casual':
        return '🌴';
      case 'Emergency':
        return '🚨';
      default:
        return '📄';
    }
  };

  const filteredApplications = leaveApplications.filter(app => {
    const matchesFilter = filter === 'All' || app.status === filter;
    const matchesSearch = app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // Reset to page 1 when search changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-3 md:p-8"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8">
        <div className="mb-4 lg:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaCalendarAlt className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Leave Applications</h2>
              <p className="text-gray-600">Manage and track leave requests</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <FaDownload className="text-sm" />
            Export
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
          >
            <FaFilter className="text-sm" />
            Filter
          </motion.button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange(status)}
              className={`md:px-4 px-2 py-1 md:py-3 rounded-md md:rounded-xl font-medium transition-all duration-200 ${
                filter === status
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Applications Grid/List */}
      <div className="space-y-4 ">
        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentApplications.length > 0 ? (
              currentApplications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  className="bg-white mb-4 rounded-xl border border-gray-200 p-6 hover:border-blue-300 transition-all duration-50 cursor-pointer"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Applicant Info */}
                    <div className="flex items-center gap-4 lg:min-w-[200px]">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {application.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{application.applicant}</h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <FaUser className="text-xs" />
                          Student ID: {application.id}
                        </p>
                      </div>
                    </div>

                    {/* Leave Details */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                      <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Leave Type</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getTypeIcon(application.type)}</span>
                          <span className="font-semibold text-gray-800">{application.type}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Duration</p>
                        <p className="font-semibold text-gray-800">{application.duration}</p>
                        <p className="text-gray-500 text-sm">{application.days} days</p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Status</p>
                        <div className={getStatusBadge(application.status)}>
                          {application.status}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="lg:ml-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                    >
                      <FaEye />
                      View Details
                    </motion.button>
                  </div>

                  {/* Approval Flow */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-gray-500 text-sm font-medium mb-3">Approval Flow</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {application.approvalFlow.map((approval, idx) => (
                        <React.Fragment key={idx}>
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center bg-gray-50 rounded-lg p-3 min-w-[120px]"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {getStatusIcon(approval.status)}
                              <span className="text-xs font-medium text-gray-600">{approval.role}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">
                              {approval.name || 'Pending'}
                            </span>
                            {approval.timestamp && (
                              <span className="text-xs text-gray-500 mt-1">{approval.timestamp}</span>
                            )}
                          </motion.div>
                          {idx < application.approvalFlow.length - 1 && (
                            <FaArrowRight className="text-gray-400 mx-1" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCalendarAlt className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No applications found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-100"
        >
          <div className="text-sm text-gray-600 mb-4 sm:mb-0">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredApplications.length)} of {filteredApplications.length} applications
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <FaChevronLeft className="text-sm" />
              Previous
            </motion.button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              Next
              <FaChevronRight className="text-sm" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecentLeaveApplications;