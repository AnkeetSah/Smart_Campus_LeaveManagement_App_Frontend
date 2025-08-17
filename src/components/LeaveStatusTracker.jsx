import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight as FaChevronNext } from "react-icons/fa";
import LeaveTrackerCard from "../components/LeaveTrackerCard";
import useLeaveFormStore from "../store/useLeaveFormStore";
import { useMyLeaves } from "../hooks/useMyLeaves";
import socket from "../socket";
import dayjs from "dayjs";

const LeaveStatusTracker = () => {
  const { closeLeaveStatus } = useLeaveFormStore();
  const { data: leaves, isLoading, isError, refetch } = useMyLeaves("pending");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 2;

  useEffect(() => {
    const handleLeaveStatusUpdated = () => {
      console.log("🔄 Leave status updated, refetching...");
      refetch();
    };

    socket.on("leaveStatusUpdated", handleLeaveStatusUpdated);

    // Cleanup the listener on unmount
    return () => {
      socket.off("leaveStatusUpdated", handleLeaveStatusUpdated);
    };
  }, [refetch]);

  // Transform API data to match the expected format
  const transformLeaveData = (apiLeaves) => {
    if (!apiLeaves || !Array.isArray(apiLeaves)) return [];

    return apiLeaves.map((leave) => {
      // Debug: Log the leave data to see what's available
       console.log("Leave data:", leave); 
      // console.log("fromDate:", leave.fromDate);
      // console.log("toDate:", leave.toDate);

      // Format dates
      const formatDate = (dateString) => {
        if (!dateString) {
          console.log("No date string provided:", dateString);
          return "N/A";
        }
        const date = new Date(dateString);
        // Check if date is valid
        if (isNaN(date.getTime())) {
          console.log("Invalid date:", dateString);
          return "Invalid Date";
        }

        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      };

      // Determine current stage based on decisionBy status (faculty → hod → warden)
      const getCurrentStage = (decisionBy) => {
        if (!decisionBy) return "faculty";
        if (decisionBy.faculty?.status === "pending"||decisionBy.faculty?.status === "changes_requested") return "faculty";
        if (decisionBy.hod?.status === "pending") return "hod";
        if (decisionBy.warden?.status === "pending") return "warden";
        return "completed";
      };

      // Create stages array (faculty → hod → warden)
      const createStages = (decisionBy) => {
        const stages = [];
    
        // Faculty stage
        stages.push({
          id: "faculty",
          name: "Faculty Approval",
          status: decisionBy.faculty?.status || "pending",
          comment:decisionBy.faculty?.comment,
          approvedOn:
            decisionBy.faculty?.status === "approved"|| decisionBy.faculty?.status === "changes_requested"  &&
            decisionBy?.faculty?.decidedAt
              ? dayjs(decisionBy.faculty?.decidedAt).format(
                  "DD MMMM YYYY, hh:mm A"
                )
              : undefined,
          approvedBy:
            decisionBy.faculty?.status === "approved"
              ? decisionBy.faculty?.name
              : undefined,
          expectedTime:
            decisionBy.faculty?.status === "pending"
              ? "Within 12 hours"
              : undefined,
        });

        // HOD stage
        stages.push({
          id: "hod",
          name: "HOD Approval",
          status: decisionBy.hod?.status || "pending",
           comment:decisionBy.hod?.comment,
          approvedOn:
            decisionBy?.hod?.status === "approved" && decisionBy?.hod?.decidedAt
              ? dayjs(decisionBy.hod?.decidedAt).format(
                  "DD MMMM YYYY, hh:mm A"
                )
              : undefined,
          approvedBy:
            decisionBy.hod?.status === "approved"
              ? decisionBy.hod?.name
              : undefined,
          expectedTime:
            decisionBy.hod?.status === "pending" ? "Within 6 hours" : undefined,
        });

        // Warden stage
        stages.push({
          id: "warden",
          name: "Warden Approval",
          status: decisionBy.warden?.status || "pending",
           comment:decisionBy.warden?.comment,
          approvedOn:
            decisionBy.warden?.status === "approved" && decisionBy.warden?.date
              ? formatDate(decisionBy.warden.date)
              : undefined,
          approvedBy:
            decisionBy.warden?.status === "approved"
              ? decisionBy.warden?.name
              : undefined,
          expectedTime:
            decisionBy.warden?.status === "pending"
              ? "Within 24 hours"
              : undefined,
        });

        return stages;
      };

      // Calculate attendance impact
      const attendanceImpact = leave.attendanceAfterLeave
        ? `Attendance will drop from ${leave.currentAttendance}% to ${leave.attendanceAfterLeave}%`
        : `Current attendance: ${leave.currentAttendance}%`;

      // Capitalize leave type
      const capitalizeLeaveType = (type) => {
        return (
          type
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ") + " Leave"
        );
      };

      return {
        _id: leave._id,
        leaveType: capitalizeLeaveType(leave.leaveType || "unknown"),
        fromDate: formatDate(leave.fromDate),
        toDate: formatDate(leave.toDate),
        reason: leave.reason || "No reason provided",
        status: leave.finalStatus || "unknown",
        currentStage: getCurrentStage(leave.decisionBy || {}),
        attendanceImpact: attendanceImpact,
        stages: createStages(leave.decisionBy || {}),
      };
    });
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans relative overflow-hidden">
        <header className="relative z-10 py-4 px-6 flex items-center">
          <motion.button
            onClick={closeLeaveStatus}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <FaChevronLeft className="text-gray-600" />
          </motion.button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow">
              <RiLeafLine className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Leave  Status</h1>
              <p className="text-xs text-gray-600">
                Track all your leave applications
              </p>
            </div>
          </div>
        </header>
        <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center text-gray-500 mt-12">
            Loading your leave applications...
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans relative overflow-hidden">
        <header className="relative z-10 py-4 px-6 flex items-center">
          <motion.button
            onClick={closeLeaveStatus}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <FaChevronLeft className="text-gray-600" />
          </motion.button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow">
              <RiLeafLine className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Leave Status</h1>
              <p className="text-xs text-gray-600">
                Track all your leave applications
              </p>
            </div>
          </div>
        </header>
        <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center text-red-500 mt-12">
            Error loading leave applications.
            <button
              onClick={() => refetch()}
              className="ml-2 text-blue-600 underline hover:text-blue-800"
            >
              Try again
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Transform the API data
  const transformedLeaves = transformLeaveData(leaves);

  // Filter leave applications by type (case-insensitive)
  const filteredLeaves = transformedLeaves.filter((leave) =>
    leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLeaves = filteredLeaves.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 py-4 px-6 flex items-center">
        <motion.button
          onClick={closeLeaveStatus}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FaChevronLeft className="text-gray-600" />
        </motion.button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow">
            <RiLeafLine className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Leave Status</h1>
            <p className="text-xs text-gray-600">
              Track all your leave applications
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by leave type..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Leave Cards */}
        {currentLeaves.length > 0 ? (
          currentLeaves.map((leave, i) => (
            <LeaveTrackerCard key={leave._id} leaveData={leave} />
          ))
        ) : (
         <div className="flex flex-col items-center justify-center mt-12 p-6 bg-gray-50 rounded-lg shadow-sm max-w-md mx-auto">
  <svg 
    className="w-12 h-12 text-gray-400 mb-4" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={1.5} 
      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
  <h3 className="text-lg font-medium text-gray-700 mb-2">
    {transformedLeaves.length === 0
      ? "You don't have any active leave requests"
      : "No matching leave found"}
  </h3>
  <p className="text-gray-500 mb-4">
    {transformedLeaves.length === 0
      ? "Please check your leave history for past requests"
      : "Try adjusting your search criteria"}
  </p>
  {transformedLeaves.length === 0 && (
    <button 
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      onClick={() => navigateToLeaveHistory()} // Replace with your actual navigation function
    >
      View Leave History
    </button>
  )}
</div>
        )}

        {/* Pagination Controls */}
        {filteredLeaves.length > itemsPerPage && (
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
