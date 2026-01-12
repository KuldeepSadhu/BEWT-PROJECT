import React from "react";
import { Outlet } from "react-router-dom";
import FacultyNavbar from "../Components/Header/FacultyNavbar";
import Footer from "../Components/Footer/Footer";

const FacultyLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <FacultyNavbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default FacultyLayout;
