import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import api from "../../services/api";
import {
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaRegFileAlt,
  FaEdit,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAllStudentLeaves } from "../../hooks/useMyLeaves";
import useAuthStore from "../../store/useAuthStore";
const API_BASE = import.meta.env.VITE_API_URL;

import socket from "../../socket"; // ✅ import the shared socket

function AuthorityDashboard() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [expandedAppIndex, setExpandedAppIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [decisionType, setDecisionType] = useState("");
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [comment, setComment] = useState("");
  const {
    data: leaveApplications = {},
    isLoading,
    isError,
    refetch,
  } = useAllStudentLeaves();
  console.log("isloading value:", isLoading);
  const notify = () => toast("Wow so easy!");
  const [showHostelDetails, setShowHostelDetails] = useState(false);
  useEffect(() => {
    let roomId;
    // console.log(user);
    if (user.role === "faculty") {
      roomId = `${user.branch}-${user.section}`;
    } else if (user.role === "hod") {
      roomId = `hod-${user.branch}`;
    } else if (user.role === "warden") {
      roomId = `warden-${user.hostel}`;
      setShowHostelDetails(true);
      console.log(roomId);
    }
    console.log(user)

    if (roomId) {
      socket.emit("joinRoom", roomId);
      console.log(`🟢 Joined room: ${roomId}`);
    }
    // ✅ 1. For student: update status
    socket.on("leaveSubmitted", (data) => {
      console.log("📬 New leave received:", data);
      toast.success("New leave application submitted!", {
        position: "top-right",
        autoClose: 3000,
      });
      refetch();
    });

    // ✅ 2. For HOD: faculty has approved leave
    socket.on("facultyApprovedLeave", (leaveData) => {
      toast.success("Faculty approved a leave!", { position: "top-right" });
      refetch();
    });

    // ✅ 2. For Warden: hod has approved leave
    socket.on("hodApprovedLeave", (leaveData) => {
      toast.success("HOD approved a leave!", { position: "top-right" });
      refetch();
    });

    // ✅ 3. For All the Authority: who had requested for updated
    socket.on("updatedLeave", (leaveData) => {
      console.log('cdsddsdfs')
      toast.success(leaveData.message, { position: "top-right" });
      refetch();
    });

    return () => {
      socket.off("leaveSubmitted");
      socket.off("hodApprovedLeave");
      socket.off("facultyApprovedLeave");
      socket.off("updatedLeave");
    };
  }, [user?.department, user?.section, user?.role, refetch]);

  const role = user?.role;

  const currentLeaves = leaveApplications[selectedTab] || [];

  const filteredApplications = currentLeaves.filter((app) => {
    const studentName = app?.student?.name?.toLowerCase() || "";
    const appId = app?._id?.toLowerCase() || "";
    return (
      studentName.includes(searchTerm.toLowerCase()) ||
      appId.includes(searchTerm.toLowerCase())
    );
  });

  const handleDecisionSubmit = async () => {
    const decidedAt = new Date().toISOString();

    const payload = {
      appId: selectedAppId,
      status: decisionType,
      comment,
      decidedAt,
      role,
    };

    try {
      const response = await api.post("/api/leaves/actionOnLeave", payload);
      refetch();
    } catch (error) {
      console.error("❌ Error taking action on leave:", error);
      alert("❌ Failed to take action on leave");
    }

    setShowModal(false);
    setComment("");
    setSelectedAppId(null);
  };

  if (isLoading) {
    return (
      <div className="text-center min-h-dvh mt-12 text-gray-500 dark:text-gray-400">
        Loading applications...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-12 text-red-500 dark:text-red-400">
        Failed to fetch leave applications.
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans transition-colors duration-300">
      {/* Floating background blobs */}
      <div className="fixed dark:hidden inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>
      <ToastContainer />
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 mb-8 transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Leave Applications
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedTab === "pending"
                  ? "Pending your review"
                  : selectedTab === "approved"
                  ? "Approved applications"
                  : "Rejected applications"}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <FaSearch className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-10  pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">
                <FaFilter className="dark:text-gray-400" />
                Filters
              </button> */}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex  border-b border-gray-200 dark:border-gray-700 mb-6">
          {["pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedTab(status)}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === status
                  ? `text-${
                      status === "approved"
                        ? "green"
                        : status === "rejected"
                        ? "red"
                        : "blue"
                    }-600 dark:text-${
                      status === "approved"
                        ? "green"
                        : status === "rejected"
                        ? "red"
                        : "blue"
                    }-400 border-b-2 border-${
                      status === "approved"
                        ? "green"
                        : status === "rejected"
                        ? "red"
                        : "blue"
                    }-600 dark:border-${
                      status === "approved"
                        ? "green"
                        : status === "rejected"
                        ? "red"
                        : "blue"
                    }-400`
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} (
              {leaveApplications[status]?.length || 0})
            </button>
          ))}
        </div>

        {/* Leave Application List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden transition-colors duration-300"
        >
          {filteredApplications.length === 0 ? (
            <div className="min-h-96 flex flex-col items-center justify-center p-12 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm dark:bg-gray-700/50">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="text-center max-w-sm">
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  No {selectedTab} Applications
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  All caught up! There are no leave applications in this
                  category at the moment.
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-300 dark:bg-indigo-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-indigo-300 dark:bg-indigo-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-indigo-300 dark:bg-indigo-500 rounded-full"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredApplications.map((app, index) => {
                const from = new Date(app.fromDate);
                const to = new Date(app.toDate);
                const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
                {
                  console.log("app:", app);
                }
                return (
                  <div
                    key={app._id}
                    className="p-6 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              app.type === "Medical"
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                                : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
                            }`}
                          >
                            {app.type} Leave
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            LV-{app._id}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <FaCalendarAlt className="mr-1.5 opacity-70" />
                            {from.toLocaleDateString("en-IN", {
                              dateStyle: "medium",
                            })}{" "}
                            -{" "}
                            {to.toLocaleDateString("en-IN", {
                              dateStyle: "medium",
                            })}{" "}
                            ({days} day
                            {days > 1 ? "s" : ""})
                          </span>
                        </div>
                        <p className="font-medium dark:text-gray-200">
                          {app.student?.name || "Unnamed Student"}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">
                          Roll No:{" "}
                          <span className=" text-gray-500 font-medium dark:text-gray-200">
                            {app.student?.rollNumber || "N/A"}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Submitted:{" "}
                          {new Date(app.createdAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>

                      {selectedTab === "pending" ? (
                        <div className="flex flex-wrap gap-2">
                          {/* Approve Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setDecisionType("approved");
                              setSelectedAppId(app._id);
                              setShowModal(true);
                            }}
                            className="flex-1 sm:flex-none px-4 py-2 cursor-pointer bg-green-600 dark:bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-800 flex items-center justify-center gap-2"
                          >
                            <FaCheck /> Approve
                          </motion.button>

                          {/* Reject Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setDecisionType("rejected");
                              setSelectedAppId(app._id);
                              setShowModal(true);
                            }}
                            className="flex-1 sm:flex-none px-4 py-2 cursor-pointer bg-red-600 dark:bg-red-700 text-white text-sm font-medium rounded-lg hover:bg-red-700 dark:hover:bg-red-800 flex items-center justify-center gap-2"
                          >
                            <FaTimes /> Reject
                          </motion.button>

                          {/* Request Changes Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setDecisionType("changes_requested");
                              setSelectedAppId(app._id);
                              setShowModal(true);
                            }}
                            className="flex-1 sm:flex-none px-4 py-2 cursor-pointer bg-yellow-500 dark:bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-700 flex items-center justify-center gap-2"
                          >
                            <FaEdit /> Request Changes
                          </motion.button>

                          {/* Expand/Collapse Button */}
                          <button
                            className="p-2 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                            onClick={() =>
                              setExpandedAppIndex(
                                expandedAppIndex === index ? null : index
                              )
                            }
                          >
                            {expandedAppIndex === index ? (
                              <IoIosArrowUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </button>
                        </div>
                      ) : (
                        <div
                          className={`flex items-center gap-2 ${
                            selectedTab === "approved"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {selectedTab === "approved" ? (
                            <>
                              <FaCheck />
                              <span className="text-sm font-medium">
                                Approved on{" "}
                                {new Date(
                                  app.decisionBy?.[role]?.decidedAt
                                ).toLocaleDateString("en-IN", {
                                  dateStyle: "medium",
                                })}
                              </span>
                              <button
                                onClick={() =>
                                  setExpandedAppIndex(
                                    expandedAppIndex === index ? null : index
                                  )
                                }
                                className="p-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                {expandedAppIndex === index ? (
                                  <IoIosArrowUp />
                                ) : (
                                  <IoIosArrowDown />
                                )}
                              </button>
                            </>
                          ) : (
                            <>
                              <FaTimes />
                              <span className="text-sm font-medium">
                                Rejected on{" "}
                                {new Date(
                                  app.decisionBy?.[role]?.decidedAt
                                ).toLocaleDateString("en-IN", {
                                  dateStyle: "medium",
                                })}
                              </span>

                              <button
                                onClick={() =>
                                  setExpandedAppIndex(
                                    expandedAppIndex === index ? null : index
                                  )
                                }
                                className="p-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                {expandedAppIndex === index ? (
                                  <IoIosArrowUp />
                                ) : (
                                  <IoIosArrowDown />
                                )}
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Expanded Section */}
                    {expandedAppIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pl-1 text-sm text-gray-600 dark:text-gray-300 space-y-4"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                              Leave Type:{" "}
                              <span className="font-medium dark:text-gray-200">
                                {app.leaveType}
                              </span>
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                              Reason for Leave
                            </p>
                            <p className="font-medium dark:text-gray-200">
                              {app.reason}
                            </p>
                          </div>
                          <div className="flex gap-4 ">
                            <p className="text-gray-500  dark:text-gray-400 mb-1">
                              Current Attendance{" "}
                              <p className="font-medium dark:text-gray-200">
                                {app.currentAttendance}%
                              </p>
                            </p>

                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                              Attendance After Leave{" "}
                              <p className="font-medium dark:text-gray-200">
                                {app?.attendanceAfterLeave}%
                              </p>
                            </p>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 mb-1">
                            Hostel Details:
                            {showHostelDetails && (
                              <p className="text-gray-7 font-medium dark:text-gray-200 mb-1">
                                {app.student?.hostel.name || "N/A"} - Room
                                Number:{" "}
                                {app.student?.hostel.roomNumber || "N/A"}
                              </p>
                            )}
                          </div>
                        </div>

                        {app.documents?.length > 0 && (
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 mb-2">
                              Attachments
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {app.documents.map((doc) => (
                                <a
                                  key={doc}
                                  href={doc} // This is already a full Cloudinary URL
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800"
                                >
                                  <FaRegFileAlt className="mr-1.5" />
                                  Preview Document
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {app.decisionBy?.[role]?.status === "rejected" && (
                          <p className="text-sm italic text-red-600 dark:text-red-400 mt-2">
                            Comment: {app.decisionBy?.[role]?.comment}
                          </p>
                        )}
                        {app.decisionBy?.[role]?.status === "approved" && (
                          <p className="text-sm italic text-green-600 dark:text-green-400 mt-2">
                            Comment: {app.decisionBy?.[role]?.comment}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>

      {/* Decision Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
          <div className="bg-white mx-3 md:mx-0 dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-lg space-y-5 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            {/* Dynamic Modal Title */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              {decisionType === "approved" && <>✅ Approve Application</>}
              {decisionType === "rejected" && <>❌ Reject Application</>}
              {decisionType === "changes_requested" && <>✏️ Request Changes</>}
            </h3>

            {/* Comment Box */}
            <textarea
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white p-3 text-sm focus:outline-none focus:ring-2 resize-none transition-colors duration-200
        ${decisionType === "approved" && "focus:ring-green-500"}
        ${decisionType === "rejected" && "focus:ring-red-500"}
        ${decisionType === "changes_requested" && "focus:ring-yellow-500"}
      `}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 cursor-pointer text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDecisionSubmit}
                className={`px-4 py-2 text-sm font-medium cursor-pointer rounded-md text-white transition shadow-sm
          ${
            decisionType === "approved" &&
            "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
          }
          ${
            decisionType === "rejected" &&
            "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          }
          ${
            decisionType === "changes_requested" &&
            "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
          }
        `}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthorityDashboard;
