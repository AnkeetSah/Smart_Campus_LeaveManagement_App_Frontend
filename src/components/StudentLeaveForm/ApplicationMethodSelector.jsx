import React, { useEffect, useState } from 'react'
import { Mic, FileText, ArrowRight, Clock, User, CheckCircle, Sparkles } from 'lucide-react'
import ApplyLeaveHeader from './ApplyLeaveHeader';
import useLeaveFormStore from '../../store/useLeaveFormStore';



const ApplicationMethodSelector = () => {
  const closeForm = useLeaveFormStore((state) => state.closeForm);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const methods = [
    {
      id: 'voice',
      title: 'AI Voice Assistant',
      subtitle: 'Smart & Conversational',
      description: 'Experience our advanced AI voice agent that understands natural speech and guides you through the application process seamlessly.',
      icon: Mic,
      color: 'from-violet-600 to-purple-600',
      hoverColor: 'from-violet-700 to-purple-700',
      features: ['Natural conversation', 'Real-time guidance', 'Voice recognition'],
      estimatedTime: '2-3 minutes',
      recommended: true,
      action: () => console.log('Starting voice agent')
    },
    {
      id: 'manual',
      title: 'Traditional Form',
      subtitle: 'Complete Control',
      description: 'Fill out our comprehensive digital form with full control over every detail of your leave application.',
      icon: FileText,
      color: 'from-blue-600 to-cyan-600',
      hoverColor: 'from-blue-700 to-cyan-700',
      features: ['Step-by-step form', 'Save progress', 'Detailed options'],
      estimatedTime: '5-7 minutes',
      recommended: false,
      action: () => console.log('Opening manual form')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br px-2  from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 font-sans relative overflow-hidden transition-all duration-500">
      {/* Animated background elements */}
      <ApplyLeaveHeader closeForm={closeForm} />
      

     

      <div className="relative z-10 pt-2 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Choose Your Preferred Method</span>
            </div>
            
           
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Select your preferred application method below. Both options ensure your request is processed efficiently and securely.
            </p>
          </div>

           

          {/* Method Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {methods.map((method) => {
              const IconComponent = method.icon;
              const isHovered = hoveredCard === method.id;
              const isSelected = selectedMethod === method.id;
              
              return (
                <div
                  key={method.id}
                  className={`relative group  cursor-pointer transition-all duration-500 transform ${
                    isHovered ? 'scale-[1.02]' : 'hover:scale-[1.02]'
                  }`}
                  onMouseEnter={() => setHoveredCard(method.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  {/* Recommendation Badge */}
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
                  <div className={`relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border transition-all duration-500 ${
                    isSelected 
                      ? 'border-blue-500 dark:border-blue-400 shadow-2xl shadow-blue-500/25' 
                      : 'border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}>
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative p-8">
                      {/* Icon and Title */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${isHovered ? method.hoverColor : method.color} flex items-center justify-center shadow-lg transition-all duration-300 ${
                          isHovered ? 'scale-110 ' : ''
                        }`}>
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
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Features:</h4>
                        <div className="space-y-2">
                          {method.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
                          method.action();
                        }}
                        className={`w-full group/btn relative overflow-hidden rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 ${
                          isSelected || isHovered
                            ? `bg-gradient-to-r ${method.color} shadow-lg transform scale-105`
                            : `bg-gradient-to-r ${method.color} hover:shadow-lg`
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {method.id === 'voice' ? 'Start Voice Session' : 'Open Form'}
                          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                            isHovered ? 'translate-x-1' : ''
                          }`} />
                        </span>
                        
                        {/* Button hover effect */}
                        <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Information */}
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
                  Our AI Voice Assistant is perfect for quick applications and provides an interactive experience. 
                  Choose the Manual Form if you prefer detailed control over your application or need to attach multiple documents.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Secure & encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Auto-save progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>24/7 support available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent dark:from-gray-950 dark:via-gray-950/50 pointer-events-none"></div>
    </div>
  )
}

export default ApplicationMethodSelector