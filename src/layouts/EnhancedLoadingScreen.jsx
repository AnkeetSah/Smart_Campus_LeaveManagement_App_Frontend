import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";
import { useEffect, useState } from "react";

const EnhancedLoadingScreen = ({ onComplete }) => {
  const [progressText, setProgressText] = useState("Initializing...");
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const messages = [
      "Loading assets...",
      "Preparing dashboard...",
      "Almost there...",
      "Finalizing...",
      "Ready!"
    ];
    
    const interval = setInterval(() => {
      setProgressPercent(prev => {
        const newPercent = Math.min(prev + Math.random() * 20, 100);
        
        // Update messages based on progress
        if (newPercent < 20) setProgressText(messages[0]);
        else if (newPercent < 40) setProgressText(messages[1]);
        else if (newPercent < 70) setProgressText(messages[2]);
        else if (newPercent < 90) setProgressText(messages[3]);
        else setProgressText(messages[4]);

        // Complete when reaching 100%
        if (newPercent >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 300); // Small delay for final animation
          return 100;
        }
        return newPercent;
      });
    }, 300); // Faster interval for quicker progression

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400/20 dark:bg-indigo-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      <div className="text-center space-y-8 z-10 px-4">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Leaveflow
          </h1>
          <motion.p 
            className="mt-2 text-gray-500 dark:text-gray-400 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Your modern leave management solution
          </motion.p>
        </motion.div>

        {/* Animated Logo */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.3,
            type: "spring",
            damping: 10,
            stiffness: 100
          }}
        >
          <motion.div 
            className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              rotate: { 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              },
            }}
          >
            {/* Inner glow */}
            <motion.div 
              className="absolute inset-0 bg-blue-400/20 rounded-2xl"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <RiLeafLine className="text-white text-4xl" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading Progress */}
        <motion.div 
          className="space-y-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>{progressText}</span>
            <span>{Math.min(100, Math.floor(progressPercent))}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div 
                className="absolute right-0 top-0 h-full w-1 bg-white"
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          
        </motion.div>

        {/* Studio Credit */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Crafted with care by
          </p>
          <motion.h2 
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium mt-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              WebVerse Studio
            </span>
          </motion.h2>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnhancedLoadingScreen;