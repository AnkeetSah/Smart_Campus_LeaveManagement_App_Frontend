import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EnhancedLoadingScreen from "./EnhancedLoadingScreen";

export default function UserLayout({ darkMode, setDarkMode, footerRef }) {
  const location = useLocation();
  const { loading, user } = useAuthStore();
  const [loaderCompleted, setLoaderCompleted] = useState(false);

  // Show loader until both conditions are met:
  // 1. Authentication loading is complete
  // 2. Loading screen animation has completed
  const showLoader = loading || !loaderCompleted;

  return (
    <>
      <AnimatePresence>
        {showLoader ? (
          <EnhancedLoadingScreen 
            onComplete={() => setLoaderCompleted(true)}
            key="loader"
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
        )}
      </AnimatePresence>
    </>
  );
}