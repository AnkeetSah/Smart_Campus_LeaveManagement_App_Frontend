import React from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Users,
  Star,
  Building,
} from "lucide-react";
const ProfileHero = ({user,roleMap}) => {
  return (
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
                    {user.name}
                  </h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      <Building className="w-4 h-4 mr-1" />
                      {user.department}
                    </span>
                    {user.section && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        <Users className="w-4 h-4 mr-1" />
                        Section {user.section}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    <span>
                      {roleMap[user.role] + " "}
                      {["Faculty", "HOD"].includes(roleMap[user.role]) &&
                        "of Computer Science Engineering"}
                      {["Warden"].includes(roleMap[user.role]) &&
                        `of ${user.hostel} `}
                    </span>
                  </p>
                </div>
    
                <div className="flex flex-col items-center space-y-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
    
                    {["Warden"].includes(roleMap[user.role]) && `Active Warden `}
                    {["Faculty", "HOD"].includes(roleMap[user.role]) &&
                      `Active Faculty `}
                  </span>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Department
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {user.branch}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
    
  )
}

export default ProfileHero