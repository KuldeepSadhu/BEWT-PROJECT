import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const FacultyLayout = () => {
  const links = [
    { label: "Dashboard", path: "/faculty/dashboard" },
    { label: "Mentored Groups", path: "/faculty/groups" },
  ];

  return (
    <div>
      <Navbar role="Faculty" links={links} />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <footer className="mt-8 p-4 bg-gray-100 text-center text-sm border-t">
        © 2026 Faculty Portal - SPMS
      </footer>
    </div>
  );
};

export default FacultyLayout;
