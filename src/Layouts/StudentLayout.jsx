import React from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "../Components/Header/StudentNavbar";
import Footer from "../Components/Footer/Footer";

const StudentLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <StudentNavbar />
      
      {/* Page Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentLayout;
