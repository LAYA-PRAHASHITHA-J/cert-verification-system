import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

export default function VerificationResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get OCR data from state
  const fields = location.state?.fields || [];
  const verificationStatus = location.state?.status || "pending";
  const timestamp = location.state?.timestamp || new Date().toISOString();

  // Find certificate ID
  const certificateId =
    fields.find((f) => f.label === "Certificate ID")?.value || "N/A";

  const [copied, setCopied] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation status check
  const isValidCertificate = fields.length > 0 && certificateId !== "N/A";

  const handleCopy = () => {
    navigator.clipboard
      .writeText(certificateId)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Copy failed:", err));
  };

  const handleDownloadQR = () => {
    const svg = document.querySelector('#qr-code-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = `certificate-${certificateId}-qr.png`;
        link.href = canvas.toDataURL();
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const handleAction = (type) => {
    setActionType(type);
    setShowConfirmDialog(true);
  };

  const confirmAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/${actionType}`, { 
        state: { 
          fields, 
          timestamp: new Date().toISOString(),
          certificateId
        } 
      });
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-100";
      case "rejected": return "text-red-600 bg-red-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  // Group fields by category for better organization
  const groupedFields = fields.reduce((acc, field) => {
    const category = field.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(field);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">CertVerify</h1>
        </div>
        <nav className="flex-1 space-y-4">
          <button
            onClick={() => navigate("/progress")}
            className="block text-left w-full hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Progress
          </button>
          <button
            onClick={() => navigate("/upload")}
            className="block text-left w-full hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Upload
          </button>
          <button
            onClick={() => navigate("/ocr-preview")}
            className="block text-left w-full hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Extract
          </button>
          <button
            onClick={() => navigate("/verify")}
            className="block text-left w-full hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Validate
          </button>
          <button
            onClick={() => navigate("/help")}
            className="block text-left w-full hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Help
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Certificate Verification Result</h2>
              <p className="text-gray-500">
                Validation outcome of submitted certificate
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(verificationStatus)}`}>
                {verificationStatus.toUpperCase()}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Certificate details */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Certificate Details</h3>
              
              {!isValidCertificate && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Verification Warning
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Certificate data appears incomplete or invalid. Please review the extracted information.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {Object.keys(groupedFields).length > 0 ? (
                Object.entries(groupedFields).map(([category, categoryFields]) => (
                  <div key={category} className="mb-6">
                    <h4 className="text-md font-medium text-gray-700 mb-3">{category}</h4>
                    <div className="space-y-2">
                      {categoryFields.map((field, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:justify-between border-b pb-2 text-sm"
                        >
                          <span className="font-medium text-gray-600">{field.label}:</span>
                          <span className="text-gray-900 sm:text-right">{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0118 28c2.75 0 5.208 1.11 7 2.9m0 0L28 28c2.75 0 5.208 1.11 7 2.9m0 0A9.971 9.971 0 0138 22c1.657 0 3.213.4 4.586 1.114" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No certificate data</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No certificate information was extracted from the uploaded document.
                  </p>
                </div>
              )}
            </div>

            {/* Right - QR Code */}
            <div className="flex flex-col items-center">
              <h4 className="text-md font-semibold mb-4">QR Code</h4>
              {certificateId !== "N/A" ? (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg border">
                    <QRCodeSVG id="qr-code-svg" value={certificateId} size={150} />
                  </div>
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={handleCopy}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {copied ? "Copied!" : "Copy ID"}
                    </button>
                    <button
                      onClick={handleDownloadQR}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Download QR
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    ID: {certificateId}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="mt-2 text-sm text-red-600 font-medium">No Certificate ID Found</p>
                    <p className="text-xs text-gray-500">Cannot generate QR code</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => navigate("/ocr-preview")}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back to Preview
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={() => handleAction("rejected")}
              disabled={isLoading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading && actionType === "rejected" ? "Processing..." : "Reject"}
            </button>
            <button
              onClick={() => handleAction("approved")}
              disabled={isLoading || !isValidCertificate}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading && actionType === "approved" ? "Processing..." : "Approve"}
            </button>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">
                Confirm {actionType === "approved" ? "Approval" : "Rejection"}
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {actionType === "approved" ? "approve" : "reject"} this certificate?
                {actionType === "approved" && !isValidCertificate && (
                  <span className="block mt-2 text-yellow-600 text-sm">
                    Warning: Certificate data appears incomplete.
                  </span>
                )}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`px-4 py-2 text-white rounded-lg ${
                    actionType === "approved" 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Confirm {actionType === "approved" ? "Approval" : "Rejection"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
