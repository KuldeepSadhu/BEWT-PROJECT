import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  FiDownload,
} from "react-icons/fi";
import { logout, getCurrentUser } from "../../utils/auth";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = getCurrentUser();
  const displayName = currentUser?.name || "Student";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/student/dashboard" },
    { icon: FiUsers, label: "My Group", path: "/student/group/my-group" },
    { icon: FiFolder, label: "My Project", path: "/student/project" },
    {
      icon: FiFileText,
      label: "Project Details",
      path: "/student/projects/details",
    },
    {
      icon: FiFileText,
      label: "Submit Proposal",
      path: "/student/projects/proposal",
    },
    {
      icon: FiCalendar,
      label: "Meeting Schedule",
      path: "/student/meetings/schedule",
    },
    {
      icon: FiCalendar,
      label: "Meeting History",
      path: "/student/meetings/history",
    },
    { icon: FiDownload, label: "Reports", path: "/student/reports/progress" },
    { icon: FiUser, label: "Profile", path: "/student/profile" },
  ];

  const isActive = (path) => {
    if (location.pathname === path) return true;
    if (path !== "/student/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white/85 backdrop-blur border-b border-slate-200 shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 gap-3">
          <div className="flex items-center gap-3 min-w-fit">
            <h1 className="text-xl font-bold text-slate-900">SPMS</h1>
            <span className="text-slate-500 text-sm hidden sm:inline">Student Workspace</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto max-w-[56vw] px-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive: navIsActive }) =>
                    `whitespace-nowrap flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-sm visited:text-inherit [&_span]:text-current [&_svg]:text-current ${
                      navIsActive || isActive(item.path)
                        ? "bg-teal-700 !text-white shadow-sm"
                        : "!text-slate-700 hover:bg-slate-100 hover:!text-slate-900"
                    }`
                  }
                >
                  <Icon size={16} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-3 min-w-fit">
            <div className="hidden lg:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-slate-800">
              <FiUser size={14} />
              <span className="text-sm font-semibold truncate max-w-[140px]">{displayName}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors text-slate-900 font-semibold"
            >
              <FiLogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-700"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="mb-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800">
              <FiUser size={16} />
              <div>
                <p className="text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-slate-500">student</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive: navIsActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors visited:text-inherit [&_span]:text-current [&_svg]:text-current ${
                        navIsActive || isActive(item.path)
                          ? "bg-teal-700 !text-white"
                          : "!text-slate-700 hover:bg-slate-100 hover:!text-slate-900"
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
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
