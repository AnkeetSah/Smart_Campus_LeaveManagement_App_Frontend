import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

import { RiLeafLine } from "react-icons/ri";
import { HeartHandshake } from "lucide-react";

// Loader Component
function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gray-900">
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

      <div className="relative w-24 h-24 mt-6 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-blue-300 border-b-blue-200 border-l-blue-400 animate-spin shadow-[0_0_25px_rgba(59,130,246,0.6)]"></div>
      </div>

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

// User Layout with session-based loader logic
export default function UserLayout({ darkMode, setDarkMode, footerRef }) {
  const location = useLocation();
  const { loading, user } = useAuthStore();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Check if loader was already shown in this tab session
    const loaderShown = sessionStorage.getItem("loaderShown");
    if (!loaderShown) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem("loaderShown", "true"); // mark as shown in this tab
      }, 1000); // minimum 1 second display
      return () => clearTimeout(timer);
    }
  }, []);

  // Show loader if app is loading or first-time loader active
  if ( showLoader) {
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
