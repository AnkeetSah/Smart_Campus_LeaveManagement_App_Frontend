import { motion } from "framer-motion"
import { IoSparkles } from "react-icons/io5";
import { RiVoiceprintLine } from "react-icons/ri";
import { BsStars } from "react-icons/bs";


const BenefitSection = () => {
  return (
    <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-14 pt-10 border-t border-gray-100 dark:border-gray-700/50"
            >
              <h4 className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-gray-300 dark:bg-gray-600"></span>
                Why use voice assistant?
                <span className="h-px w-8 bg-gray-300 dark:bg-gray-600"></span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <IoSparkles className="text-3xl text-blue-500" />,
                    title: "Lightning Fast",
                    desc: "Complete in under 30 seconds",
                    bg: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20"
                  },
                  {
                    icon: <RiVoiceprintLine className="text-3xl text-purple-500" />,
                    title: "Natural Language",
                    desc: "Speak conversationally",
                    bg: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/20"
                  },
                  {
                    icon: <BsStars className="text-3xl text-amber-500" />,
                    title: "Smart Processing",
                    desc: "AI understands context and intent",
                    bg: "from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/20"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className={`bg-gradient-to-br ${item.bg} p-5 rounded-xl border border-gray-100 dark:border-gray-700/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-700/50 flex items-center justify-center mb-4 shadow-sm">
                      {item.icon}
                    </div>
                    <h5 className="font-bold text-lg text-gray-800 dark:text-white mb-2">{item.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
  )
}

export default BenefitSection