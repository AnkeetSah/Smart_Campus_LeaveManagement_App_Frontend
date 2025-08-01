import React from "react";
import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Hash, Calendar, MapPin, Home, Clock, Award, BookOpen } from "lucide-react";

const student = {
  name: "Ankeet Kumar Sah",
  email: "ankeet@example.com",
  password: "$2b$10$hashedpassword",
  branch: "CSE",
  section: "A",
  rollNumber: "22CSE794",
  program: "B.Tech",
  semester: 5,
  gender: "male",
  hostel: {
    name: "Vivekananda Hostel",
    roomNumber: "B203"
  },
  role: "student",
  semesterStartDate: "2025-07-01T00:00:00.000Z",
  semesterEndDate: "2025-12-15T00:00:00.000Z",
  firstLogin: "false",
  createdAt: "2025-06-15T08:45:00.000Z",
  updatedAt: "2025-07-31T10:30:00.000Z"
};

const MyProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-all duration-500 p-6">
      
      {/* Subtle background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Student Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your comprehensive academic and personal information dashboard
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
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
          
          {/* Profile Header */}
          <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {student.name}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  {student.program}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {student.branch}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  <Award className="w-4 h-4 mr-1" />
                  Semester {student.semester}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Computer Science Engineering Student
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Active Student
              </span>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Roll Number</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{student.rollNumber}</p>
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
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
                value={student.email}
                gradient="from-blue-500 to-cyan-500"
              />
              
              <ProfileField
                icon={<Hash className="w-4 h-4" />}
                label="Student ID"
                value={student.rollNumber}
                gradient="from-indigo-500 to-purple-500"
              />
              
              <ProfileField
                icon={<User className="w-4 h-4" />}
                label="Gender"
                value={student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}
                gradient="from-purple-500 to-pink-500"
              />
            </div>
          </motion.div>

          {/* Academic Information */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Academic Info
              </h3>
            </div>
            
            <div className="space-y-4">
              <ProfileField
                icon={<GraduationCap className="w-4 h-4" />}
                label="Program"
                value={student.program}
                gradient="from-purple-500 to-indigo-500"
              />
              
              <ProfileField
                icon={<BookOpen className="w-4 h-4" />}
                label="Branch"
                value={student.branch}
                gradient="from-indigo-500 to-blue-500"
              />
              
              <ProfileField
                icon={<Hash className="w-4 h-4" />}
                label="Section"
                value={student.section}
                gradient="from-blue-500 to-cyan-500"
              />
              
              <ProfileField
                icon={<Award className="w-4 h-4" />}
                label="Current Semester"
                value={`Semester ${student.semester}`}
                gradient="from-cyan-500 to-teal-500"
              />
            </div>
          </motion.div>

          {/* Accommodation & Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Accommodation
              </h3>
            </div>
            
            <div className="space-y-4">
              <ProfileField
                icon={<Home className="w-4 h-4" />}
                label="Hostel Name"
                value={student.hostel.name}
                gradient="from-green-500 to-emerald-500"
              />
              
              <ProfileField
                icon={<MapPin className="w-4 h-4" />}
                label="Room Number"
                value={student.hostel.roomNumber}
                gradient="from-emerald-500 to-teal-500"
              />
              
              <ProfileField
                icon={<Calendar className="w-4 h-4" />}
                label="Semester Duration"
                value={`${new Date(student.semesterStartDate).toLocaleDateString()} - ${new Date(student.semesterEndDate).toLocaleDateString()}`}
                gradient="from-teal-500 to-cyan-500"
              />
              
              <ProfileField
                icon={<Clock className="w-4 h-4" />}
                label="Last Updated"
                value={new Date(student.updatedAt).toLocaleDateString()}
                gradient="from-cyan-500 to-blue-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Account Information Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
            Account Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Account Created</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {new Date(student.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Account Type</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                  {student.role}
                </p>
              </div>
            </div>
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

export default MyProfile;