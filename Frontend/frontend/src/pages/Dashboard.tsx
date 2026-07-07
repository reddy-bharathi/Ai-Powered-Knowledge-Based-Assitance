import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  MessageSquare,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

interface User {
  name?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

      {/* Navbar */}

      <nav className="bg-blue-600 dark:bg-slate-800 text-white shadow">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

          <h1 className="text-2xl font-bold">
            AI Knowledge Base Assistant
          </h1>

          <div className="flex items-center gap-4">

            <span className="hidden md:block">
              Welcome, {user.name || "User"}
            </span>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* Main Content */}

      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">
          Dashboard
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          {/* Documents */}

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition">

            <FileText
              className="text-blue-600"
              size={40}
            />

            <h3 className="text-xl font-semibold mt-4 text-slate-800 dark:text-white">
              Documents
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              View uploaded documents.
            </p>

          </div>

          {/* Upload */}

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition">

            <Upload
              className="text-green-600"
              size={40}
            />

            <h3 className="text-xl font-semibold mt-4 text-slate-800 dark:text-white">
              Upload
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Upload PDF, TXT or Markdown files.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
            >
              Upload Document
            </button>

          </div>

          {/* AI Chat */}

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition">

            <MessageSquare
              className="text-purple-600"
              size={40}
            />

            <h3 className="text-xl font-semibold mt-4 text-slate-800 dark:text-white">
              AI Chat
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Ask questions about uploaded documents.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;