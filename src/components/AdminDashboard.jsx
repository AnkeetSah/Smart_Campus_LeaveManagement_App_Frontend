import { motion } from "framer-motion";
import { FaUserTie, FaUsersCog, FaFileAlt, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAddUser = () => navigate("/admin/add-user");
  const handleViewLeaves = () => navigate("/admin/leaves");
  const handleViewGuards = () => navigate("/admin/guards");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans relative overflow-hidden">

      {/* Floating Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Content */}
      <main className="z-10 relative mx-auto px-4 py-8 md:py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          Admin Control Panel
        </motion.h1>

        {/* Grid Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Add User */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6 text-center transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
              <FaUsersCog className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Add Users</h3>
            <p className="text-gray-600 mb-4">Register faculty, HOD, guards or students.</p>
            <button
              onClick={handleAddUser}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition"
            >
              Add Now
            </button>
          </motion.div>

          {/* View Leave Requests */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6 text-center transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-md">
              <FaFileAlt className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">All Leave Requests</h3>
            <p className="text-gray-600 mb-4">Track & manage every leave in the system.</p>
            <button
              onClick={handleViewLeaves}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition"
            >
              View All
            </button>
          </motion.div>

          {/* Guards Management */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6 text-center transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white shadow-md">
              <FaUserTie className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Manage Guards</h3>
            <p className="text-gray-600 mb-4">Assign, remove, and track scanning activity.</p>
            <button
              onClick={handleViewGuards}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-teal-700 transition"
            >
              View Guards
            </button>
          </motion.div>

          {/* Analytics Section (optional) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6 text-center transition-all duration-300 relative overflow-hidden col-span-2"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md">
              <FaChartBar className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Analytics</h3>
            <p className="text-gray-600 mb-4">View overall leave trends, top users, and department stats.</p>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition">
              View Reports
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
