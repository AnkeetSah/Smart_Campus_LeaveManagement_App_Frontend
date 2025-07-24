import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight as FaChevronNext } from "react-icons/fa";
import LeaveTrackerCard from "../components/LeaveTrackerCard";

const LeaveStatusTracker = () => {
  const leaveApplications = [
    {
      id: "LV-2023-1256",
      type: "Medical Leave",
      from: "15 Nov 2023",
      to: "18 Nov 2023",
      reason: "Fever and doctor recommended rest",
      status: "pending",
      currentStage: "warden",
      attendanceImpact: "Attendance will drop from 82% to 79%",
      stages: [
        { id: "faculty", name: "Faculty Approval", status: "approved", approvedOn: "14 Nov 2023", approvedBy: "Prof. Sharma" },
        { id: "warden", name: "Warden Approval", status: "pending", expectedTime: "Within 24 hours" },
        { id: "hod", name: "HOD Approval", status: "pending" }
      ]
    },
    {
      id: "LV-2023-1290",
      type: "Casual Leave",
      from: "01 Jan 2024",
      to: "03 Jan 2024",
      reason: "Family function",
      status: "pending",
      currentStage: "faculty",
      attendanceImpact: "Attendance will drop from 84% to 81%",
      stages: [
        { id: "faculty", name: "Faculty Approval", status: "pending", expectedTime: "Within 12 hours" },
        { id: "warden", name: "Warden Approval", status: "pending" },
        { id: "hod", name: "HOD Approval", status: "pending" }
      ]
    },
    {
      id: "LV-2024-0101",
      type: "Emergency Leave",
      from: "10 Feb 2024",
      to: "12 Feb 2024",
      reason: "Urgent home visit",
      status: "pending",
      currentStage: "hod",
      attendanceImpact: "Attendance will drop from 90% to 87%",
      stages: [
        { id: "faculty", name: "Faculty Approval", status: "approved", approvedOn: "09 Feb 2024", approvedBy: "Prof. Mehta" },
        { id: "warden", name: "Warden Approval", status: "approved", approvedOn: "09 Feb 2024", approvedBy: "Mr. Rana" },
        { id: "hod", name: "HOD Approval", status: "pending", expectedTime: "Within 6 hours" }
      ]
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 2;

  // Filter leave applications by type (case-insensitive)
  const filteredLeaves = leaveApplications.filter((leave) =>
    leave.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLeaves = filteredLeaves.slice(startIndex, startIndex + itemsPerPage);

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 bg-white/70 backdrop-blur-md border-b border-white/30 py-4 px-6 flex items-center shadow-sm">
        <motion.button className="mr-4 p-2 rounded-full hover:bg-gray-100">
          <FaChevronLeft className="text-gray-600" />
        </motion.button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow">
            <RiLeafLine className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Leave Status</h1>
            <p className="text-xs text-gray-600">Track all your leave applications</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by leave type (e.g., Medical)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 after search
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Leave Cards */}
        {currentLeaves.length > 0 ? (
          currentLeaves.map((leave, i) => (
            <LeaveTrackerCard key={i} leaveData={leave} />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-12">No matching leave found.</div>
        )}

        {/* Pagination Controls */}
        {filteredLeaves.length > 0 && (
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next <FaChevronNext />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default LeaveStatusTracker;
