import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoginForm from "../../components/LoginForm";
import { useEffect, useState } from "react";

function LoginPage() {
  const { userType } = useParams(); // 'student', 'faculty', 'warden'

  // Get user-friendly title
  const getUserTitle = () => {
  
    switch(userType) {
      case 'student':
        return 'Student';
      case 'faculty':
        return 'Faculty';
      case 'warden':
        return 'Warden';
      case 'hod':
        return 'HOD';
      case 'guard':
        return 'Security';
      default:
        return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans relative overflow-hidden transition-colors duration-300">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="z-10 relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/30 p-6 sm:p-8 transition-colors duration-300"
        >
          <div className="text-center">
            <motion.h2 
              className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome, {getUserTitle()}!
            </motion.h2>
            <motion.p 
              className="mt-2 text-sm text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Please sign in to continue
            </motion.p>
          </div>

          <LoginForm role={userType} />
          
          <motion.div 
            className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>
              Need help?{' '}
              <a 
                href="/support" 
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Contact support
              </a>
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

export default LoginPage;