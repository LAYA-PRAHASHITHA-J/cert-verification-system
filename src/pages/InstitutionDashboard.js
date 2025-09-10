import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", value: 2 },
  { name: "Tue", value: 3 },
  { name: "Wed", value: 4.5 },
  { name: "Thu", value: 3 },
  { name: "Fri", value: 5.5 },
  { name: "Sat", value: 6 },
  { name: "Sun", value: 5 },
];

export default function InstitutionDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">CertVerify</h1>
          <p className="text-sm opacity-75">University of Global Studies</p>
        </div>

        <nav className="flex-1 space-y-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="block w-full text-left bg-blue-700 px-3 py-2 rounded-lg"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/certificate-management")}
            className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Certificate Management
          </button>
          <button
            onClick={() => navigate("/bulk-upload")}
            className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Bulk Upload
          </button>
          <button
            onClick={() => navigate("/verification-requests")}
            className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Verification Requests
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Analytics
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded-lg"
          >
            Settings
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            Welcome, University of Global Studies
          </h2>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/upload")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Upload Certificate
            </button>
            <button
              onClick={() => navigate("/reports")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Total Certificates</h3>
            <p className="text-2xl font-bold">71,020</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Verified Certifications</h3>
            <p className="text-2xl font-bold">35,000</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Pending Verifications</h3>
            <p className="text-2xl font-bold">7,489</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Flagged Certifications</h3>
            <p className="text-2xl font-bold text-red-600">2,410</p>
          </div>
        </div>

        {/* Graph + Recent Activity */}
        <div className="grid grid-cols-3 gap-6">
          {/* Graph */}
          <div className="col-span-2 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Verification Activity
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Side Widgets */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-4">
              <h4 className="font-semibold">Pending Tasks</h4>
              <p className="text-sm text-gray-600">3 tasks need attention</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h4 className="font-semibold">System Notifications</h4>
              <p className="text-sm text-gray-600">
                2 new system updates available
              </p>
            </div>
          </div>
        </div>

        {/* Recent Certificate Activity */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Recent Certificate Activity
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600">
                <th className="p-2">Filename</th>
                <th className="p-2">Upload Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">cert_01.pdf</td>
                <td className="p-2">2025-09-08</td>
                <td className="p-2 text-green-600">Verified</td>
                <td className="p-2">
                  <button
                    onClick={() => navigate("/certificate/cert_01")}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2">cert_02.pdf</td>
                <td className="p-2">2025-09-08</td>
                <td className="p-2 text-yellow-600">Pending</td>
                <td className="p-2">
                  <button
                    onClick={() => navigate("/certificate/cert_02")}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2">cert_03.pdf</td>
                <td className="p-2">2025-09-07</td>
                <td className="p-2 text-red-600">Flagged</td>
                <td className="p-2">
                  <button
                    onClick={() => navigate("/certificate/cert_03")}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
