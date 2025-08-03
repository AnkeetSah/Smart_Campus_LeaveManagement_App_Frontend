import { motion } from "framer-motion";
import { User, Mail, Hash } from "lucide-react";
import ProfileField from "../ProfileField";

const PersonalDetailsSection = ({ itemVariants, user }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
  >
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6">
      <div className="flex items-center space-x-3">
        <motion.div
          whileHover={{ rotate: 10 }}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center"
        >
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Personal Details
        </h3>
      </div>
    </div>

    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <ProfileField
        icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Email Address"
        value={user.email}
        gradient="from-blue-500 to-cyan-500"
      />
      <ProfileField
        icon={<Hash className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Student ID"
        value={user.rollNumber}
        gradient="from-indigo-500 to-purple-500"
      />
      <ProfileField
        icon={<User className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Gender"
        value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
        gradient="from-purple-500 to-pink-500"
      />
    </div>
  </motion.div>
);

export default PersonalDetailsSection;
