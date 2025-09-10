import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdBusiness, MdWork, MdSchool, MdAccountBalance } from "react-icons/md";

export default function LoginAndRoleSelection() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (role) => {
    if (role === "institution") navigate("/dashboard");
    else if (role === "employer") navigate("/verify");
    else if (role === "student") navigate("/ocr-preview");
    else if (role === "admin") navigate("/upload");
  };

  const handleDefaultLogin = () => {
    // default login → go to institution dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[500px]">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2">
            <span className="text-3xl">🛡️</span>
            <h1 className="text-2xl font-bold">CertVerify</h1>
          </div>
        </div>

        {/* Login form */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Email/Username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-gray-600 text-sm">
              Remember me
            </label>
          </div>

          {/* Log In button */}
          <button
            onClick={handleDefaultLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </div>

        {/* Role selection */}
        <h3 className="text-lg font-semibold text-center mb-4">Select Your Role</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleLogin("institution")}
            className="flex flex-col items-center border rounded-lg p-4 hover:bg-blue-50 transition"
          >
            <MdBusiness className="text-3xl text-blue-600 mb-2" />
            <span>Institutions</span>
          </button>
          <button
            onClick={() => handleLogin("employer")}
            className="flex flex-col items-center border rounded-lg p-4 hover:bg-blue-50 transition"
          >
            <MdWork className="text-3xl text-blue-600 mb-2" />
            <span>Employers</span>
          </button>
          <button
            onClick={() => handleLogin("student")}
            className="flex flex-col items-center border rounded-lg p-4 hover:bg-blue-50 transition"
          >
            <MdSchool className="text-3xl text-blue-600 mb-2" />
            <span>Students</span>
          </button>
          <button
            onClick={() => handleLogin("admin")}
            className="flex flex-col items-center border rounded-lg p-4 hover:bg-blue-50 transition"
          >
            <MdAccountBalance className="text-3xl text-blue-600 mb-2" />
            <span>Government Admin</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-between text-sm text-blue-600">
          <button
            onClick={() => navigate("/forgot-password")}
            className="hover:underline"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => navigate("/help")}
            className="hover:underline"
          >
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
}
