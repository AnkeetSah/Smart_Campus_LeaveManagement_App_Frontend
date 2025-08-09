import { useState } from "react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import universityImage from '../assets/university-building.jpg';
import useLogin from "../hooks/useLogin";

const LoginForm = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 // ✅ use only one mutation instance
const { mutate, isError, error, status } = useLogin(role);
const isLoading = status === "pending"; // ✅ instead of "loading"


console.log("status:", status);
console.log("isLoading:", isLoading);




  console.log("isLoading:", isLoading);
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  const getRoleSpecificContent = () => {
    switch(role) {
      case 'student':
        return {
          imageAlt: "University campus with students",
          placeholder: "University email"
        };
      case 'faculty':
        return {
          imageAlt: "University lecture hall",
          placeholder: "Faculty email"
        };
      case 'warden':
        return {
          imageAlt: "University hostel building",
          placeholder: "Warden email"
        };
      default:
        return {
          imageAlt: "University building",
          placeholder: "Email address"
        };
    }
  };

  const { imageAlt, placeholder } = getRoleSpecificContent();

  return (
    <div className="relative">
      {/* Loading overlay */}
      {console.log(`isLoading: ${isLoading}`)}
      {isLoading && (
  <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl  ">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-3 text-white font-medium">Authenticating...</p>
    </div>
  </div>
)}



      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={isLoading ? "opacity-70" : ""}
      >
        <div className="overflow-hidden rounded-xl shadow-md">
          <img 
            src={universityImage} 
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" 
            alt={imageAlt} 
          />
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <motion.div 
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={placeholder}
              className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
              disabled={isLoading}
            />
            <FaUserAlt className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-300" />
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-4 py-3 pl-11 pr-11 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
              disabled={isLoading}
            />
            <FaLock className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-300" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors duration-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={isLoading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 shadow-md transition-all duration-300 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : "Login"}
            </button>
          </motion.div>

          {isError && (
            <motion.div 
              className="p-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Error: {error.message || "Invalid credentials. Please try again."}
            </motion.div>
          )}

          {/* {isSuccess && (
            <motion.div 
              className="p-3 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Welcome back! Redirecting...
            </motion.div>
          )} */}
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;