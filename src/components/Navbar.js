import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Cert Verification System</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/upload" className="hover:underline">
          Upload
        </Link>
        <Link to="/verify" className="hover:underline">
          Verify
        </Link>
      </div>
    </nav>
  );
}
