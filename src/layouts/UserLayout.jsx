import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function UserLayout({ darkMode, setDarkMode, footerRef }) {
  const location = useLocation();

  // Example: only show footer on homepage
  const showFooter = location.pathname === "/";

  return (
    <>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        footerRef={footerRef}
      />
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
