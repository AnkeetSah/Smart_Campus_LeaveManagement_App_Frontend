import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaRegFileAlt,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAllStudentLeaves } from "../../hooks/useMyLeaves";
 
function FacultyDashboard() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [expandedAppIndex, setExpandedAppIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: leaveApplications = {},
    isLoading,
    isError,
  } = useAllStudentLeaves();

  const currentLeaves = leaveApplications[selectedTab] || [];
  console.log(selectedTab);
  const filteredApplications = currentLeaves.filter((app) => {
    const studentName = app?.student?.name?.toLowerCase() || "";
    const appId = app?._id?.toLowerCase() || "";
    return (
      studentName.includes(searchTerm.toLowerCase()) ||
      appId.includes(searchTerm.toLowerCase())
    );
  });

 const [isSubmitting, setIsSubmitting] = useState(false);

const handleDecisionSubmit = async () => {
  setIsSubmitting(true);
  const decidedAt = new Date().toISOString();

  const payload = {
    appId: selectedAppId,
    status: decisionType,
    comment,
    decidedAt,
    role,
  };

  try {
    await actionOnLeave(payload);
    alert("✅ Action on leave successful");
  } catch (error) {
    console.error("❌ Error taking action on leave:", error);
  } finally {
    setShowModal(false);
    setComment("");
    setSelectedAppId(null);
    setIsSubmitting(false);
  }
};


  if (isLoading) {
    return (
      <div className="text-center mt-12 text-gray-500">
        Loading applications...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-12 text-red-500">
        Failed to fetch leave applications.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* Floating background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Leave Applications
              </h2>
              <p className="text-sm text-gray-500">
                {selectedTab === "pending"
                  ? "Pending your review"
                  : selectedTab === "approved"
                  ? "Approved applications"
                  : "Rejected applications"}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
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

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
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
                    }-600 border-b-2 border-${
                      status === "approved"
                        ? "green"
                        : status === "rejected"
                        ? "red"
                        : "blue"
                    }-600`
                  : "text-gray-500 hover:text-gray-700"
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
          className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg overflow-hidden"
        >
          {filteredApplications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No {selectedTab} applications found.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((app, index) => {
                const from = new Date(app.fromDate);
                const to = new Date(app.toDate);
                const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

                return (
                  <div
                    key={app._id}
                    className="p-6 hover:bg-gray-50/50 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              app.type === "Medical"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {app.type} Leave
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            LV-{app._id}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
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
                        <p className="font-medium">
                          {app.student?.name || "Unnamed Student"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Submitted:{" "}
                          {new Date(app.createdAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>

                      {selectedTab === "pending" ? (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDecision(app._id, "approved")}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 flex items-center gap-2"
                          >
                            <FaCheck /> Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDecision(app._id, "rejected")}
                            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 flex items-center gap-2"
                          >
                            <FaTimes /> Reject
                          </motion.button>
                          <button
                            onClick={() =>
                              setExpandedAppIndex(
                                expandedAppIndex === index ? null : index
                              )
                            }
                            className="p-2 text-gray-500 hover:text-blue-600"
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
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {selectedTab === "approved" ? (
                            <>
                              <FaCheck />
                              <span className="text-sm font-medium">
                                Approved on{" "}
                                {new Date(
                                  app.decisionBy.faculty.decidedAt
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
                                className="p-2 text-gray-500 hover:text-blue-600"
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
                                  app.decisionBy.faculty.decidedAt
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
                                className="p-2 text-gray-500 hover:text-blue-600"
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
                        className="mt-4 pl-1 text-sm text-gray-600 space-y-4"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-gray-500 mb-1">
                              Reason for Leave
                            </p>
                            <p className="font-medium">{app.reason}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Submitted</p>
                            <p className="font-medium">
                              {new Date(app.createdAt).toLocaleDateString(
                                "en-IN"
                              )}
                            </p>
                          </div>
                        </div>

                        {app.documents?.length > 0 && (
                          <div>
                            <p className="text-gray-500 mb-2">Attachments</p>
                            <div className="flex flex-wrap gap-2">
                              {app.documents.map((doc, i) => (
                                <button
                                  key={i}
                                  className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                                >
                                  <FaRegFileAlt className="mr-1.5" />
                                  {doc}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {app.decisionBy?.faculty?.status === "rejected" && (
                          <p className="text-sm italic text-red-600 mt-2">
                            Comment: {app.decisionBy.faculty.comment}
                          </p>
                        )}
                        {app.decisionBy?.faculty?.status === "approved" && (
                          <p className="text-sm italic text-green-600 mt-2">
                            Comment: {app.decisionBy.faculty.comment}
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
    </div>
  );
}

export default FacultyDashboard;
