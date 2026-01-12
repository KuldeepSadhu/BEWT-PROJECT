import React from "react";
import { useNavigate } from "react-router-dom";
import { setUserRole } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // Use utility function to set role (with validation)
    if (setUserRole(role)) {
      navigate(`/${role}/dashboard`);
    } else {
      // This shouldn't happen in normal flow, but handle it gracefully
      console.error("Invalid role attempted:", role);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 transition-colors">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-white">
          Student Project Management System
        </h1>
        <p className="text-gray-400 mb-6">SPMS Portal</p>
        
        <div className="mb-6 p-4 border border-yellow-600 rounded-lg bg-yellow-900/20">
          <p className="text-sm text-yellow-200 font-medium">
            🔧 Development Mode: Click to login as a role
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleLogin("admin")}
            className="w-full bg-indigo-700 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Login as Admin
          </button>
          <button
            onClick={() => handleLogin("faculty")}
            className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Login as Faculty
          </button>
          <button
            onClick={() => handleLogin("student")}
            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Login as Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
