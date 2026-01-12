import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FiHome, 
  FiUsers, 
  FiFolder, 
  FiUser, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiCalendar,
  FiFileText,
  FiDownload
} from "react-icons/fi";
import { clearUserRole } from "../../utils/auth";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearUserRole();
    navigate("/login");
  };

  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/student/dashboard" },
    { icon: FiUsers, label: "My Group", path: "/student/group/my-group" },
    { icon: FiFolder, label: "My Project", path: "/student/project" },
    { icon: FiFileText, label: "Project Details", path: "/student/projects/details" },
    { icon: FiFileText, label: "Submit Proposal", path: "/student/projects/proposal" },
    { icon: FiCalendar, label: "Meeting Schedule", path: "/student/meetings/schedule" },
    { icon: FiCalendar, label: "Meeting History", path: "/student/meetings/history" },
    { icon: FiDownload, label: "Reports", path: "/student/reports/progress" },
    { icon: FiUser, label: "Profile", path: "/student/profile" },
  ];

  const isActive = (path) => {
    if (location.pathname === path) return true;
    // Check if current path starts with the menu path (for sub-routes)
    if (path !== "/student/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-indigo-700 dark:bg-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">SPMS</h1>
            <span className="text-indigo-300 text-sm hidden sm:inline">Student Portal</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-indigo-600 text-white"
                      : "text-indigo-100 hover:bg-indigo-600"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium"
            >
              <FiLogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-indigo-600 rounded"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-indigo-600">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-indigo-600 text-white"
                        : "text-indigo-100 hover:bg-indigo-600"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default StudentNavbar;
