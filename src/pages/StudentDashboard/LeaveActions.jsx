import { motion } from "framer-motion";
import { FaPlusCircle, FaClipboardList, FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
const LeaveActions = ({ openForm, openLeaveStatus, openLeaveHistoryForm }) => {
  const MotionLink = motion(Link);
  const cards = [
    {
      icon: FaPlusCircle,
      title: "Apply for Leave",
      description: "Submit a new leave application with required details.",
      gradient: "from-blue-500 to-indigo-600",
      url: '/dashboard/student/apply-leave',
      buttonText: "Create Leave",
      bgLight: "bg-blue-100 dark:bg-blue-900/20",
      hoverGradient: "from-blue-600 to-indigo-700",
      darkGradient: "from-blue-400 to-indigo-500",
      darkHoverGradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: FaClipboardList,
      title: "Leave Status",
      description: "Track your active leave requests and responses.",
      gradient: "from-indigo-500 to-blue-600",
          url:"/dashboard/student/leave-status",
      buttonText: "View Status",
      bgLight: "bg-indigo-100 dark:bg-indigo-900/20",
      hoverGradient: "from-indigo-600 to-blue-700",
      darkGradient: "from-indigo-400 to-blue-500",
      darkHoverGradient: "from-indigo-500 to-blue-600"
    },
    {
      icon: FaHistory,
      title: "Leave History",
      description: "View your previously applied and approved leaves.",
      gradient: "from-purple-500 to-indigo-500",
      url:"/dashboard/student/leave-history",
      buttonText: "Check History",
      bgLight: "bg-purple-100 dark:bg-purple-900/20",
      hoverGradient: "from-purple-600 to-indigo-600",
      darkGradient: "from-purple-400 to-indigo-400",
      darkHoverGradient: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 text-center hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 relative overflow-hidden"
        >
          {/* Background decorative circle */}
          <div
            className={`absolute -top-10 -right-10 w-32 h-32 ${card.bgLight} rounded-full opacity-20 dark:opacity-30`}
          ></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${card.gradient} dark:${card.darkGradient} flex items-center justify-center shadow-md dark:shadow-lg`}
            >
              <card.icon className="text-white text-3xl" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {card.description}
            </p>

            {/* Button */}
           <MotionLink
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  to={card.url} // <- Use 'to' for react-router Link
  className={`w-full cursor-pointer py-3 rounded-xl text-white bg-gradient-to-r ${card.gradient} hover:${card.hoverGradient} dark:bg-gradient-to-r ${card.darkGradient} dark:hover:${card.darkHoverGradient} font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md dark:shadow-lg`}
>
  <span>{card.buttonText}</span>
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
</MotionLink>

          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LeaveActions;
