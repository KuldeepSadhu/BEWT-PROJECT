import React from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "../Components/Header/StudentNavbar.jsx";
import Footer from "../Components/Footer/Footer.jsx";

const StudentLayout = () => {
  return (
    <div className="app-shell flex flex-col min-h-screen">
      {/* Top Navbar */}
      <StudentNavbar />

      {/* Page Content */}
      <main className="flex-1 container mx-auto w-full px-4 py-6 md:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentLayout;
