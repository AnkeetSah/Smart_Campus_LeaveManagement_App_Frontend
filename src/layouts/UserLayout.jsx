import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import EnhancedLoadingScreen from "./EnhancedLoadingScreen";

export default function UserLayout({ darkMode, setDarkMode, footerRef }) {
  const location = useLocation();
  const { loading, user } = useAuthStore();
  const [sessionLoadComplete, setSessionLoadComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('sessionLoadComplete');
    
    if (!hasLoaded) {
      sessionStorage.setItem('sessionLoadComplete', 'true');
      setShowContent(false); // Hide content until loading completes
    } else {
      setSessionLoadComplete(true);
      setShowContent(true); // Show content immediately if already loaded
    }
  }, []);

  const handleLoaderComplete = () => {
    setSessionLoadComplete(true);
    setShowContent(true); // Reveal content only after loading completes
  };

  const showLoader = !sessionLoadComplete && !loading;

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <EnhancedLoadingScreen 
            onComplete={handleLoaderComplete}
            key="loader"
          />
        ) : showContent ? (
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
        ) : null}
      </AnimatePresence>
    </>
  );
}