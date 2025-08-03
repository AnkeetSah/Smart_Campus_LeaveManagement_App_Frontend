import React from "react";
import { User, Mail, GraduationCap, Hash, Calendar, MapPin, Home, Clock, Award, BookOpen, Phone, Globe, Star, TrendingUp } from "lucide-react";

// Mock user data for demonstration
import useAuthStore from "../../store/useAuthStore";

const MyProfile = () => {
  const user = useAuthStore((state) => state.user);

  return user ?(
    <div className="min-h-screen bg-gradient-to-br pb-20 from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-all duration-500">
      
      {/* Enhanced background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-xl sm:blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="md:px-10 mx-auto">
          
          {/* Enhanced Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Student Profile
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Your comprehensive academic and personal information dashboard
            </p>
          </div>

          {/* Hero Profile Card */}
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-2xl mb-6 sm:mb-8 overflow-hidden">
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl sm:blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 rounded-full blur-lg sm:blur-xl"></div>
            
            <div className="relative p-6 sm:p-8">
              
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 lg:space-x-8 mb-6 sm:mb-8">
                
                {/* Avatar Section */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
                    <User className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-3 sm:border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Name and Basic Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {user.name}
                  </h2>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm">
                      <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      {user.program}
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 shadow-sm">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      {user.branch}
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 shadow-sm">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Sem {user.semester}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl font-medium">
                    {user.branch} - Section {user.section}
                  </p>
                </div>

                {/* Status and Roll Number */}
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  <span className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 rounded-full text-sm sm:text-base font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                    Active Student
                  </span>
                  <div className="text-center bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 sm:px-6 sm:py-4 border border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Roll Number</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{user.rollNumber}</p>
                  </div>
                </div>
              </div>

             
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Personal Information */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Personal Details
                  </h3>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <ProfileField
                  icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
                  label="Email Address"
                  value={user.email}
                  gradient="from-blue-500 to-cyan-500"
                />
                
                <ProfileField
                  icon={<Hash className="w-4 h-4 sm:w-5 sm:h-5" />}
                  label="Student ID"
                  value={user.rollNumber}
                  gradient="from-indigo-500 to-purple-500"
                />
                
                <ProfileField
                  icon={<User className="w-4 h-4 sm:w-5 sm:h-5" />}
                  label="Gender"
                  value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                  gradient="from-purple-500 to-pink-500"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
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
            </div>

            {/* Accommodation & Timeline */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
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
                  value={`${new Date(user.semesterStartDate).toLocaleDateString()} - ${new Date(user.semesterEndDate).toLocaleDateString()}`}
                  gradient="from-teal-500 to-cyan-500"
                />
                
                <ProfileField
                  icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}
                  label="Last Updated"
                  value={new Date(user.updatedAt).toLocaleDateString()}
                  gradient="from-cyan-500 to-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Account Timeline Footer */}
          <div className="mt-6 sm:mt-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                Account Timeline
              </h3>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center space-x-4 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl sm:rounded-2xl border border-blue-100 dark:border-blue-800/30">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Account Created</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl sm:rounded-2xl border border-purple-100 dark:border-purple-800/30">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Account Type</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white capitalize truncate">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ):( <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
    Loading user profile...
  </div>);
};

const ProfileField = ({ icon, label, value, gradient }) => {
  return (
    <div className="group p-3 sm:p-4 bg-gray-50/80 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700/80 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1">
      <div className="flex items-center space-x-3 mb-2 sm:mb-3">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${gradient} rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
          <span className="text-white">{icon}</span>
        </div>
        <span className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-gray-900 dark:text-white font-semibold text-base sm:text-lg group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors break-words">
        {value}
      </p>
    </div>
  );
};

export default MyProfile;