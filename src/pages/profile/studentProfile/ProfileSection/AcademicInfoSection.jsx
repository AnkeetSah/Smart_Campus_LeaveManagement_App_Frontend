import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Hash, Award } from "lucide-react";
import ProfileField from "../ProfileField";

const AcademicInfoSection = ({ itemVariants, user }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
  >
    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6">
      <div className="flex items-center space-x-3">
        <motion.div
          whileHover={{ rotate: 10 }}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center"
        >
          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Academic Info
        </h3>
      </div>
    </div>

    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <ProfileField
        icon={<GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Program"
        value={user.program}
        gradient="from-purple-500 to-indigo-500"
      />
      <ProfileField
        icon={<BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Branch"
        value={user.branch}
        gradient="from-indigo-500 to-blue-500"
      />
      <ProfileField
        icon={<Hash className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Section"
        value={user.section}
        gradient="from-blue-500 to-cyan-500"
      />
      <ProfileField
        icon={<Award className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Current Semester"
        value={`Semester ${user.semester}`}
        gradient="from-cyan-500 to-teal-500"
      />
    </div>
  </motion.div>
);

export default AcademicInfoSection;
