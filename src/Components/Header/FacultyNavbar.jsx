import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FiHome, 
  FiUsers, 
  FiFolder, 
  FiFileText, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiCalendar,
  FiCheckCircle,
  FiBarChart
} from "react-icons/fi";
import { clearUserRole } from "../../utils/auth";

const FacultyNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    clearUserRole();
    navigate("/login");
  };

  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/faculty/dashboard" },
    { icon: FiUsers, label: "Mentored Groups", path: "/faculty/groups" },
    { icon: FiCalendar, label: "Meeting Schedule", path: "/faculty/meetings/schedule" },
    { icon: FiCalendar, label: "Meeting Entry", path: "/faculty/meetings/entry" },
    { icon: FiCheckCircle, label: "Attendance", path: "/faculty/meetings/attendance" },
    { icon: FiFileText, label: "Proposal Review", path: "/faculty/projects/proposals" },
    { icon: FiFolder, label: "Project Progress", path: "/faculty/projects/progress" },
    { icon: FiFolder, label: "Project Files", path: "/faculty/projects/files" },
    { icon: FiCheckCircle, label: "Evaluation", path: "/faculty/projects/evaluation" },
    { icon: FiBarChart, label: "Group Performance", path: "/faculty/reports/performance" },
    { icon: FiBarChart, label: "Marks Report", path: "/faculty/reports/marks" },
  ];

  const isActive = (path) => {
    if (location.pathname === path) return true;
    // Check if current path starts with the menu path (for sub-routes)
    if (path !== "/faculty/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">SPMS Faculty</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-green-600 rounded"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:static inset-y-0 left-0 z-50 w-64 bg-green-800 dark:bg-green-900 text-white shadow-lg transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-green-700">
            <h1 className="text-2xl font-bold">SPMS</h1>
            <p className="text-green-300 text-sm mt-1">Faculty Portal</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-green-600 text-white shadow-md"
                          : "text-green-100 hover:bg-green-700"
                      }`}
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          setSidebarOpen(false);
                        }
                      }}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-green-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default FacultyNavbar;
