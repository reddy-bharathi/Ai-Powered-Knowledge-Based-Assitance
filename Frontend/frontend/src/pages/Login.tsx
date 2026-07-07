import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-slate-100 to-indigo-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-lg">
            AI
          </div>

          <h1 className="text-4xl font-bold text-slate-800">
            Welcome Back
          </h1>

          <p className="text-slate-500 text-base">
            AI Knowledge Base Assistant
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
        >
          {/* Email */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-white
                px-5
                py-4
                text-slate-700
                placeholder:text-slate-400
                shadow-sm
                transition-all
                duration-200
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
                focus:outline-none
              "
            />
          </div>

          {/* Password */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white
                  px-5
                  py-4
                  pr-14
                  text-slate-700
                  placeholder:text-slate-400
                  shadow-sm
                  transition-all
                  duration-200
                  focus:border-blue-600
                  focus:ring-4
                  focus:ring-blue-100
                  focus:outline-none
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                  hover:text-blue-600
                  transition
                "
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              hover:-translate-y-0.5
              transition-all
              duration-200
              text-white
              py-4
              rounded-2xl
              font-semibold
              text-lg
              flex
              items-center
              justify-center
              gap-5
              shadow-lg
              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >
            <LogIn size={22} />

            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-10 text-center">
          <p className="text-slate-800">
            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-blue-600 font-semibold hover:text-blue-700 hover:underline transition"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;