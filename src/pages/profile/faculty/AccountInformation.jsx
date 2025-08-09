import React from 'react'
import { User } from 'lucide-react'

const AccountInformation = ({ user }) => {
  return (
    <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 transition-all duration-300 hover:shadow-3xl">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        Account Details
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800/60 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Account Type
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
            {user.role}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800/60 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Status
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300 shadow">
            Active
          </span>
        </div>
      </div>
    </div>
  )
}

export default AccountInformation
