// src/pages/LandingPage.jsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";
import Users from "./Users";
import GuidelineCard from "./GuidelineCard";
import Footer from "../../components/Footer";
function LandingPage() {
  //move to the bottom when help is cliked
  const footerRef = useRef(null);
  
  const handleHelpClick = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <div className="min-h-screen
      bg-gradient-to-br   from-slate-100 via-blue-100 to-indigo-200 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 
      font-sans relative overflow-hidden transition-all duration-500">
       {/* Floating Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative container mx-auto px-4 py-16 z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Leave Management System
              </span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
            >
              Streamlined leave management for the entire university community
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto"
            />
          </motion.div>

          {/* User Cards */}
          <Users/>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-lg"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                <FaUniversity className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                University Guidelines
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <GuidelineCard
                number="1"
                title="For Students:"
                color="blue"
                points={[
                  <>
                    Submit leave applications at least <strong>24 hours in advance</strong> for planned absences.
                  </>,
                  <>
                    In case of <strong>medical or emergency leave</strong>, submit supporting documents <strong>within 48 hours</strong> after the leave ends.
                  </>,
                  <>
                    Ensure that your overall attendance remains <strong>above 80%</strong> to avoid disqualification from semester examinations.
                  </>,
                  <>
                    If your attendance is below 80% due to medical reasons, request an <strong>attendance waiver</strong> by selecting approved medical leaves — no need to upload documents again.
                  </>
                ]}
              />

              <GuidelineCard
                number="2"
                title="For Faculty & Wardens:"
                color="emerald"
                points={[
                  <>
                    Review all submitted leave applications within <strong>24 hours</strong> to ensure timely decision-making.
                  </>,
                  <>
                    Provide <strong>clear justification</strong> for any rejected application, especially when academic performance is affected.
                  </>,
                  <>
                    In case of medical or emergency leave, ensure that <strong>supporting documents</strong> are verified before final approval.
                  </>,
                  <>
                    Use the <strong>mobile portal</strong> for emergency approvals to maintain response time during off-campus hours.
                  </>
                ]}
              />
            </div>
          </motion.div>
        </div>
      </main>
      <div ref={footerRef}>
        <Footer onHelpClick={handleHelpClick} />
      </div>
      
      
    </div>
  );
}

export default LandingPage;