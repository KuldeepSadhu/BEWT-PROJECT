import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
