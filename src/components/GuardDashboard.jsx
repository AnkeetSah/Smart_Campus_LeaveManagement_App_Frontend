import { useState, useEffect } from 'react';
import { FaUserShield, FaCalendarAlt, FaClock, FaCheck, FaTimes, FaCamera, FaStop } from 'react-icons/fa';

function GuardDashboard() {
  const [scannedId, setScannedId] = useState('');
  const [leaveData, setLeaveData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannerInstance, setScannerInstance] = useState(null);

  const startScanning = async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setError(null);
    setLeaveData(null);
    setScannedId('');
    
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const scanner = new Html5Qrcode('reader');
      setScannerInstance(scanner);
      
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (qrMessage) => {
          setScannedId(qrMessage);
          fetchLeaveDetails(qrMessage);
          stopScanning();
        },
        (errorMessage) => {
          console.log('Scan error:', errorMessage);
        }
      );
    } catch (err) {
      console.error('Scanner start error:', err);
      setError('Failed to start camera scanner');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (scannerInstance) {
      scannerInstance.stop().then(() => {
        setScannerInstance(null);
        setIsScanning(false);
      }).catch(() => {
        setScannerInstance(null);
        setIsScanning(false);
      });
    }
  };

  const fetchLeaveDetails = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/leaves/${id}`);
      if (!res.ok) throw new Error('Leave not found');
      const data = await res.json();
      setLeaveData(data);
    } catch (err) {
      setError(err.message);
      setLeaveData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleManualInput = (e) => {
    const value = e.target.value;
    setScannedId(value);
    if (value.trim()) {
      fetchLeaveDetails(value.trim());
    } else {
      setLeaveData(null);
      setError(null);
    }
  };

  useEffect(() => {
    return () => {
      if (scannerInstance) {
        scannerInstance.stop().catch(() => {});
      }
    };
  }, [scannerInstance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans p-6">
      {/* Floating Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/70 backdrop-blur-md border-b border-white/30 py-4 px-6 flex items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center shadow">
            <FaUserShield className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Guard Dashboard</h1>
            <p className="text-xs text-gray-600">Leave QR Verification</p>
          </div>
        </div>
      </header>

      {/* QR Reader + Result */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-xl">
        <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Scan Leave QR Code</h2>
          
          {/* Manual Input Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave ID (Manual Entry or Scan Result)
            </label>
            <input
              type="text"
              value={scannedId}
              onChange={handleManualInput}
              placeholder="Enter leave ID manually or scan QR code"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Scanner Controls */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={startScanning}
              disabled={isScanning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isScanning 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <FaCamera />
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </button>
            
            {isScanning && (
              <button
                onClick={stopScanning}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <FaStop />
                Stop Scan
              </button>
            )}
          </div>

          {/* QR Scanner */}
          <div 
            id="reader" 
            className={`w-full h-80 border border-gray-300 rounded-lg mb-4 ${
              isScanning ? 'block' : 'hidden'
            }`}
          ></div>

          {/* Loading/Error States */}
          {loading && (
            <div className="text-blue-600 font-medium mb-4 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Fetching leave details...
            </div>
          )}
          {error && (
            <div className="text-red-600 font-medium mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Leave Data Display */}
          {leaveData && (
            <div className="mt-4 bg-white border border-gray-200 p-4 rounded-lg shadow-sm space-y-3">
              <div className="border-b border-gray-100 pb-2 mb-3">
                <h3 className="font-semibold text-gray-800">Leave Details</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Leave ID:</span>
                  <span className="font-bold text-gray-800">{leaveData.id}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Student:</span>
                  <span className="font-bold text-gray-800">{leaveData.student}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Dates:</span>
                  <span className="font-medium text-gray-800 flex items-center">
                    <FaCalendarAlt className="mr-1.5 text-blue-500" />
                    {leaveData.dates}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Days:</span>
                  <span className="font-medium text-gray-800">{leaveData.days}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reason:</span>
                  <span className="font-medium text-gray-800">{leaveData.reason}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Submitted:</span>
                  <span className="font-medium text-gray-800 flex items-center">
                    <FaClock className="mr-1.5 text-purple-500" />
                    {leaveData.submitted}
                  </span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <div className={`inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full font-semibold text-white ${
                  leaveData.status === 'approved' ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  {leaveData.status === 'approved' ? <FaCheck /> : <FaTimes />}
                  {leaveData.status.toUpperCase()}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default GuardDashboard;