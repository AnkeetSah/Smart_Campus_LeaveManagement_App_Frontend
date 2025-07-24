import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaUserTie,
  FaUserShield,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const LeaveExpandedDetails = ({
  leave,
  setSelectedLeave,
  renderStatusIcon,
  setExpandedLeave
}) => {
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        opacity: { duration: 0.3, ease: "easeInOut" },
        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.2, ease: "easeInOut" },
        height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mt-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-600 overflow-hidden"
      >
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
        >
          {/* Left Column */}
          <div className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xs border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                LEAVE DETAILS
              </h3>
              <div className="flex items-start space-x-3">
                <motion.div
                  className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {new Date(leave.fromDate).toLocaleDateString()} -{" "}
                    {new Date(leave.toDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {Math.ceil(
                      (new Date(leave.toDate) - new Date(leave.fromDate)) /
                        (1000 * 60 * 60 * 24)
                    ) + 1}{" "}
                    days
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xs border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">REASON</h3>
              <p className="text-gray-800 dark:text-gray-200 font-medium">"{leave.reason}"</p>
            </motion.div>

            {leave.documents.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xs border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  ATTACHMENTS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {leave.documents.map((doc, i) => (
                    <motion.span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800"
                      whileHover={{ y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {doc}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Approval Status */}
          <div className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xs border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                APPROVAL STATUS
              </h3>

              <div className="space-y-3">
                {/* Faculty Approval */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <motion.div
                      className="bg-indigo-100 dark:bg-indigo-900/20 p-1.5 rounded-full"
                      whileHover={{ rotate: 5 }}
                    >
                      <FaUserTie className="text-indigo-600 dark:text-indigo-400 text-sm" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">Faculty</h4>
                      <div className="flex items-center">
                        {renderStatusIcon(leave.decisionBy.faculty.status)}
                        <span
                          className={`text-xs font-medium ${
                            leave.decisionBy.faculty.status === "approved"
                              ? "text-green-600 dark:text-green-400"
                              : leave.decisionBy.faculty.status === "rejected"
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {leave.decisionBy.faculty.status.charAt(0).toUpperCase() +
                            leave.decisionBy.faculty.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {leave.decisionBy.faculty.comment && (
                      <motion.p
                        className="text-xs text-gray-600 dark:text-gray-300 mt-1 bg-gray-50 dark:bg-gray-700/50 p-2 rounded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        "{leave.decisionBy.faculty.comment}"
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {/* HOD Approval */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <motion.div
                      className="bg-indigo-100 dark:bg-indigo-900/20 p-1.5 rounded-full"
                      whileHover={{ rotate: 5 }}
                    >
                      <FaUserTie className="text-indigo-700 dark:text-indigo-500 text-sm" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">HOD</h4>
                      <div className="flex items-center">
                        {renderStatusIcon(leave.decisionBy.hod.status)}
                        <span
                          className={`text-xs font-medium ${
                            leave.decisionBy.hod.status === "approved"
                              ? "text-green-600 dark:text-green-400"
                              : leave.decisionBy.hod.status === "rejected"
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {leave.decisionBy.hod.status.charAt(0).toUpperCase() +
                            leave.decisionBy.hod.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {leave.decisionBy.hod.comment && (
                      <motion.p
                        className="text-xs text-gray-600 dark:text-gray-300 mt-1 bg-gray-50 dark:bg-gray-700/50 p-2 rounded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                      >
                        "{leave.decisionBy.hod.comment}"
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {/* Warden Approval */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <motion.div
                      className="bg-indigo-100 dark:bg-indigo-900/20 p-1.5 rounded-full"
                      whileHover={{ rotate: 5 }}
                    >
                      <FaUserShield className="text-indigo-800 dark:text-indigo-600 text-sm" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">Warden</h4>
                      <div className="flex items-center">
                        {renderStatusIcon(leave.decisionBy.warden.status)}
                        <span
                          className={`text-xs font-medium ${
                            leave.decisionBy.warden.status === "approved"
                              ? "text-green-600 dark:text-green-400"
                              : leave.decisionBy.warden.status === "rejected"
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {leave.decisionBy.warden.status.charAt(0).toUpperCase() +
                            leave.decisionBy.warden.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {leave.decisionBy.warden.comment && (
                      <motion.p
                        className="text-xs text-gray-600 dark:text-gray-300 mt-1 bg-gray-50 dark:bg-gray-700/50 p-2 rounded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        "{leave.decisionBy.warden.comment}"
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Summary Card */}
            <motion.div
              variants={itemVariants}
              className={`bg-${
                leave.finalStatus === "rejected" ? "red" : "blue"
              }-50 dark:bg-${
                leave.finalStatus === "rejected" ? "red" : "blue"
              }-900/20 p-3 rounded-lg border border-${
                leave.finalStatus === "rejected" ? "red" : "blue"
              }-100 dark:border-${
                leave.finalStatus === "rejected" ? "red" : "blue"
              }-800`}
              whileHover={{ y: -2 }}
            >
              <h3 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                FINAL STATUS
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {leave.finalStatus === "approved" ? (
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <FaCheck className="text-green-500 dark:text-green-400 mr-2" />
                    </motion.div>
                  ) : leave.finalStatus === "rejected" ? (
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <FaTimes className="text-red-500 dark:text-red-400 mr-2" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <IoMdTime className="text-yellow-500 dark:text-yellow-400 mr-2" />
                    </motion.div>
                  )}
                  <span
                    className={`font-medium ${
                      leave.finalStatus === "approved"
                        ? "text-green-700 dark:text-green-400"
                        : leave.finalStatus === "rejected"
                        ? "text-red-700 dark:text-red-400"
                        : "text-yellow-700 dark:text-yellow-400"
                    }`}
                  >
                    {leave.finalStatus.charAt(0).toUpperCase() +
                      leave.finalStatus.slice(1)}
                  </span>
                </div>
                <motion.button
                  onClick={() => { setSelectedLeave(leave), setExpandedLeave(null) }}
                  className="text-xs cursor-pointer bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 px-2 py-1 rounded border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Full Details
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeaveExpandedDetails;