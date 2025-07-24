import { RiLeafLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { FaUserCircle, FaChevronLeft } from "react-icons/fa";
import useLeaveFormStore from "../store/useLeaveFormStore";
const LeaveApplicationHeader = () => {
  const { closeForm } = useLeaveFormStore();
  return (
    <header className="relative py-4 px-6 flex items-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={closeForm}
        className="mr-4 cursor-pointer p-2 rounded-full hover:bg-gray-100"
      >
        <FaChevronLeft className="text-gray-600" />
      </motion.button>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow">
          <RiLeafLine className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Apply for Leave</h1>
          {/* <p className="text-xs text-gray-600">Submit your leave request and mention your details below</p> */}
        </div>
      </div>
    </header>
  );
};

export default LeaveApplicationHeader;
