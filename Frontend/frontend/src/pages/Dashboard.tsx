import { useNavigate } from "react-router-dom";
import { Upload, FileText, MessageSquare, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white flex justify-between items-center px-8 py-4 shadow">

        <h1 className="text-2xl font-bold">
          AI Knowledge Base Assistant
        </h1>

        <div className="flex items-center gap-4">

          <span>
            Welcome, {user.name || "User"}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </nav>

      {/* Content */}

      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-6">
          Dashboard
        </h2>

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <FileText className="text-blue-600" size={40} />

            <h3 className="text-xl font-semibold mt-4">
              Documents
            </h3>

            <p className="text-gray-500">
              View uploaded documents.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <Upload className="text-green-600" size={40} />

            <h3 className="text-xl font-semibold mt-4">
              Upload
            </h3>

            <p className="text-gray-500">
              Upload PDF, TXT or Markdown files.
            </p>

            <button
  onClick={() => navigate("/upload")}
  className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
>
  Upload Document
</button>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <MessageSquare
              className="text-purple-600"
              size={40}
            />

            <h3 className="text-xl font-semibold mt-4">
              AI Chat
            </h3>

            <p className="text-gray-500">
              Ask questions about uploaded documents.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;