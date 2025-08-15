import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";
import { FaChevronLeft } from "react-icons/fa";
const LeaveLoader = ({closeLeaveStatus}) => {
  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      <header className="relative z-10 py-4 px-6 flex items-center">
        <motion.button
          onClick={closeLeaveStatus}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FaChevronLeft className="text-gray-600" />
        </motion.button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow">
            <RiLeafLine className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Leave Status</h1>
            <p className="text-xs text-gray-600">
              Track all your leave applications
            </p>
          </div>
        </div>
      </header>
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center text-gray-500 mt-12">
          Loading your leave applications...
        </div>
      </main>
    </div>
  );
};

export default LeaveLoader;
