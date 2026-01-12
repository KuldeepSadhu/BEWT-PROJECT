import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRole, isValidRole } from "../utils/auth";

const ProtectedRoute = ({ allowedRole }) => {
  const userRole = getUserRole();

  // If no valid role, redirect to login
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // If role doesn't match allowed role, redirect to login
  if (userRole !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
