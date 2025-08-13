import React, { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion } from "framer-motion";
import { FaQrcode, FaStopCircle } from "react-icons/fa";
import api from "../../services/api";
const GuardDashboard = () => {
  const [scannedText, setScannedText] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState(null);
  const scannerRef = useRef(null);

 const startScan = async () => {
  const scanner = new Html5Qrcode("reader");

  try {
    await scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      async (decodedText) => {
        setScannedText(decodedText);
        await scanner.stop();
        setIsScanning(false);

        try {
          const response = await api.get(`/api/leaves/${decodedText}`);
          console.log(response)
          setLeaveDetails(response.data);
        } catch (err) {
          setLeaveDetails(null);
          console.error("Fetch error:", err);
        }
      },
      (errorMessage) => {
        console.warn("QR Error", errorMessage);
      }
    );

    scannerRef.current = scanner;
    setIsScanning(true);
  } catch (err) {
    console.error("Camera start error", err);
  }
};


  const stopScan = () => {
    scannerRef.current?.stop().then(() => {
      setIsScanning(false);
    }).catch((err) => {
      console.error("Stop failed", err);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans relative overflow-hidden transition-colors duration-300">

      {/* Floating Background Blobs */}
      <div className="fixed dark:hidden inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">Welcome, Guard</h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">Use the QR scanner below to verify student leave passes.</p>
        </motion.div>

        {/* Scanner Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-xl dark:shadow-gray-900/30 p-8 text-center transition-colors duration-300"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-md">
            <FaQrcode className="text-white text-4xl" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">QR Code Scanner</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">Click the button to start or stop scanning QR codes.</p>

          {!isScanning ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startScan}
              className="w-full py-3 mb-6 rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaQrcode />
              <span>Start Scanning</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={stopScan}
              className="w-full py-3 mb-6 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaStopCircle />
              <span>Stop Scanning</span>
            </motion.button>
          )}

          {/* Scanner Camera */}
          <div
            id="reader"
            className="mx-auto mb-6 rounded-lg overflow-hidden shadow dark:border dark:border-gray-600"
            style={{ width: "100%", maxWidth: "320px", height: "auto" }}
          />

          {/* Scanned QR Text */}
          {scannedText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4 mt-4 bg-white dark:bg-gray-700 rounded-lg shadow border dark:border-gray-600 text-left"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Scanned QR ID:</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 break-words">{scannedText}</p>
            </motion.div>
          )}
        </motion.div>

        {/* ✅ Leave Details Card */}
        {leaveDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow dark:shadow-gray-900/30 p-6 transition-colors duration-300"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Leave Details</h2>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li><strong className="dark:text-gray-200">Name:</strong> {leaveDetails.student?.name}</li>
              <li><strong className="dark:text-gray-200">Department:</strong>  {leaveDetails.student?.program}-{leaveDetails.student?.branch}</li>
              <li><strong className="dark:text-gray-200">Leave Type:</strong> {leaveDetails.leaveType}</li>
              <li><strong className="dark:text-gray-200">From:</strong> {new Date(leaveDetails.fromDate).toLocaleDateString()}</li>
              <li><strong className="dark:text-gray-200">To:</strong> {new Date(leaveDetails.toDate).toLocaleDateString()}</li>
              <li>
                <strong className="dark:text-gray-200">Status:</strong> 
                <span className={`ml-1 ${
                  leaveDetails.finalStatus === "approved" 
                    ? "text-green-600 dark:text-green-400" 
                    : leaveDetails.finalStatus === "rejected" 
                      ? "text-red-600 dark:text-red-400" 
                      : "text-yellow-600 dark:text-yellow-400"
                }`}>
                  {leaveDetails.finalStatus}
                </span>
              </li>
            </ul>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GuardDashboard;