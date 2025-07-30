// src/layouts/UserLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout({ darkMode, setDarkMode, footerRef }) {
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} footerRef={footerRef} />
      <main className="flex-grow pt-16 sm:pt-20">
        <Outlet />
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
