import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiFolder,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiFileText,
  FiUser,
} from "react-icons/fi";
import { logout, getCurrentUser } from "../../utils/auth";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/admin/dashboard" },
    { icon: FiUsers, label: "Student Master", path: "/admin/students/master" },
    { icon: FiFolder, label: "Group Creation", path: "/admin/groups/creation" },
    { icon: FiFolder, label: "Group Approval", path: "/admin/groups/approval" },
    {
      icon: FiFolder,
      label: "Member Mapping",
      path: "/admin/groups/member-mapping",
    },
    { icon: FiFileText, label: "Project List", path: "/admin/projects" },
    {
      icon: FiSettings,
      label: "Project Types",
      path: "/admin/config/project-types",
    },
    {
      icon: FiSettings,
      label: "Staff Management",
      path: "/admin/config/staff",
    },
    {
      icon: FiSettings,
      label: "Academic Year",
      path: "/admin/config/academic-year",
    },
  ];

  const isActive = (path) => {
    if (location.pathname === path) return true;
    // Check if current path starts with the menu path (for sub-routes)
    if (path !== "/admin/dashboard" && location.pathname.startsWith(path))
      return true;
    return false;
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-slate-900 text-slate-100 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-semibold tracking-wide">SPMS Admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-100 shadow-xl transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-slate-800/80">
            <h1 className="text-2xl font-bold tracking-tight">SPMS</h1>
            <p className="text-slate-400 text-sm mt-1">
              Administrator Console
            </p>
          </div>

          {/* Logged-in User Info */}
          {currentUser && (
            <div className="px-6 py-4 border-b border-slate-800/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center">
                <FiUser size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white truncate max-w-[130px]">
                  {currentUser.name}
                </p>
                <p className="text-xs text-slate-400 capitalize">
                  {currentUser.role}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all visited:text-inherit [&_span]:text-current [&_svg]:text-current ${
                          navIsActive || isActive(item.path)
                            ? "bg-slate-700/90 !text-white shadow-md"
                            : "!text-slate-300 hover:bg-slate-800/80 hover:!text-slate-100"
                        }`
                      }
                      onClick={() => {
                        // Close sidebar on mobile only
                        if (window.innerWidth < 1024) {
                          setSidebarOpen(false);
                        }
                      }}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-800/80">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 transition-colors font-semibold"
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
