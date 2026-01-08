import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  const adminLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Projects", path: "/admin/projects" },
  ];

  return (
    <div>
      <Navbar role="Admin" links={adminLinks} />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <footer className="mt-8 p-4 bg-gray-100 text-center text-sm border-t">
        © 2026 Admin Portal - SPMS
      </footer>
    </div>
  );
};

export default AdminLayout;
