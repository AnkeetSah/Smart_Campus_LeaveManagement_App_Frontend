import { motion } from "framer-motion";
import { Clock, Calendar, User } from "lucide-react";

const AccountTimelineSection = ({ user, hoverVariants }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-6 sm:mt-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-yellow-700 to-yellow-800 dark:from-yellow-700 dark:to-yellow-800 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
          Account Timeline
        </h3>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Created At */}
          <motion.div
            whileHover="hover"
            variants={hoverVariants}
            className="flex items-center space-x-4 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl sm:rounded-2xl border border-blue-100 dark:border-blue-800/30"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
            >
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                Account Created
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>

          {/* Account Role */}
          <motion.div
            whileHover="hover"
            variants={hoverVariants}
            className="flex items-center space-x-4 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl sm:rounded-2xl border border-purple-100 dark:border-purple-800/30"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
            >
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                Account Type
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white capitalize truncate">
                {user.role}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountTimelineSection;
