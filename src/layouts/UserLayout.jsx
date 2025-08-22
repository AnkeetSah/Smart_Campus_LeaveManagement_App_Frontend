import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

// Simple custom loader component
function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}

export default function UserLayout({ darkMode, setDarkMode, footerRef }) {
  const location = useLocation();
  const { loading, user } = useAuthStore();

  // Show loader while loading or user is undefined/null
  if (loading || user === undefined) {
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
