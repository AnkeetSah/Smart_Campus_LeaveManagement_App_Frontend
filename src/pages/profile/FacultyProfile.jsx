import React from "react";
import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Hash, Calendar, MapPin, Home, Clock, Award, BookOpen, Users, ChevronRight, Star, Building } from "lucide-react";

const faculty = {
  _id: "64f123abc456def789gh0123",
  name: "Dr. Priya Sharma",
  email: "priya.sharma@giet.edu",
  password: "$2b$10$abcdefgh12345678hashedpassword",
  department: "Computer Science",
  branch: "CSE",
  section: "B",
  role: "faculty",
  firstLogin: "true",
  createdAt: "2025-07-31T10:00:00.000Z",
  updatedAt: "2025-07-31T10:00:00.000Z",
  __v: 0
};

const FacultyProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-all duration-500 p-6">
      
      {/* Subtle background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Faculty Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional academic and departmental information dashboard
          </p>
        </motion.div>

        {/* Main Profile Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl shadow-2xl p-8 mb-8 overflow-hidden"
        >
          {/* Card decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
          
          {/* Profile Header */}
          <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-700 dark:from-purple-500 dark:to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {faculty.name}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  {faculty.role.charAt(0).toUpperCase() + faculty.role.slice(1)}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <Building className="w-4 h-4 mr-1" />
                  {faculty.department}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  <Users className="w-4 h-4 mr-1" />
                  Section {faculty.section}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Professor of Computer Science Engineering
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Active Faculty
              </span>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Department</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{faculty.branch}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Personal Information */}
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
                value={faculty.email}
                gradient="from-purple-500 to-pink-500"
              />
              
              <ProfileField
                icon={<Hash className="w-4 h-4" />}
                label="Faculty ID"
                value={faculty._id.slice(-8).toUpperCase()}
                gradient="from-indigo-500 to-purple-500"
              />
              
              <ProfileField
                icon={<GraduationCap className="w-4 h-4" />}
                label="Academic Title"
                value="Doctor of Philosophy"
                gradient="from-purple-500 to-blue-500"
              />
            </div>
          </motion.div>

          {/* Department Information */}
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
                value={faculty.department}
                gradient="from-blue-500 to-indigo-500"
              />
              
              <ProfileField
                icon={<BookOpen className="w-4 h-4" />}
                label="Branch"
                value={faculty.branch}
                gradient="from-indigo-500 to-purple-500"
              />
              
              <ProfileField
                icon={<Users className="w-4 h-4" />}
                label="Section"
                value={`Section ${faculty.section}`}
                gradient="from-purple-500 to-pink-500"
              />
              
              <ProfileField
                icon={<Award className="w-4 h-4" />}
                label="Role"
                value={faculty.role.charAt(0).toUpperCase() + faculty.role.slice(1)}
                gradient="from-pink-500 to-red-500"
              />
            </div>
          </motion.div>

          {/* Academic Status & Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
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
                value={new Date(faculty.createdAt).toLocaleDateString()}
                gradient="from-green-500 to-emerald-500"
              />
              
              <ProfileField
                icon={<Clock className="w-4 h-4" />}
                label="Last Updated"
                value={new Date(faculty.updatedAt).toLocaleDateString()}
                gradient="from-emerald-500 to-teal-500"
              />
              
              <ProfileField
                icon={<Star className="w-4 h-4" />}
                label="Login Status"
                value={faculty.firstLogin === "true" ? "First Login Required" : "Active"}
                gradient="from-teal-500 to-cyan-500"
              />
              
              <ProfileField
                icon={<Award className="w-4 h-4" />}
                label="Experience"
                value="5+ Years Teaching"
                gradient="from-cyan-500 to-blue-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions & Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Teaching Statistics */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              Teaching Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">25+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Students</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Subjects</div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <User className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              Account Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Account Type</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white capitalize">{faculty.role}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Active
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
            Areas of Expertise
          </h3>
          <div className="flex flex-wrap gap-3">
            {["Data Structures", "Algorithms", "Machine Learning", "Database Systems", "Software Engineering", "Web Development"].map((expertise, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/30 hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                {expertise}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, value, gradient }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group p-4 bg-gray-50/80 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700/80 rounded-xl border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className={`w-8 h-8 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center shadow-sm`}>
          <span className="text-white">{icon}</span>
        </div>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-gray-900 dark:text-white font-medium text-lg group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">
        {value}
      </p>
    </motion.div>
  );
};

export default FacultyProfile;