import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/auth.js";
import AuthLayout from "./AuthLayout.jsx";

const LoginPage = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password, role);

      if (result.success) {
        navigate(`/${role}/dashboard`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case "admin":
        return "Admin";
      case "faculty":
        return "Faculty";
      case "student":
        return "Student";
      default:
        return "User";
    }
  };

  return (
    <AuthLayout
      title={`${getRoleLabel()} Login`}
      subtitle={`Welcome back, please login to your ${role} account.`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={`Enter your ${role} email`}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center justify-between mt-4">
          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Role Selection
          </Link>

          {role !== "admin" && (
            <span className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to={`/${role}/register`}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Register
              </Link>
            </span>
          )}
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
