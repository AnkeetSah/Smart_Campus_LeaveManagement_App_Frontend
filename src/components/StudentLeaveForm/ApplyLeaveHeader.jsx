import { motion } from "framer-motion"
import { RiLeafLine } from "react-icons/ri";
import { FaChevronLeft } from "react-icons/fa";
const ApplyLeaveHeader = ({closeForm}) => {
  return (
       <header className="relative py-4 px-6 flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={closeForm}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <FaChevronLeft onClick={closeForm} className="text-gray-600 cursor-pointer dark:text-gray-300" />
        </motion.button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-lg flex items-center justify-center shadow">
            <RiLeafLine className="text-white cursor-pointer text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Apply for Leave
            </h1>
          </div>
        </div>
      </header>
  )
}

export default ApplyLeaveHeader