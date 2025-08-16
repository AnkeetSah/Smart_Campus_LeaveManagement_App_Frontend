import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const ApplyLeaveHeader = ({ content, url, subpart }) => {
  console.log(url)
  return (
    <header className="relative py-4 px-6 flex items-center">
      <MotionLink
        to={url}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
      </MotionLink>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-lg flex items-center justify-center shadow">
          <RiLeafLine className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {content}
          </h1>
          {subpart && (
            <p className="text-xs text-gray-600 dark:text-gray-400">{subpart}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default ApplyLeaveHeader;
