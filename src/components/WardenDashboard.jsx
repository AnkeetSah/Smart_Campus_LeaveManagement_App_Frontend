import { useState } from 'react';
import { motion } from "framer-motion";
import { RiLeafLine, RiHotelBedLine } from "react-icons/ri";
import { FaShieldAlt, FaChevronLeft, FaCalendarAlt, FaCheck, FaTimes, FaSearch, FaFilter, FaRegFileAlt, FaUserAlt } from "react-icons/fa";
import { IoMdTime, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function WardenDashboard() {
  // State management
  const [selectedTab, setSelectedTab] = useState("pending");
  const [expandedApplication, setExpandedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const leaveApplications = {
    pending: [
      {
        id: "HL-2023-1289",
        student: "Ankeet Sah (Room 205)",
        type: "Overnight",
        dates: "20-22 Dec 2023",
        days: 2,
        reason: "Family wedding in another city",
        destination: "New Delhi",
        submitted: "18 Dec 2023, 10:30 AM",
        facultyApproved: true
      },
      {
        id: "HL-2023-1275",
        student: "Priya Patel (Room 312)",
        type: "Day",
        dates: "24 Dec 2023",
        days: 1,
        reason: "Local relative visit",
        destination: "Within city",
        submitted: "17 Dec 2023, 2:15 PM",
        facultyApproved: true
      }
    ],
    approved: [
      {
        id: "HL-2023-1256",
        student: "Rahul Kumar (Room 104)",
        type: "Emergency",
        dates: "15-18 Nov 2023",
        days: 3,
        reason: "Medical emergency",
        destination: "Hospital",
        submitted: "14 Nov 2023, 9:45 AM",
        approvedOn: "14 Nov 2023, 4:30 PM"
      }
    ],
    rejected: [
      {
        id: "HL-2023-1211",
        student: "Neha Sharma (Room 408)",
        type: "Overnight",
        dates: "5-7 Nov 2023",
        days: 2,
        reason: "Friend's birthday",
        destination: "Nearby town",
        submitted: "3 Nov 2023, 11:20 AM",
        rejectedOn: "4 Nov 2023, 10:15 AM",
        rejectionReason: "Non-emergency reason during exams"
      }
    ]
  };

  // Filter applications
  const filteredApplications = leaveApplications[selectedTab].filter(app => 
    app.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle decision
  const handleDecision = (id, decision) => {
    console.log(`Hostel leave ${id} ${decision}`);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* Floating Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/70 backdrop-blur-md border-b border-white/30 py-4 px-6 flex items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow">
            <FaShieldAlt className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Hostel Warden Portal</h1>
            <p className="text-xs text-gray-600">Leave & Outpass Management</p>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-blue-600">
            <RiHotelBedLine className="text-xl" />
          </button>
          <div className="flex items-center space-x-2 bg-white/90 px-3 py-1 rounded-full border border-gray-200">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaUserAlt className="text-sm" />
            </div>
            <span className="text-sm font-medium">Warden Kumar</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Dashboard Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Hostel Leave Applications</h2>
              <p className="text-sm text-gray-500">
                {selectedTab === "pending" ? `${leaveApplications.pending.length} awaiting your action` : 
                 selectedTab === "approved" ? `${leaveApplications.approved.length} approved` : 
                 `${leaveApplications.rejected.length} rejected`}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by student or room..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                <FaFilter />
                Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Application Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setSelectedTab("pending")}
            className={`px-4 py-2 text-sm font-medium ${selectedTab === "pending" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Pending ({leaveApplications.pending.length})
          </button>
          <button
            onClick={() => setSelectedTab("approved")}
            className={`px-4 py-2 text-sm font-medium ${selectedTab === "approved" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Approved ({leaveApplications.approved.length})
          </button>
          <button
            onClick={() => setSelectedTab("rejected")}
            className={`px-4 py-2 text-sm font-medium ${selectedTab === "rejected" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Rejected ({leaveApplications.rejected.length})
          </button>
        </div>

        {/* Applications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg overflow-hidden"
        >
          {filteredApplications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No {selectedTab} applications found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((application, index) => (
                <div key={application.id} className="p-6 hover:bg-gray-50/50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          application.type === "Overnight" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {application.type} Leave
                        </span>
                        <span className="text-sm font-medium text-gray-900">HL-{application.id}</span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <FaCalendarAlt className="mr-1.5 opacity-70" />
                          {application.dates} ({application.days} night{application.days > 1 ? 's' : ''})
                        </span>
                        {application.facultyApproved && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Faculty Approved
                          </span>
                        )}
                      </div>
                      <p className="font-medium">{application.student}</p>
                      <p className="text-sm text-gray-500 mt-1">To: {application.destination}</p>
                    </div>

                    {selectedTab === "pending" ? (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDecision(application.id, "approved")}
                          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 flex items-center gap-2"
                          disabled={!application.facultyApproved}
                        >
                          <FaCheck /> Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDecision(application.id, "rejected")}
                          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 flex items-center gap-2"
                        >
                          <FaTimes /> Reject
                        </motion.button>
                        <button
                          onClick={() => setExpandedApplication(expandedApplication === index ? null : index)}
                          className="p-2 text-gray-500 hover:text-blue-600"
                        >
                          {expandedApplication === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </button>
                      </div>
                    ) : (
                      <div className={`flex items-center gap-2 ${
                        selectedTab === "approved" ? "text-green-600" : "text-red-600"
                      }`}>
                        {selectedTab === "approved" ? (
                          <>
                            <FaCheck />
                            <span className="text-sm font-medium">Approved on {application.approvedOn}</span>
                          </>
                        ) : (
                          <>
                            <FaTimes />
                            <span className="text-sm font-medium">Rejected on {application.rejectedOn}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {expandedApplication === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pl-1 text-sm text-gray-600 space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-gray-500 mb-1">Reason</p>
                          <p className="font-medium">{application.reason}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Destination</p>
                          <p className="font-medium">{application.destination}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Submitted</p>
                          <p className="font-medium">{application.submitted}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Faculty Status</p>
                          <p className={`font-medium ${
                            application.facultyApproved ? "text-green-600" : "text-red-600"
                          }`}>
                            {application.facultyApproved ? "Approved" : "Pending"}
                          </p>
                        </div>
                      </div>

                      {selectedTab === "rejected" && (
                        <div className="bg-red-50/50 border border-red-100 rounded-lg p-3">
                          <p className="text-gray-500 mb-1">Rejection Reason</p>
                          <p className="font-medium text-red-600">{application.rejectionReason}</p>
                        </div>
                      )}

                      {selectedTab === "pending" && (
                        <div className="pt-2 flex justify-end gap-3">
                          <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                            Contact Student
                          </button>
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View Room Details
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default WardenDashboard;