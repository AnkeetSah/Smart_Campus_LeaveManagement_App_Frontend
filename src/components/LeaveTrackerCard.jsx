// src/components/LeaveTrackerCard.jsx
import { motion } from "framer-motion";
import { RiLeafLine } from "react-icons/ri";
import { FaUserTie, FaShieldAlt, FaUniversity, FaClock, FaCheck } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const LeaveTrackerCard = ({ leaveData }) => {
  const getStageIcon = (stage) => {
    switch (stage.id) {
      case "faculty": return <FaUserTie className="text-lg" />;
      case "warden": return <FaShieldAlt className="text-lg" />;
      case "hod": return <FaUniversity className="text-lg" />;
      default: return <FaUserTie className="text-lg" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <FaCheck className="text-green-500" />;
      case "rejected": return <span className="text-red-500">✕</span>;
      case "pending": return <IoMdTime className="text-yellow-500" />;
      default: return <FaClock className="text-gray-400" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg overflow-hidden mb-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">Application #{leaveData.id}</h2>
            <p className="text-sm opacity-90">{leaveData.type}</p>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium capitalize">
            {leaveData.status === "pending" ? "In Progress" : leaveData.status}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Leave Period</h3>
            <p className="font-medium">{leaveData.from} to {leaveData.to}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Reason</h3>
            <p className="font-medium">{leaveData.reason}</p>
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">{leaveData.attendanceImpact}</p>
        </div>

        {/* Stages */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Approval Progress</h2>
          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
            <ul className="space-y-8">
              {leaveData.stages.map((stage) => (
                <li key={stage.id} className="relative">
                  <div className="flex items-start">
                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                      stage.status === "approved" ? "bg-green-100 text-green-600" :
                      stage.id === leaveData.currentStage ? "bg-blue-100 text-blue-600 animate-pulse" :
                      "bg-gray-100 text-gray-400"
                    }`}>
                      {getStageIcon(stage)}
                    </div>

                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium ${
                          stage.status === "approved" ? "text-green-600" :
                          stage.id === leaveData.currentStage ? "text-blue-600" :
                          "text-gray-500"
                        }`}>{stage.name}</h3>

                        <div className="flex items-center">
                          {getStatusIcon(stage.status)}
                          <span className={`ml-1 text-xs capitalize ${
                            stage.status === "approved" ? "text-green-600" :
                            stage.status === "pending" ? "text-yellow-600" :
                            "text-gray-500"
                          }`}>
                            {stage.status}
                          </span>
                        </div>
                      </div>

                      {stage.status === "approved" && (
                        <p className="mt-1 text-xs text-gray-500">By {stage.approvedBy} on {stage.approvedOn}</p>
                      )}

                      {stage.status === "pending" && stage.expectedTime && (
                        <div className="mt-1 text-xs text-yellow-600 flex items-center">
                          <IoMdTime className="mr-1" />
                          <span>{stage.expectedTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeaveTrackerCard;
