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
      subtitle={`Welcome back. Login to your ${role} account.`}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-rose-900/60 bg-rose-950/60 px-4 py-3 text-rose-300">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
          <input
            type="email"
            name="email"
            required
            disabled={loading}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-900/60 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={`Enter your ${role} email`}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
          <input
            type="password"
            name="password"
            required
            disabled={loading}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-900/60 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-teal-700 px-4 py-3 font-bold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link to="/login" className="text-sm text-slate-400 transition-colors hover:text-slate-200">
            Back to role selection
          </Link>

          {role !== "admin" && (
            <span className="text-sm text-slate-400">
              No account?{" "}
              <Link to={`/${role}/register`} className="font-medium text-teal-400 hover:text-teal-300">
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
