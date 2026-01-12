import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FiHome, 
  FiUsers, 
  FiFolder, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiCalendar,
  FiFileText,
  FiBarChart
} from "react-icons/fi";
import { clearUserRole } from "../../utils/auth";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    clearUserRole();
    navigate("/login");
  };

  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/admin/dashboard" },
    { icon: FiUsers, label: "Student Master", path: "/admin/students/master" },
    { icon: FiFolder, label: "Group Creation", path: "/admin/groups/creation" },
    { icon: FiFolder, label: "Group Approval", path: "/admin/groups/approval" },
    { icon: FiFolder, label: "Member Mapping", path: "/admin/groups/member-mapping" },
    { icon: FiFileText, label: "Project List", path: "/admin/projects" },
    { icon: FiSettings, label: "Project Types", path: "/admin/config/project-types" },
    { icon: FiSettings, label: "Staff Management", path: "/admin/config/staff" },
    { icon: FiSettings, label: "Academic Year", path: "/admin/config/academic-year" },
  ];

  const isActive = (path) => {
    if (location.pathname === path) return true;
    // Check if current path starts with the menu path (for sub-routes)
    if (path !== "/admin/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-indigo-700 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">SPMS Admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-indigo-600 rounded"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:static inset-y-0 left-0 z-50 w-64 bg-indigo-800 dark:bg-indigo-900 text-white shadow-lg transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-indigo-700">
            <h1 className="text-2xl font-bold">SPMS</h1>
            <p className="text-indigo-300 text-sm mt-1">Admin Portal</p>
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
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-indigo-100 hover:bg-indigo-700"
                      }`}
                      onClick={() => {
                        // Close sidebar on mobile after navigation
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
          <div className="p-4 border-t border-indigo-700">
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

export default AdminNavbar;
