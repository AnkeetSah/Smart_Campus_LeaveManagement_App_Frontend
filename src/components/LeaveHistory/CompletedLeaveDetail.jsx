import React from "react";
import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaCalendarAlt,
  FaDownload,
  FaUserGraduate,
  FaUserTie,
  FaUserShield,
  FaCheck,
  FaTimes,
  FaClock,
} from "react-icons/fa";
import { RiLeafLine } from "react-icons/ri";
import { useEffect } from "react";
import useQRCode from "../../hooks/useQRCode";

const CompletedLeaveDetail = ({
  selectedLeave,
  setSelectedLeave,
  renderStatusIcon,
  renderStatusText,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const leave = selectedLeave;
  const qrCodeDataURL = useQRCode(leave);

  const defaultRenderStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheck className="text-green-500 dark:text-green-400 mr-1" />;
      case "rejected":
        return <FaTimes className="text-red-500 dark:text-red-400 mr-1" />;
      default:
        return <FaClock className="text-yellow-500 dark:text-yellow-400 mr-1" />;
    }
  };

  const defaultRenderStatusText = (status) => {
    return (
      <span
        className={`text-xs font-medium ${
          status === "approved"
            ? "text-green-600 dark:text-green-400"
            : status === "rejected"
            ? "text-red-600 dark:text-red-400"
            : "text-yellow-600 dark:text-yellow-400"
        }`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  const statusIcon = renderStatusIcon || defaultRenderStatusIcon;
  const statusText = renderStatusText || defaultRenderStatusText;

  const generatePDF = () => {
    // Create a new window for PDF generation
    const printWindow = window.open("", "_blank");

    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Leave Application - ${leave._id}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f8f9fa;
            color: #333;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #2563eb;
            margin: 0;
            font-size: 24px;
          }
          .header p {
            color: #6b7280;
            margin: 5px 0 0 0;
            font-size: 14px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            color: #4b5563;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }
          .info-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border-left: 3px solid #2563eb;
          }
          .info-item strong {
            color: #1f2937;
            display: block;
            margin-bottom: 5px;
          }
          .info-item span {
            color: #6b7280;
            font-size: 14px;
          }
          .reason-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border-left: 3px solid #2563eb;
            font-style: italic;
            line-height: 1.5;
          }
          .approval-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 10px;
            border-left: 3px solid #10b981;
          }
          .approval-item.rejected {
            border-left-color: #ef4444;
          }
          .approval-item.pending {
            border-left-color: #f59e0b;
          }
          .approval-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }
          .approval-title {
            font-weight: 600;
            color: #1f2937;
          }
          .status-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
          }
          .status-approved {
            background: #dcfce7;
            color: #166534;
          }
          .status-rejected {
            background: #fee2e2;
            color: #991b1b;
          }
          .status-pending {
            background: #fef3c7;
            color: #92400e;
          }
          .comment {
            font-size: 13px;
            color: #6b7280;
            background: white;
            padding: 8px;
            border-radius: 4px;
            margin-top: 5px;
          }
          .documents {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .document-tag {
            background: #dbeafe;
            color: #1e40af;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
          }
          .final-status {
            text-align: center;
            padding: 20px;
            background: #f0fdf4;
            border-radius: 8px;
            border: 2px solid #10b981;
            margin-top: 20px;
          }
          .final-status.rejected {
            background: #fef2f2;
            border-color: #ef4444;
          }
          .final-status.pending {
            background: #fffbeb;
            border-color: #f59e0b;
          }
          .final-status h3 {
            margin: 0;
            color: #166534;
            font-size: 18px;
          }
          .final-status.rejected h3 {
            color: #991b1b;
          }
          .final-status.pending h3 {
            color: #92400e;
          }
          .qr-section {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
          }
          .qr-code {
            max-width: 150px;
            height: auto;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            background: white;
            padding: 10px;
          }
          .qr-code-label {
            margin-top: 8px;
            color: #6b7280;
            font-size: 12px;
            font-weight: 500;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
          }
          @media print {
            body { background: white; }
            .container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Leave Application</h1>
            <p>Application ID: ${leave._id}</p>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <strong>Student Information</strong>
              <span>${leave.student.name}</span><br>
              <span>Roll No: ${leave.student.rollNumber}</span><br>
              <span>Department: ${leave.student.department}</span>
            </div>
            
            <div class="info-item">
              <strong>Leave Details</strong>
              <span>${leave.leaveType} Leave</span><br>
              <span>${new Date(
                leave.fromDate
              ).toLocaleDateString()} to ${new Date(
      leave.toDate
    ).toLocaleDateString()}</span><br>
              <span>Duration: ${
                Math.ceil(
                  (new Date(leave.toDate) - new Date(leave.fromDate)) /
                    (1000 * 60 * 60 * 24)
                ) + 1
              } days</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Reason for Leave</div>
            <div class="reason-box">
              ${leave.reason}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Application Timeline</div>
            <div class="info-item">
              <strong>Applied on:</strong>
              <span>${new Date(leave.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Approval Status</div>
            
            <div class="approval-item ${leave.decisionBy.faculty.status}">
              <div class="approval-header">
                <div class="approval-title">Faculty Approval</div>
                <div class="status-badge status-${leave.decisionBy.faculty.status}">${
      leave.decisionBy.faculty.status
    }</div>
              </div>
              ${
               leave.decisionBy.faculty.comment
                  ? `<div class="comment">Comment: ${leave.decisionBy.faculty.comment}</div>`
                  : ""
              }
            </div>

            <div class="approval-item ${leave.decisionBy.hod.status}">
              <div class="approval-header">
                <div class="approval-title">HOD Approval</div>
                <div class="status-badge status-${leave.decisionBy.hod.status}">${
     leave.decisionBy.hod.status
    }</div>
              </div>
              ${
                leave.decisionBy.hod.comment
                  ? `<div class="comment">Comment: ${leave.decisionBy.hod.comment}</div>`
                  : ""
              }
            </div>

            <div class="approval-item ${leave.decisionBy.warden.status}">
              <div class="approval-header">
                <div class="approval-title">Warden Approval</div>
                <div class="status-badge status-${leave.decisionBy.warden.status}">${
     leave.decisionBy.warden.status
    }</div>
              </div>
              ${
                leave.decisionBy.warden.comment
                  ? `<div class="comment">Comment: ${leave.decisionBy.warden.comment}</div>`
                  : ""
              }
            </div>
          </div>

          ${
            leave.documents && leave.documents.length > 0
              ? `
            <div class="section">
              <div class="section-title">Attached Documents</div>
              <div class="documents">
                ${leave.documents
                  .map((doc) => `<div class="document-tag">${doc}</div>`)
                  .join("")}
              </div>
            </div>
          `
              : ""
          }

          <div class="final-status ${leave.finalStatus}">
            <h3>Final Status: ${leave.finalStatus.toUpperCase()}</h3>
          </div>

          ${
            qrCodeDataURL
              ? `
            <div class="qr-section">
              <img src="${qrCodeDataURL}" class="qr-code" alt="Leave ID QR Code">
              <div class="qr-code-label">Scan to verify leave details</div>
            </div>
          `
              : ""
          }

          <div class="footer">
            <p>This is a computer-generated document. Generated on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(pdfContent);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = function () {
      printWindow.print();
    };
  };

  if (!leave) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans px-6 transition-colors duration-300">
      {/* Floating Blobs - Light Mode Only */}
      <div className="fixed dark:hidden inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <header className="relative py-4 flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedLeave && setSelectedLeave(null)}
          className="mr-4 p-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
        </motion.button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:to-indigo-800 rounded-lg flex items-center justify-center shadow">
            <RiLeafLine className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Leave Application Details
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Complete details of your leave application
            </p>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto max-w-4xl mt-6">
        <div
          id={`leave-details-${leave._id}`}
          className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-6 transition-colors duration-300"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {leave.leaveType} Leave
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">ID: {leave._id}</p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                leave.finalStatus === "approved"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                  : leave.finalStatus === "rejected"
                  ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                  : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
              }`}
            >
              {leave.finalStatus.toUpperCase()}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                STUDENT INFORMATION
              </h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <FaUserGraduate className="mr-2 text-blue-500 dark:text-blue-400" />
                  <span className="font-medium dark:text-gray-200">{leave.student.name}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Roll No: {leave.student.rollNumber}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Department: {leave.student.department}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                LEAVE DATES
              </h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-500 dark:text-blue-400" />
                  <span className="font-medium dark:text-gray-200">
                    {new Date(leave.fromDate).toLocaleDateString()} to{" "}
                    {new Date(leave.toDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Duration:{" "}
                  {Math.ceil(
                    (new Date(leave.toDate) - new Date(leave.fromDate)) /
                      (1000 * 60 * 60 * 24)
                  ) + 1}{" "}
                  days
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Applied on: {new Date(leave.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              REASON FOR LEAVE
            </h3>
            <p className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg dark:text-gray-200">
              {leave.reason}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              APPROVAL STATUS
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <FaUserTie className="text-indigo-500 dark:text-indigo-400 text-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium dark:text-gray-200">Faculty Approval</h4>
                    <div className="flex items-center">
                      {statusIcon(leave.decisionBy.faculty.status)}
                      {statusText(leave.decisionBy.faculty.status)}
                    </div>
                  </div>
                  {leave.decisionBy.faculty.comment && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                      <span className="font-medium dark:text-gray-200">Comment:</span>{" "}
                      {leave.decisionBy.faculty.comment}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <FaUserTie className="text-indigo-600 dark:text-indigo-500 text-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium dark:text-gray-200">HOD Approval</h4>
                    <div className="flex items-center">
                      {statusIcon(leave.decisionBy.hod.status)}
                      {statusText(leave.decisionBy.hod.status)}
                    </div>
                  </div>
                  {leave.decisionBy.hod.comment && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                      <span className="font-medium dark:text-gray-200">Comment:</span>{" "}
                      {leave.decisionBy.hod.comment}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <FaUserShield className="text-indigo-700 dark:text-indigo-600 text-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium dark:text-gray-200">Warden Approval</h4>
                    <div className="flex items-center">
                      {statusIcon(leave.decisionBy.warden.status)}
                      {statusText(leave.decisionBy.warden.status)}
                    </div>
                  </div>
                  {leave.decisionBy.warden.comment && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                      <span className="font-medium dark:text-gray-200">Comment:</span>{" "}
                      {leave.decisionBy.warden.comment}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {leave.documents && leave.documents.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                ATTACHED DOCUMENTS
              </h3>
              <div className="flex flex-wrap gap-2">
                {leave.documents.map((doc, i) => (
                  <span
                    key={i}
                    className="inline-flex line-clamp-1 items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* QR Code Display in UI */}
          {qrCodeDataURL && (
            <div className="mb-6 text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                QR CODE
              </h3>
              <div className="inline-block p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <img
                  src={qrCodeDataURL}
                  alt="Leave QR Code"
                  className="w-32 h-32 mx-auto border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-600 p-2"
                />
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                  Scan to verify leave details
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generatePDF}
            className="flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg px-4 py-2 transition-colors duration-300"
          >
            <FaDownload className="mr-2" />
            Download as PDF
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default CompletedLeaveDetail;