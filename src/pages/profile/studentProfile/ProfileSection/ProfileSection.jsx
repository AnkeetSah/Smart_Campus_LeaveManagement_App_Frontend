import { motion } from "framer-motion";
import PersonalDetailsSection from "./PersonalDetailsSection";
import AcademicInfoSection from "./AcademicInfoSection";
import AccommodationSection from "./AccommodationSection";

const ProfileSection = ({ containerVariants, itemVariants, user }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
  >
    <PersonalDetailsSection itemVariants={itemVariants} user={user} />
    <AcademicInfoSection itemVariants={itemVariants} user={user} />
    <AccommodationSection itemVariants={itemVariants} user={user} />
  </motion.div>
);

export default ProfileSection;
