import React, { useRef, useState, useEffect } from "react";
import { TbUpload } from "react-icons/tb";
import { motion } from "framer-motion";
import { extractExcelData } from "../../utils/excelUtils"; // adjust the path as needed
import ExtractedUserData from "./ExtractedUserData";
import useAdmin from "../../hooks/useAdmin.js";
import { ToastContainer, toast } from "react-toastify";
const UserAdd = () => {
  const [selectedRole, setSelectedRole] = useState("student");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const { mutate, status, isError } = useAdmin();

  const isLoading = status === "pending";
  const isSuccess = status === "success";

  const handleUpload = () => {
    console.log("Uploading users:", extractedData,selectedRole);
    mutate({extractedData,selectedRole});
  };

  useEffect(() => {
    if (status === "success") {
      toast.success("✅ Users added successfully!");
    } else if (status === "error") {
      toast.error("❌ Failed to add users.");
    }
  }, [status]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-blue-50 shadow-md  p-6 rounded-lg border border-blue-100"
    >
      <ToastContainer />
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
  <TbUpload className="text-3xl text-blue-600" />
  
  <div className="flex flex-col">
    <h1 className="text-2xl font-bold text-gray-800">Bulk User Upload</h1>
    <h2 className="text-sm text-gray-600">Select the user role you want to add</h2>
  </div>

  <select
    value={selectedRole}
    onChange={handleRoleChange}
    className="px-4 py-2  font-bold rounded-md border border-gray-300 text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out hover:border-blue-400"
  >
    <option value="student">Student</option>
    <option value="faculty">Faculty</option>
    <option value="hod">HOD</option>
    <option value="warden">Warden</option>
    <option value="guard">Guard</option>
  </select>
</div>


      <p className="text-gray-600 text-sm my-4">
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
          className={`hidden ${
            status === "pending" ? "pointer-events-none opacity-50" : ""
          }`}
          ref={fileInputRef}
          accept=".xlsx"
          onChange={handleFileChange}
          disabled={isProcessing || status === "pending"}
        />

        <p className="text-xs text-gray-500 mt-3">
          Only .xlsx files are accepted
        </p>
      </motion.div>

      <div className="flex justify-between items-center my-4">
        {extractedData && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleUpload}
            disabled={status === "pending"}
            className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors`}
          >
            {isLoading ? "Uploading..." : "Upload Users"}
          </motion.button>
        )}
      </div>

      {/* Display extracted data for debugging */}
      {extractedData && (
        <div>
          <ExtractedUserData data={extractedData} />
        </div>
      )}
    </motion.div>
  );
};

export default UserAdd;
