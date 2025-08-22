import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

import { RiLeafLine } from "react-icons/ri"; // Importing a leaf icon for the loader
import { HeartHandshake, HeartIcon } from "lucide-react";
// Simple custom loader component
function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gray-900">
      
      {/* Floating Logo Card */}
      <motion.div
        className="flex justify-center items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl py-3 px-6 shadow-xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      >
        <RiLeafLine className="w-8 h-8 text-blue-600" />
        <h1 className="font-bold text-blue-900 text-lg sm:text-xl">
          Welcome To Leave-Flow
        </h1>
      </motion.div>

      {/* Spinner with Glow */}
      <div className="relative w-24 h-24 mt-6 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-blue-300 border-b-blue-200 border-l-blue-400 animate-spin shadow-[0_0_25px_rgba(59,130,246,0.6)]"></div>
      </div>

     

      {/* Made By Section */}
      <motion.p
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <HeartHandshake className="text-red-500 w-5 h-5" />
        Made By WebVerse Studio
      </motion.p>
    </div>
  );
}


export default function UserLayout({ darkMode, setDarkMode, footerRef }) {
  const location = useLocation();
  const { loading,user} = useAuthStore();
 

  // Show loader while loading or user is undefined/null
  if (loading) {
    return <Loader />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} footerRef={footerRef} />
        <main className="flex-grow pt-16 sm:pt-20">
          <Outlet />
        </main>
        {location.pathname === "/" && !user && (
          <div ref={footerRef}>
            <Footer />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
