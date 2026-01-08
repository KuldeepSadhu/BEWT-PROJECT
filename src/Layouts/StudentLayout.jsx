import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const StudentLayout = () => {
  const links = [
    { label: "Dashboard", path: "/student/dashboard" },
    { label: "My Project Details", path: "/student/project" },
  ];

  return (
    <div>
      <Navbar role="Student" links={links} />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <footer className="mt-8 p-4 bg-gray-100 text-center text-sm border-t">
        © 2026 Student Portal - SPMS
      </footer>
    </div>
  );
};

export default StudentLayout;
