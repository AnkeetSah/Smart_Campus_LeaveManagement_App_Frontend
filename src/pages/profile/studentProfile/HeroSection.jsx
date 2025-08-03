import { motion } from 'framer-motion'
import {User,GraduationCap,BookOpen,Award} from 'lucide-react'
const HeroSection = ({user,cardVariants,containerVariants,itemVariants}) => {
  return (
    <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl sm:rounded-3xl shadow-2xl mb-6 sm:mb-8 overflow-hidden"
          >
            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl sm:blur-2xl"
            ></motion.div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 rounded-full blur-lg sm:blur-xl"
            ></motion.div>

            <div className="relative p-6 sm:p-8">
              {/* Profile Header */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 lg:space-x-8 mb-6 sm:mb-8"
              >
                {/* Avatar Section */}
                <motion.div
                  variants={itemVariants}
                  className="relative flex-shrink-0"
                >
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl"
                  >
                    <User className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-3 sm:border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                  </motion.div>
                </motion.div>

                {/* Name and Basic Info */}
                <motion.div
                  variants={itemVariants}
                  className="flex-1 text-center sm:text-left"
                >
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {user.name}
                  </h2>

                  {/* Tags */}
                  <motion.div
                    variants={containerVariants}
                    className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6"
                  >
                    <motion.span
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm"
                    >
                      <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      {user.program}
                    </motion.span>
                    <motion.span
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 shadow-sm"
                    >
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      {user.branch}
                    </motion.span>
                    <motion.span
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 shadow-sm"
                    >
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Sem {user.semester}
                    </motion.span>
                  </motion.div>

                  <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl font-medium">
                    {user.branch} - Section {user.section}
                  </p>
                </motion.div>

                {/* Status and Roll Number */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col items-center space-y-3 sm:space-y-4"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 rounded-full text-sm sm:text-base font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-2 h-2 bg-white rounded-full mr-2"
                    ></motion.div>
                    Active Student
                  </motion.span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 sm:px-6 sm:py-4 border border-gray-200 dark:border-gray-600"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">
                      Roll Number
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {user.rollNumber}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

  )
}

export default HeroSection