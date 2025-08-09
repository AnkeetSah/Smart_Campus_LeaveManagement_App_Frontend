import React from "react";
import { motion } from "framer-motion";
import useAuthStore from "../../../store/useAuthStore";
import ProfileHeader from "./ProfileHeader";
import ProfileHero from "./ProfileHero";
import PersonalInfoCard from "./PersonalInfoCard";
import DepartmentInfoCard from "./DepartmentInfoCard";
import AcademicStatusCard from "./AcademicStatusCard";
import Specialization from "./Specialization";
import AccountInformation from "./AccountInformation";
const FacultyProfile = () => {
  const roleMap = {
    faculty: "Faculty",
    hod: "HOD",
    warden: "Warden",
    guard: "Guard",
  };
  const user = useAuthStore((state) => state.user);
  return user ? (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-all duration-500 p-6">
      {/* Subtle background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header with enhanced styling */}
        <ProfileHeader role={user.role} roleMap={roleMap} />
        {/* Main Profile Hero Card */}
        <ProfileHero user={user} roleMap={roleMap} />

        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <PersonalInfoCard user={user} />

          {/* Department Information */}
          <DepartmentInfoCard user={user} />

          {/* Academic Status & Timeline */}
          <AcademicStatusCard user={user} />
        </div>

        {/* Quick Actions & Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8  gap-8"
        >
          {/* Account Information */}
          <AccountInformation user={user} />
        </motion.div>

        {/* Specializations */}
        <Specialization />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
      Loading user profile...
    </div>
  );
};

export default FacultyProfile;
