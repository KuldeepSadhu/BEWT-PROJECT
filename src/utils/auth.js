import api from "./api";

// Login function
export const login = async (email, password, role) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
      role,
    });
    
    const { token, user } = response.data;

    // Store token and user
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

// Register function
export const register = async (
  name,
  email,
  password,
  role,
  additionalData = {},
) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
      ...additionalData,
    });

    const { token, user } = response.data;

    // Store token and user
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// Check if authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Get user role
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || null;
};
