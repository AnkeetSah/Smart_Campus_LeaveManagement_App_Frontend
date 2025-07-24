import { motion } from "framer-motion"

const TopFilter = ({leaves, leaveHistoryStatus, setLeaveHistoryStatus}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 mb-8 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Your Leave Records</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {leaves.length} applications found
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={leaveHistoryStatus}
            onChange={(e) => setLeaveHistoryStatus(e.target.value)}
            className="text-sm cursor-pointer border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
            <option value="">All</option>
          </select>
          <button className="text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg px-4 py-2 transition-colors duration-200">
            Export
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TopFilter