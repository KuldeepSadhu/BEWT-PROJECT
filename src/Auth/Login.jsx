import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 transition-colors">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-white">
          Student Project Management System
        </h1>
        <p className="text-gray-400 mb-8">Select your role to continue</p>
        
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <button
              onClick={() => handleNavigation("/admin/login")}
              className="relative w-full bg-indigo-700 hover:bg-indigo-600 text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-md flex items-center justify-center transform group-hover:scale-[1.02]"
            >
              <span className="mr-2">👨‍💼</span> Login as Admin
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <button
              onClick={() => handleNavigation("/faculty/login")}
              className="relative w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-md flex items-center justify-center transform group-hover:scale-[1.02]"
            >
              <span className="mr-2">👨‍🏫</span> Login as Faculty
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <button
              onClick={() => handleNavigation("/student/login")}
              className="relative w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-md flex items-center justify-center transform group-hover:scale-[1.02]"
            >
              <span className="mr-2">👨‍🎓</span> Login as Student
            </button>
          </div>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          &copy; 2026 SPMS. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
