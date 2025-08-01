import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { FaExclamationTriangle } from "react-icons/fa";

const Unauthorized = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  const navigate = useNavigate();

  const goToDashboard = () => {
    if (user?.role) {
      navigate(`/dashboard/${user.role.toLowerCase()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans relative overflow-hidden flex items-center justify-center transition-colors duration-300">
      {/* Floating Blobs - hidden in dark mode */}
      <div className="fixed dark:hidden inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-20 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-xl dark:shadow-gray-900/30 px-8 py-12 max-w-lg text-center transition-colors duration-300"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-400 to-pink-500 dark:from-red-500 dark:to-pink-600 flex items-center justify-center shadow-lg">
          <FaExclamationTriangle className="text-white text-3xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Hi{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {user?.name || "User"}
          </span>
          , you are currently logged in as{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {user?.role}
          </span>{" "}
          and don't have permission to view this page.
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={goToDashboard}
          className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>Go to My Dashboard</span>
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
      </motion.div>
    </div>
  );
};

export default Unauthorized;
