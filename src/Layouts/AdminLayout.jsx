import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../Components/Header/AdminNavbar.jsx";
import Footer from "../Components/Footer/Footer.jsx";

const AdminLayout = () => {
  return (
    <div className="app-shell flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content Area */}
      <div className="app-main flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
