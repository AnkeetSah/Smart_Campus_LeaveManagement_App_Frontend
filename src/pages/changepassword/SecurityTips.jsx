import React from 'react'
import { Shield } from "lucide-react";
const SecurityTips = () => {
  return (
   <div className="mt-8 p-4 bg-blue-50/70 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" strokeWidth={2} />
            Security Tips
          </h3>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1.5">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 mt-1.5 flex-shrink-0"></div>
              <span>Use a unique password </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 mt-1.5 flex-shrink-0"></div>
              <span>Consider using a password manager</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 mt-1.5 flex-shrink-0"></div>
              <span>Never share your password with anyone</span>
            </li>
          </ul>
        </div>
  )
}

export default SecurityTips