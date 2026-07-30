import React from "react";
import { Outlet } from "react-router-dom";
import FacultyNavbar from "../Components/Header/FacultyNavbar.jsx";
import Footer from "../Components/Footer/Footer.jsx";

const FacultyLayout = () => {
  return (
    <div className="app-shell flex h-screen overflow-hidden">
      {/* Sidebar */}
      <FacultyNavbar />

      <div className="app-main flex-1 flex flex-col overflow-hidden">
]        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default FacultyLayout;
