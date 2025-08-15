import React from "react";
import { motion } from "framer-motion";

const ProfileHeader = ({ role, roleMap }) => {
  console.log(role);
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
        <span>{roleMap[role] || "User"} Profile</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {role === "guard"
          ? "Here’s Your Profile Overview"
          : "Welcome to Your Academic & Departmental Dashboard"}
      </p>
    </motion.div>
  );
};

export default ProfileHeader;
