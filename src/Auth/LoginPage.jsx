import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserRole } from "../utils/auth";
import AuthLayout from "./AuthLayout";

const LoginPage = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login logic here
    // In a real app, you would validate credentials with backend
    console.log(`Logging in as ${role}`, formData);
    
    // Set auth state
    if (setUserRole(role)) {
      navigate(`/${role}/dashboard`);
    }
  };

  const getRoleLabel = () => {
    switch(role) {
      case 'admin': return 'Admin';
      case 'faculty': return 'Faculty';
      case 'student': return 'Student';
      default: return 'User';
    }
  };

  return (
    <AuthLayout 
      title={`${getRoleLabel()} Login`} 
      subtitle={`Welcome back, please login to your ${role} account.`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Login
        </button>

        <div className="flex items-center justify-between mt-4">
            <Link 
              to="/login"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Role Selection
            </Link>
            
            {role !== 'admin' && (
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
