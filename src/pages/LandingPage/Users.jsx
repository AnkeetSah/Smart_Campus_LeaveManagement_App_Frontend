// src/pages/Users.jsx
import React from "react";
import {
  FaGraduationCap,
  FaUserTie,
  FaShieldAlt,
  FaChevronRight,
  FaUserCog,
  FaQrcode,
  FaUserShield
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Users = () => {
  const userTypes = [
    {
      id: "student",
      title: "Student Portal",
      description: "Submit and track your leave applications with ease",
      icon: <FaGraduationCap className="text-white text-3xl" />,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      id: "faculty",
      title: "Faculty Portal",
      description: "Review and approve student leave requests efficiently",
      icon: <FaUserTie className="text-white text-3xl" />,
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-emerald-600 hover:to-emerald-700",
      bgLight: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
    {
      id: "hod",
      title: "HOD Portal",
      description: "Oversee department leave requests and decisions",
      icon: <FaUserCog className="text-white text-3xl" />,
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
      bgLight: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    {
      id: "warden",
      title: "Hostel Warden",
      description: "Manage hostel leave applications and approvals",
      icon: <FaShieldAlt className="text-white text-3xl" />,
      color: "from-violet-500 to-violet-600",
      hoverColor: "hover:from-violet-600 hover:to-violet-700",
      bgLight: "bg-violet-50 dark:bg-violet-900/20",
      borderColor: "border-violet-200 dark:border-violet-800",
    },
    {
      id: "guard",
      title: "Guard Scanner",
      description: "Scan QR to verify leave passes",
      icon: <FaQrcode className="text-white text-3xl" />,
      color: "from-yellow-500 to-yellow-600",
        hoverColor: "hover:from-yellow-600 hover:to-yello-700",
      bgLight: "bg-yellow-50 dark:bg-gray-800/20",
      borderColor: "border-gray-200 dark:border-gray-700",
    },
    {
  id: "admin",
  title: "Admin Portal",
  description: "Supervise and manage all users and leave workflows",
  icon: <FaUserShield className="text-white text-3xl" />,
  color: "from-red-500 to-red-600",
  hoverColor: "hover:from-red-600 hover:to-red-700",
  bgLight: "bg-red-50 dark:bg-red-900/20",
  borderColor: "border-red-200 dark:border-red-800",
}

  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {userTypes.map((user) => (
        <div
          key={user.id}
          className={`relative ${user.bgLight}  backdrop-blur-sm border ${user.borderColor} shadow-sm rounded-2xl overflow-hidden transition-colors duration-300`}
        >
          <div className="p-8 pt-10">
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${user.color} flex items-center justify-center shadow-md`}
            >
              {user.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {user.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{user.description}</p>

            <Link to={`/login/${user.id}`}>
              <div
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${user.color} ${user.hoverColor} text-white text-lg font-medium flex items-center justify-center space-x-2 hover:scale-105 transition`}
              >
                <span>Access Portal</span>
                <FaChevronRight className="text-sm" />
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;