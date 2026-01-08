import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ role, links }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">SPMS ({role})</h1>
        <div className="flex gap-4">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <button 
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
