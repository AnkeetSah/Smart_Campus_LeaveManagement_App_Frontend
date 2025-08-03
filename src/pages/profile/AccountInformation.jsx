import React from 'react'
import {User} from 'lucide-react'


const AccountInformation = ({user}) => {
  return (
   <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <User className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              Account Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Account Type
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white capitalize">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Status
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Active
                </span>
              </div>
            </div>
          </div>
  )
}

export default AccountInformation