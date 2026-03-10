import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth.js";

const ProtectedRoute = ({ allowedRole }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  // Not authenticated - redirect to login
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but wrong role - redirect to their dashboard
  if (userRole !== allowedRole) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  // Authenticated and correct role - render the route
  return <Outlet />;
};

export default ProtectedRoute;

// ## 6. Create `.env` file in `frontend/` root (NEW FILE)

// VITE_API_URL=http://localhost:5000/api
