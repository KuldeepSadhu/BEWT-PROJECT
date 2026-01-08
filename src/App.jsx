import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./auth/Login";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import FacultyLayout from "./layouts/FacultyLayout";
import StudentLayout from "./layouts/StudentLayout";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProjectList from "./pages/Admin/ProjectList";

import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
import GroupList from "./pages/Faculty/GroupList";

import StudentDashboard from "./pages/Student/StudentDashboard";
import MyProject from "./pages/Student/MyProject";

import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectList />} />
        </Route>
      </Route>

      {/* Faculty Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="faculty" />}>
        <Route path="/faculty" element={<FacultyLayout />}>
          <Route index element={<Navigate to="/faculty/dashboard" replace />} />
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="groups" element={<GroupList />} />
        </Route>
      </Route>

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="project" element={<MyProject />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default App;