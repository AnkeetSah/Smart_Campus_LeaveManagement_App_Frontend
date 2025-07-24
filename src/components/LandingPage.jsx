import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUserTie,
  FaShieldAlt,
  FaCalendarAlt,
  FaChevronRight,
  FaHeadset,
  FaUniversity,
} from "react-icons/fa";
import { RiLeafLine } from "react-icons/ri";

function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const userTypes = [
    {
      id: "student",
      title: "Student Portal",
      description: "Submit and track your leave applications with ease",
      icon: <FaGraduationCap className="text-white text-3xl" />,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      bgLight: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "faculty",
      title: "Faculty Portal",
      description: "Review and approve student leave requests efficiently",
      icon: <FaUserTie className="text-white text-3xl" />,
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-emerald-600 hover:to-emerald-700",
      bgLight: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      id: "warden",
      title: "Hostel Warden",
      description: "Manage hostel leave applications and approvals",
      icon: <FaShieldAlt className="text-white text-3xl" />,
      color: "from-violet-500 to-violet-600",
      hoverColor: "hover:from-violet-600 hover:to-violet-700",
      bgLight: "bg-violet-50",
      borderColor: "border-violet-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative container mx-auto px-4 py-6 z-10">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
              <RiLeafLine className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                University Leave Portal
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Academic Year 2024-25
              </p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-all"
          >
            <FaHeadset className="text-blue-600" />
            <span>Help & Support</span>
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-16 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Leave Management System
              </span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto"
            >
              Streamlined leave management for the entire university community
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto"
            />
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {userTypes.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                className={`relative ${user.bgLight} backdrop-blur-sm border ${
                  user.borderColor
                } shadow-sm rounded-2xl overflow-hidden transition-all duration-300 ${
                  hoveredCard === user.id ? "shadow-lg" : ""
                }`}
                onMouseEnter={() => setHoveredCard(user.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-white/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="p-8 pt-10">
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${
                      user.color
                    } flex items-center justify-center shadow-md transition-transform ${
                      hoveredCard === user.id ? "scale-110 rotate-3" : ""
                    }`}
                  >
                    {user.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {user.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{user.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 rounded-xl bg-gradient-to-r ${user.color} ${user.hoverColor} text-white text-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2`}
                  >
                    <span className="cursor-pointer">Access Portal</span>
                    <FaChevronRight className="text-sm" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-lg"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <FaUniversity className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                University Guidelines
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-sm">
                    1
                  </span>
                  For Students:
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Submit leave applications at least 24 hours in advance
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Emergency leaves require documentation within 48 hours
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Maximum 10 days per semester for non-medical leaves
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-2 text-sm">
                    2
                  </span>
                  For Faculty & Wardens:
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    Review applications within 48 hours of submission
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    Provide clear reasons for rejected applications
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    Emergency approvals available via mobile portal
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-blue-300 via-blue-200 to-indigo-50 py-12 mt-24 z-10 border-t border-gray-200/50">
        <div className="absolute -top-6 left-0 right-0 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <RiLeafLine className="text-white text-2xl" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
                <RiLeafLine className="text-white text-lg" />
              </div>
              <span className="font-semibold text-lg text-gray-800">
                University Leave Management
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h4 className="text-blue-600 font-medium mb-3">Quick Links</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-600 text-black font-semibold transition"
                    >
                      Student Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-600 text-black transition"
                    >
                      Faculty Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-600 text-black transition"
                    >
                      Warden Login
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-blue-600 font-medium mb-3">Resources</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-600  text-black  transition"
                    >
                      User Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-600  text-black  transition"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-600 text-black  transition"
                    >
                      Policy
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-blue-600 font-medium mb-3">Contact</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center justify-center md:justify-start">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    support@university.edu
                  </li>
                  <li className="flex items-center justify-center md:justify-start">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                    +91-XXXX-XXXXXX
                  </li>
                  <li className="flex items-center justify-center md:justify-start">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    Admin Block, Room 12
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200/50 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 University Leave Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
