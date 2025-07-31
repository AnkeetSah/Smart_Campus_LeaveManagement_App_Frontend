import React from 'react'
import { Check, X } from "lucide-react";


const StrengthGuide = ({checks}) => {
    
  return (
   <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`flex items-center gap-1.5 ${checks.length ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {checks.length ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  8+ characters
                </div>
                <div className={`flex items-center gap-1.5 ${checks.uppercase ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {checks.uppercase ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  Uppercase
                </div>
                <div className={`flex items-center gap-1.5 ${checks.lowercase ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {checks.lowercase ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  Lowercase
                </div>
                <div className={`flex items-center gap-1.5 ${checks.number ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {checks.number ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  Number
                </div>
                <div className={`flex items-center gap-1.5 ${checks.special ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'} col-span-2`}>
                  {checks.special ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  Special character (!@#$...)
                </div>
              </div>
  )
}

export default StrengthGuide