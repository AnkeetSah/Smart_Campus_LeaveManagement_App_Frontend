import { motion } from "framer-motion";
const ProfileField = ({ icon, label, value, gradient }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group p-4 bg-gray-50/80 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700/80 rounded-xl border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className={`w-8 h-8 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center shadow-sm`}>
          <span className="text-white">{icon}</span>
        </div>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-gray-900 dark:text-white font-medium text-lg group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">
        {value}
      </p>
    </motion.div>
  );
};

export default ProfileField