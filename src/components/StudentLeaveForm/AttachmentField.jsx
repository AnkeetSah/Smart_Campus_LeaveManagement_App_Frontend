import React, { useRef, useState } from "react";
import useLeaveApplicationStore from "../../store/useLeaveApplicationStore";

const AttachmentField = () => {
  const { setField } = useLeaveApplicationStore();
  const fileInputRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setField("documents", files);

    const previewList = files.map((file) => {
      if (file.type.startsWith("image/")) {
        return {
          name: file.name,
          type: "image",
          url: URL.createObjectURL(file),
        };
      } else {
        return {
          name: file.name,
          type: "pdf",
        };
      }
    });

    setPreviews(previewList);
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-blue-50/40 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-5 rounded-xl shadow-sm transition-colors duration-300">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Supporting Documents
      </label>

      <div
        className="flex flex-col items-center justify-center text-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-indigo-300 dark:hover:border-indigo-500 transition cursor-pointer"
        onClick={handleAreaClick}
      >
        <svg
          className="h-12 w-12 text-gray-400 dark:text-gray-500"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">Click to upload</span> or drag and drop
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Accepted: PDF, JPG, PNG up to 5MB{" "}
          <span className="text-red-500 dark:text-red-400 font-semibold">(Required for medical leave)</span>
        </p>

        <input
          ref={fileInputRef}
          type="file"
          id="file-upload"
          name="documents"
          className="hidden"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
      </div>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {previews.map((file, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 shadow-sm text-sm"
            >
              {file.type === "image" ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-32 object-cover rounded"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <span className="text-indigo-600 dark:text-indigo-400 text-xl">📄</span>
                  <span className="truncate">{file.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachmentField;