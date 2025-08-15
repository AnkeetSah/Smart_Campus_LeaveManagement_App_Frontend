import React from 'react'

import { motion } from 'framer-motion'
const PreviewDoc = ({leave}) => {
  return (
    <div>
         {leave.documents.map((doc, i) => (
                    <motion.a
                      key={i}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800"
                    
                    >
                      Preview
                    </motion.a>
                  ))}
    </div>
  )
}

export default PreviewDoc