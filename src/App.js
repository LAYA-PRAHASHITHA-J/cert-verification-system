import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import LoginAndRoleSelection from "./pages/LoginAndRoleSelection";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import UploadInterface from "./pages/UploadInterface";
import OCRPreview from "./pages/OCRPreview";
import VerificationResult from "./pages/VerificationResult";

// Layout wrapper that shows Navbar + content
function Layout() {
  return (
    <>
      <Navbar />
      <div className="p-6 flex-grow">
        <Outlet /> {/* Nested routes render here */}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Login page without navbar */}
          <Route path="/" element={<LoginAndRoleSelection />} />

          {/* All other pages with Navbar */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<InstitutionDashboard />} />
            <Route path="/upload" element={<UploadInterface />} />
            <Route path="/ocr-preview" element={<OCRPreview />} />
            <Route path="/verify" element={<VerificationResult />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

