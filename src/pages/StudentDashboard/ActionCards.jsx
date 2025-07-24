import React from "react";
import { motion } from "framer-motion";
import { FaPlusCircle, FaClipboardList, FaHistory } from "react-icons/fa";

const cardData = [
  {
    title: "Apply for Leave",
    description: "Submit a new leave application with required details.",
    icon: <FaPlusCircle className="text-white text-3xl" />,
    bgGradient: "from-blue-500 to-indigo-600",
    darkGradient: "dark:from-blue-600 dark:to-indigo-700",
    ringColor: "bg-blue-100 dark:bg-blue-900/20",
    hoverGradient:
      "hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800",
    buttonText: "Create Leave",
    animationDelay: 0.1,
  },
  {
    title: "Leave Status",
    description: "Track your active leave requests and responses.",
    icon: <FaClipboardList className="text-white text-3xl" />,
    bgGradient: "from-indigo-500 to-blue-600",
    darkGradient: "dark:from-indigo-600 dark:to-blue-700",
    ringColor: "bg-indigo-100 dark:bg-indigo-900/20",
    hoverGradient:
      "hover:from-indigo-600 hover:to-blue-700 dark:hover:from-indigo-700 dark:hover:to-blue-800",
    buttonText: "View Status",
    animationDelay: 0.2,
  },
  {
    title: "Leave History",
    description: "View your previously applied and approved leaves.",
    icon: <FaHistory className="text-white text-3xl" />,
    bgGradient: "from-purple-500 to-indigo-500",
    darkGradient: "dark:from-purple-600 dark:to-indigo-600",
    ringColor: "bg-purple-100 dark:bg-purple-900/20",
    hoverGradient:
      "hover:from-purple-600 hover:to-indigo-600 dark:hover:from-purple-700 dark:hover:to-indigo-700",
    buttonText: "Check History",
    animationDelay: 0.3,
  },
];

const ActionCards = () => {
  return (
    <>
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: card.animationDelay, duration: 0.5 }}
          whileHover={{
            y: -5,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 text-center hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 relative overflow-hidden"
        >
          <div
            className={`absolute -top-10 -right-10 w-32 h-32 ${card.ringColor} rounded-full opacity-20 dark:opacity-30`}
          />
          <div className="relative z-10">
            <motion.div
              
              className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${card.bgGradient} ${card.darkGradient} flex items-center justify-center shadow-md dark:shadow-lg transition-transform duration-300`}
            >
              {card.icon}
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {card.description}
            </p>
            <motion.button
              
              className={`w-full py-3 rounded-xl text-white bg-gradient-to-r ${card.bgGradient} ${card.darkGradient} ${card.hoverGradient} font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md dark:shadow-lg`}
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
            </motion.button>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default ActionCards;
