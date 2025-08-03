import React from "react";
import { motion } from "framer-motion";

// Mock user data for demonstration
import useAuthStore from "../../../store/useAuthStore";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ProfileField from "../faculty/ProfileField";
import ProfileSection from "./ProfileSection/ProfileSection";
import AccountTimelineSection from "./AccountTimelineSection";
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const hoverVariants = {
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const MyProfile = () => {
  const user = useAuthStore((state) => state.user);

  return user ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br pb-20 from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-all duration-500"
    >
      {/* Enhanced background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"
        ></motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></motion.div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-xl sm:blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></motion.div>
      </div>

      <div className="relative min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="md:px-10 mx-auto">
          {/* Enhanced Header */}
          <Header/>
          {/* Hero Profile Card */}
            <HeroSection user={user} cardVariants={cardVariants} containerVariants={containerVariants} itemVariants={itemVariants}/>
          {/* Information Grid */}
          <ProfileSection user={user} containerVariants={containerVariants} itemVariants={itemVariants}/>
          {/* Account Timeline Footer */}
           <AccountTimelineSection
  user={user}
  hoverVariants={hoverVariants}
/>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300"
    >
      Loading user profile...
    </motion.div>
  );
};



export default MyProfile;
