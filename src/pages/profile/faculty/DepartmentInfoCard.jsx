import { motion } from "framer-motion";
import { Building, BookOpen, Users, Award } from "lucide-react";
import ProfileField from "./ProfileField";

const DepartmentInfoCard = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6"
  >
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
        <Building className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Department Info
      </h3>
    </div>

    <div className="space-y-4">
      <ProfileField
        icon={<Building className="w-4 h-4" />}
        label="Department"
        value={user.department}
        gradient="from-blue-500 to-indigo-500"
      />
      <ProfileField
        icon={<BookOpen className="w-4 h-4" />}
        label="Branch"
        value={user.branch}
        gradient="from-indigo-500 to-purple-500"
      />
      {user.section && (
        <ProfileField
          icon={<Users className="w-4 h-4" />}
          label="Section"
          value={`Section ${user.section}`}
          gradient="from-purple-500 to-pink-500"
        />
      )}
      <ProfileField
        icon={<Award className="w-4 h-4" />}
        label="Role"
        value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        gradient="from-pink-500 to-red-500"
      />
    </div>
  </motion.div>
);

export default DepartmentInfoCard;
