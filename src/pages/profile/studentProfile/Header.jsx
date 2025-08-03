import { motion } from "framer-motion"
import {User} from "lucide-react"
const Header = () => {
  return (
  <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg"
            >
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Student Profile
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Your comprehensive academic and personal information dashboard
            </p>
          </motion.div>

  )
}

export default Header