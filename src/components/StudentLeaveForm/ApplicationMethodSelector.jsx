import React, { useEffect, useState } from "react";
import { Mic, FileText, ArrowRight, Clock, User, CheckCircle, Sparkles } from "lucide-react";
import ApplyLeaveHeader from "./ApplyLeaveHeader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ApplicationMethodSelector = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const methods = [
    {
      id: "voice",
      title: "AI Voice Assistant",
      subtitle: "Smart & Conversational",
      description:
        "Experience our advanced AI voice agent that understands natural speech and guides you through the application process seamlessly.",
      icon: Mic,
      color: "from-violet-600 to-purple-600",
      hoverColor: "from-violet-700 to-purple-700",
      features: ["Natural conversation", "Real-time guidance", "Voice recognition"],
      estimatedTime: "2-3 minutes",
      recommended: true,
      route: "/dashboard/student/apply-leave/voice",
      buttonText: "Start Voice Session",
    },
    {
      id: "manual",
      title: "Traditional Form",
      subtitle: "Complete Control",
      description:
        "Fill out our comprehensive digital form with full control over every detail of your leave application.",
      icon: FileText,
      color: "from-blue-600 to-cyan-600",
      hoverColor: "from-blue-700 to-cyan-700",
      features: ["Step-by-step form", "Save progress", "Detailed options"],
      estimatedTime: "5-7 minutes",
      recommended: false,
      route: "/dashboard/student/apply-leave/manual",
      buttonText: "Open Form",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen
    bg-gradient-to-br 
from-blue-200 via-sky-200 to-indigo-300 
dark:from-gray-950 dark:via-gray-900 dark:to-indigo-900 
      font-sans relative overflow-hidden transition-all duration-500">
      <ApplyLeaveHeader url="/dashboard/student" content="Apply for Leave" />

      <div className="relative z-10 pt-2 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Choose Your Preferred Method
              </span>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Select your preferred application method below. Both options ensure your request is processed efficiently and securely.
            </motion.p>
          </div>

          {/* Method Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {methods.map((method, index) => {
              const IconComponent = method.icon;
              const isHovered = hoveredCard === method.id;

              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-[1.02]`}
                  onMouseEnter={() => setHoveredCard(method.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => navigate(method.route)}
                >
                  {method.recommended && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Recommended
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border transition-all duration-500 hover:border-gray-300 dark:hover:border-gray-600">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>

                    <div className="relative p-8">
                      {/* Icon and Title */}
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                            isHovered ? method.hoverColor : method.color
                          } flex items-center justify-center shadow-lg transition-all duration-300`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{method.estimatedTime}</span>
                        </div>
                      </div>

                      {/* Title and Subtitle */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {method.title}
                        </h3>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {method.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {method.description}
                      </p>

                      {/* Features */}
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Key Features:
                        </h4>
                        <div className="space-y-2">
                          {method.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(method.route);
                        }}
                        className={`w-full rounded-xl py-4 px-6 font-semibold text-white bg-gradient-to-r ${method.color} transition-all duration-300 hover:shadow-lg`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {method.buttonText}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300" />
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Additional Info Section */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Need Help Choosing?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our AI Voice Assistant is perfect for quick applications and provides an interactive experience. Choose the Manual Form if you prefer detailed control over your application or need to attach multiple documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent dark:from-gray-950 dark:via-gray-950/50 pointer-events-none"></div>
    </div>
  );
};

export default ApplicationMethodSelector;
