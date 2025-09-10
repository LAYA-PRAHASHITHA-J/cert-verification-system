import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadInterface() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      name: file.name,
      date: new Date().toISOString().split("T")[0], // today's date
      status: "Processing",
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  // Delete file
  const handleDelete = (name) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== name));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h1
          className="text-2xl font-bold mb-6 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          CertVerify
        </h1>
        <nav className="flex-1 space-y-4">
          <button
            onClick={() => navigate("/upload")}
            className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Uploads
          </button>
          <button
            onClick={() => navigate("/ocr-preview")}
            className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Certificates
          </button>
          <button
            onClick={() => navigate("/verify")}
            className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Monitor
          </button>
        </nav>

        <button
          onClick={() => navigate("/")}
          className="mt-auto bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Upload Certificate</h2>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
            <p className="text-gray-600 mb-4">Drag & Drop Certificate Files Here</p>
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Files
            </button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Guidelines */}
          <div className="mt-6 text-sm text-gray-600">
            <p>• Ensure clear scans</p>
            <p>• High-resolution images recommended</p>
            <p>• File size limit: 10MB</p>
          </div>
        </div>

        {/* Recently Uploaded */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Recently Uploaded</h3>
          {uploadedFiles.length === 0 ? (
            <p className="text-gray-500 text-sm">No files uploaded yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Filename</th>
                  <th className="py-2">Upload Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((file, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{file.name}</td>
                    <td className="py-2">{file.date}</td>
                    <td
                      className={`py-2 ${
                        file.status === "Verified"
                          ? "text-green-600"
                          : file.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {file.status}
                    </td>
                    <td className="py-2 flex gap-4">
                      <button
                        onClick={() => navigate("/ocr-preview")}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(file.name)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/ocr-preview")}
            disabled={uploadedFiles.length === 0}
            className={`px-4 py-2 text-white rounded-lg ${
              uploadedFiles.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Proceed to Verification
          </button>
        </div>
      </main>
    </div>
  );
}
