import { motion } from "framer-motion";
import { Clock, Calendar, Star } from "lucide-react";
import ProfileField from "./ProfileField";

const AcademicStatusCard = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-md mx-auto"
  >
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-6 space-y-3 sm:space-y-0">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
        <Clock className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Academic Status
      </h3>
    </div>

    <div className="space-y-4">
      <ProfileField
        icon={<Calendar className="w-4 h-4" />}
        label="Account Created"
        value={new Date(user.createdAt).toLocaleDateString()}
        gradient="from-green-500 to-emerald-500"
      />
      <ProfileField
        icon={<Clock className="w-4 h-4" />}
        label="Last Updated"
        value={new Date(user.updatedAt).toLocaleDateString()}
        gradient="from-emerald-500 to-teal-500"
      />
      <ProfileField
        icon={<Star className="w-4 h-4" />}
        label="Login Status"
        value={user.firstLogin === "true" ? "First Login Required" : "Active"}
        gradient="from-teal-500 to-cyan-500"
      />
    </div>
  </motion.div>
);

export default AcademicStatusCard;
