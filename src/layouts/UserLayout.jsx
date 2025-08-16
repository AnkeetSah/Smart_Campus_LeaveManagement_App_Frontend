import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function UserLayout({ darkMode, setDarkMode, footerRef }) {
  const location = useLocation();
  const { loading, user } = useAuthStore();

  // Wait until user loading is done
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-600 dark:text-gray-300">Loading...</span>
      </div>
    );
  }

  // Footer only on landing page AND if user is NOT logged in
  const showFooter = location.pathname === "/" && !user;

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} footerRef={footerRef} />
      <main className="flex-grow pt-16 sm:pt-20">
        <Outlet />
      </main>
      {showFooter && (
        <div ref={footerRef}>
          <Footer />
        </div>
      )}
    </>
  );
}
