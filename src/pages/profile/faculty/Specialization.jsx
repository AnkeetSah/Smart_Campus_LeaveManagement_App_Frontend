import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
const Specialization = () => {
  return (
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
            {[
              "Data Structures",
              "Algorithms",
              "Machine Learning",
              "Database Systems",
              "Software Engineering",
              "Web Development",
            ].map((expertise, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/30 hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                {expertise}
              </span>
            ))}
          </div>
        </motion.div>
  )
}

export default Specialization