import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OCRPreview() {
  const navigate = useNavigate();

  const [fields, setFields] = useState([
    { label: "Certificate ID", value: "C12345", confidence: "high", editing: false },
    { label: "Student Name", value: "John Doe", confidence: "high", editing: false },
    { label: "Roll Number", value: "2021001", confidence: "medium", editing: false },
    { label: "Institution Name", value: "ABC University", confidence: "medium", editing: false },
    { label: "Program/Degree", value: "B.Tech CSE", confidence: "low", editing: false },
    { label: "Year of Completion", value: "2024", confidence: "low", editing: false },
    { label: "Grade/CGPA", value: "8.9", confidence: "medium", editing: false },
    { label: "Issue Date", value: "01-07-2024", confidence: "high", editing: false },
  ]);

  // Confidence colors
  const getConfidenceColor = (level) => {
    switch (level) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  // Toggle edit for a single field
  const toggleEdit = (index) => {
    setFields((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, editing: !f.editing } : f
      )
    );
  };

  // Update value
  const handleChange = (index, newValue) => {
    setFields((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, value: newValue } : f
      )
    );
  };

  // Enable editing for all
  const editAllFields = () => {
    setFields((prev) => prev.map((f) => ({ ...f, editing: true })));
  };

  // Reset fields (simulate re-scan)
  const rescanDocument = () => {
    setFields((prev) =>
      prev.map((f) => ({ ...f, value: "", editing: false }))
    );
    alert("Re-scanned document. OCR data refreshed!");
  };

  // Cancel -> back to upload
  const handleCancel = () => {
    navigate("/upload");
  };

  // Proceed -> verification result
  // inside OCRPreview.js
const handleProceed = () => {
  navigate("/verify", { state: { fields } }); // Pass OCR data
};


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
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Certificate Data Extraction</h2>
          <p className="text-gray-500">Upload &gt; Scan &gt; Extract &gt; Validate</p>
        </div>

        <div className="flex gap-6">
          {/* Left - Document Preview */}
          <div className="w-2/3 bg-white shadow rounded-lg p-6">
            <div className="relative border border-gray-300 rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/500x400?text=Certificate+Preview"
                alt="certificate"
                className="w-full"
              />
              {/* Example OCR highlight boxes */}
              <div className="absolute top-10 left-10 bg-red-400 bg-opacity-40 border border-red-600 px-2 py-1">
                Name
              </div>
              <div className="absolute top-32 left-10 bg-yellow-300 bg-opacity-40 border border-yellow-600 px-2 py-1">
                ID
              </div>
              <div className="absolute top-56 left-10 bg-blue-300 bg-opacity-40 border border-blue-600 px-2 py-1">
                Degree
              </div>
              <div className="absolute bottom-10 right-10 bg-orange-300 bg-opacity-40 border border-orange-600 px-2 py-1">
                Date
              </div>
            </div>
          </div>

          {/* Right - Extracted Data */}
          <div className="w-1/3 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Extracted Data</h3>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="text-sm text-gray-500">{field.label}</p>
                    {field.editing ? (
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{field.value}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${getConfidenceColor(
                        field.confidence
                      )}`}
                      title={`Confidence: ${field.confidence}`}
                    ></span>
                    <button
                      onClick={() => toggleEdit(index)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {field.editing ? "Save" : "Edit"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Data Validation */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-2">Data Validation</h4>
              <div className="flex items-center gap-2 text-yellow-600">
                <span className="text-xl">⚠</span>
                <span className="text-sm">Potential inconsistencies detected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <div className="space-x-3">
            <button
              onClick={rescanDocument}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Re-scan Document
            </button>
            <button
              onClick={editAllFields}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Edit All Fields
            </button>
          </div>
          <div className="space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Confirm & Proceed
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
