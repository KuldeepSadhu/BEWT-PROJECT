import api from "./api";

const AUTH_USERS_KEY = "spms_users";
const DEFAULT_PASSWORD = "password123";

const seededUsers = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@college.edu",
    password: DEFAULT_PASSWORD,
    role: "admin",
    department: "Administration",
  },
  {
    id: "faculty-1",
    name: "Prof. Rajesh Sharma",
    email: "rajesh@college.edu",
    password: DEFAULT_PASSWORD,
    role: "faculty",
    department: "Computer Science",
  },
  {
    id: "student-1",
    name: "Kuldeep Sadhu",
    email: "kuldeep@example.com",
    password: DEFAULT_PASSWORD,
    role: "student",
    department: "Computer Science",
    rollNumber: "CS2021001",
  },
];

const persistSession = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

const sanitizeUser = ({ password, ...user }) => user;

const getStoredUsers = () => {
  const raw = localStorage.getItem(AUTH_USERS_KEY);

  if (!raw) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(seededUsers));
    return [...seededUsers];
  }

  try {
    const parsedUsers = JSON.parse(raw);
    if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
      return parsedUsers;
    }
  } catch (error) {
    console.error("Failed to parse stored auth users:", error);
  }

  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(seededUsers));
  return [...seededUsers];
};

const saveStoredUsers = (users) => {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
};

const loginWithLocalAuth = async (email, password, role) => {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (entry) =>
      entry.email.toLowerCase() === normalizedEmail &&
      entry.role === role &&
      entry.password === password,
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email, password, or role",
    };
  }

  const safeUser = sanitizeUser(user);
  const token = `local-${role}-${Date.now()}`;
  persistSession(token, safeUser);

  return { success: true, user: safeUser };
};

const registerWithLocalAuth = async (
  name,
  email,
  password,
  role,
  additionalData = {},
) => {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = users.find((entry) => entry.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists",
    };
  }

  const newUser = {
    id: `${role}-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
    ...additionalData,
  };

  users.push(newUser);
  saveStoredUsers(users);

  const safeUser = sanitizeUser(newUser);
  const token = `local-${role}-${Date.now()}`;
  persistSession(token, safeUser);

  return { success: true, user: safeUser };
};

// Login function
export const login = async (email, password, role) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
      role,
    });

    const { token, user } = response.data;
    persistSession(token, user);
    return { success: true, user };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }

    return loginWithLocalAuth(email, password, role);
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
    persistSession(token, user);
    return { success: true, user };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }

    return registerWithLocalAuth(name, email, password, role, additionalData);
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
