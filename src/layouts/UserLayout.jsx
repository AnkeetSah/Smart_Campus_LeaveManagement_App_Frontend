import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function UserLayout({ darkMode, setDarkMode, footerRef }) {
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} footerRef={footerRef} />
      <main className="flex-grow pt-16 sm:pt-20">
        <Outlet />
      </main>
      
    </div>
  );
}
