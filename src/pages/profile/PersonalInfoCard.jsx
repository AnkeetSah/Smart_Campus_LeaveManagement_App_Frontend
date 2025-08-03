import { motion } from "framer-motion";
import { User, Mail, Hash } from "lucide-react";
import ProfileField from "./ProfileField";

const PersonalInfoCard = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6"
  >
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
        <User className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Personal Details
      </h3>
    </div>

    <div className="space-y-4">
      <ProfileField
        icon={<Mail className="w-4 h-4" />}
        label="Email Address"
        value={user.email}
        gradient="from-purple-500 to-pink-500"
      />
      <ProfileField
        icon={<Hash className="w-4 h-4" />}
        label="Faculty ID"
        value={user._id.slice(-8).toUpperCase()}
        gradient="from-indigo-500 to-purple-500"
      />
    </div>
  </motion.div>
);

export default PersonalInfoCard;
