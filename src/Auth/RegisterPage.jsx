import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/auth.js";
import AuthLayout from "./AuthLayout.jsx";

const RegisterPage = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    rollNumber: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!formData.department.trim()) {
      setError("Department is required");
      return;
    }

    if (role === "student" && !formData.rollNumber.trim()) {
      setError("Roll number is required for students");
      return;
    }

    setLoading(true);

    try {
      const registrationData = { department: formData.department };
      if (role === "student") {
        registrationData.rollNumber = formData.rollNumber;
      }

      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        role,
        registrationData,
      );

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
      title={`${getRoleLabel()} Registration`}
      subtitle={`Create your ${role} account to get started.`}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
          <input
            type="text"
            name="name"
            required
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:opacity-50"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
          <input
            type="email"
            name="email"
            required
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:opacity-50"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Department</label>
          <input
            type="text"
            name="department"
            required
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:opacity-50"
            placeholder="e.g. Computer Science"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        {role === "student" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              required
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:opacity-50"
              placeholder="Enter your roll number"
              value={formData.rollNumber}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            name="password"
            required
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:opacity-50"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:opacity-50"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-teal-700 px-4 py-3 font-bold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link to="/login" className="text-sm text-slate-500 transition-colors hover:text-slate-800">
            Back to role selection
          </Link>

          <span className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link to={`/${role}/login`} className="font-medium text-teal-700 hover:text-teal-600">
              Login
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
