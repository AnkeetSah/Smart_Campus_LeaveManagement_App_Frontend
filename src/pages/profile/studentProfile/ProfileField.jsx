import { motion } from "framer-motion";
const ProfileField = ({ icon, label, value, gradient }) => {
  return (
    <motion.div
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.02,
          y: -5,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        },
      }}
      className="group p-3 sm:p-4 bg-gray-50/80 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700/80 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-center space-x-3 mb-2 sm:mb-3">
        <motion.div
          whileHover={{ rotate: 10 }}
          className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${gradient} rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}
        >
          <span className="text-white">{icon}</span>
        </motion.div>
        <span className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-gray-900 dark:text-white font-semibold text-base sm:text-lg group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors break-words">
        {value}
      </p>
    </motion.div>
  );
};

export default ProfileField