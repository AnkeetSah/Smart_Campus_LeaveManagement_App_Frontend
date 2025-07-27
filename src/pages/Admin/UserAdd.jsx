import React, { useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import { motion } from "framer-motion";
import { extractExcelData } from "../../utils/excelUtils"; // adjust the path as needed
import ExtractedUserData from "./ExtractedUserData";

const UserAdd = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".xlsx")) {
      setError("Please select an .xlsx file");
      return;
    }

    setSelectedFile(file);
    setError(null);
    setIsProcessing(true);

    try {
      const data = await extractExcelData(file);
      setExtractedData(data);
      console.log("Extracted data:", data);
    } catch (err) {
      setError(err.message);
      console.error("Error extracting Excel data:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUploadBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    // Now we already have the data, just need to submit it
    if (!extractedData) return;
    
    console.log("Submitting data:", extractedData);
    // Here you would typically send the data to your API
    alert(`Ready to submit ${extractedData.length} records!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-blue-50 shadow-md  p-6 rounded-lg border border-blue-100"
    >
      <div className="flex gap-3 items-center mb-1">
        <TbUpload className="text-2xl text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">Bulk User Upload</h1>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        Upload users in bulk using Excel file (.xlsx format)
      </p>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"
        >
          {error}
        </motion.div>
      )}

      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={handleUploadBoxClick}
        className="cursor-pointer border-2 border-dashed border-blue-300 rounded-lg p-6 text-center transition-all hover:border-blue-500 hover:bg-blue-100"
      >
        <TbUpload className="mx-auto text-3xl text-blue-500 mb-3" />
        <p className="text-gray-700 mb-2">
          {selectedFile
            ? `Selected: ${selectedFile.name}`
            : "Click anywhere here to select an Excel file"}
        </p>

        <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block">
          {isProcessing ? "Processing..." : "Browse Files"}
        </span>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept=".xlsx"
          onChange={handleFileChange}
          disabled={isProcessing}
        />

        <p className="text-xs text-gray-500 mt-3">
          Only .xlsx files are accepted
        </p>
      </motion.div>

      <div className="mt-4 flex justify-between items-center">
        {extractedData && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleUpload}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Upload {extractedData.length} Users
          </motion.button>
        )}
      </div>

      {/* Display extracted data for debugging */}
      {extractedData && (
       <div>
         <ExtractedUserData data={extractedData}/>
       </div>
      )}
    </motion.div>
  );
};

export default UserAdd;