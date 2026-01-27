import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserRole } from "../utils/auth";
import AuthLayout from "./AuthLayout";

const RegisterPage = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // Simulate registration logic here
    console.log(`Registering as ${role}`, formData);
    
    // Auto login after register
    if (setUserRole(role)) {
      navigate(`/${role}/dashboard`);
    }
  };

  const getRoleLabel = () => {
    switch(role) {
      case 'faculty': return 'Faculty';
      case 'student': return 'Student';
      default: return 'User';
    }
  };

  return (
    <AuthLayout 
      title={`Create ${getRoleLabel()} Account`} 
      subtitle={`Join SPMS as a ${role}.`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
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
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 mt-2"
        >
          Register
        </button>

        <div className="flex items-center justify-between mt-4">
             <Link 
              to="/login"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Role Selection
            </Link>

            <span className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link 
                to={`/${role}/login`}
                className="text-green-400 hover:text-green-300 font-medium"
              >
                Login
              </Link>
            </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
