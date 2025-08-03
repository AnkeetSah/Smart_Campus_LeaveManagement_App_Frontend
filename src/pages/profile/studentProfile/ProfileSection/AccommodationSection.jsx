import { motion } from "framer-motion";
import { Home, MapPin, Calendar, Clock } from "lucide-react";
import ProfileField from "../ProfileField";

const AccommodationSection = ({ itemVariants, user }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
  >
    <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6">
      <div className="flex items-center space-x-3">
        <motion.div
          whileHover={{ rotate: 10 }}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center"
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Accommodation
        </h3>
      </div>
    </div>

    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <ProfileField
        icon={<Home className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Hostel Name"
        value={user.hostel.name}
        gradient="from-green-500 to-emerald-500"
      />
      <ProfileField
        icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Room Number"
        value={user.hostel.roomNumber}
        gradient="from-emerald-500 to-teal-500"
      />
      <ProfileField
        icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Semester Duration"
        value={`${new Date(
          user.semesterStartDate
        ).toLocaleDateString()} - ${new Date(
          user.semesterEndDate
        ).toLocaleDateString()}`}
        gradient="from-teal-500 to-cyan-500"
      />
      <ProfileField
        icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}
        label="Last Updated"
        value={new Date(user.updatedAt).toLocaleDateString()}
        gradient="from-cyan-500 to-blue-500"
      />
    </div>
  </motion.div>
);

export default AccommodationSection;
