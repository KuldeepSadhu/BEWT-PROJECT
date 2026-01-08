import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    localStorage.setItem("role", role);
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "faculty") navigate("/faculty/dashboard");
    else if (role === "student") navigate("/student/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Student Project Management System</h1>
        <p className="mb-4 text-gray-600 border border-yellow-400 p-2 bg-yellow-50">
          Dev Mode: Click to login as a role
        </p>
        <div className="space-y-4 flex flex-col">
          <button
            onClick={() => handleLogin("admin")}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login as Admin
          </button>
          <button
            onClick={() => handleLogin("faculty")}
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Login as Faculty
          </button>
          <button
            onClick={() => handleLogin("student")}
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            Login as Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
