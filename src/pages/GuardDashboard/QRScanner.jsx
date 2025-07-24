import React, { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion } from "framer-motion";
import { FaQrcode, FaStopCircle } from "react-icons/fa";

const QRScanner = () => {
  const [scannedText, setScannedText] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  const startScan = async () => {
    const scanner = new Html5Qrcode("reader");

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setScannedText(decodedText);
          scanner.stop();
          setIsScanning(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans relative overflow-hidden">
      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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

      <main className="z-10 relative container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <FaQrcode className="text-white text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">QR Code Scanner</h2>
          <p className="text-gray-600 mb-6">Click the button below to start scanning.</p>

          {/* Scanner Controls */}
          {!isScanning ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startScan}
              className="w-full py-3 mb-6 rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600  hover:from-blue-600 hover:to-blue-700 font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaQrcode />
              <span>Start Scanning</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={stopScan}
              className="w-full py-3 mb-6 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaStopCircle />
              <span>Stop Scanning</span>
            </motion.button>
          )}

          {/* Scanner Area */}
          <div id="reader" className="mx-auto mb-6" style={{ width: 300 }} />

          {/* Scan Result */}
          {scannedText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4 mt-4 bg-white rounded-lg shadow border text-left"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Scanned QR Text:</h3>
              <p className="text-sm text-gray-600 break-all">{scannedText}</p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default QRScanner;
