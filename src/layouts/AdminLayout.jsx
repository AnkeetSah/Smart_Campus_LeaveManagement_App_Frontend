// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Admin/Sidebar";
import Topbar from "../pages/Admin/Topbar";
import React, { useState } from "react";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen)
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop and toggled state on mobile */}
      <div
        className={`fixed md:relative z-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 md:hidden bg-black/20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-grow bg-gray-100 p-4">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}