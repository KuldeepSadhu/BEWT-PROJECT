/**
 * Authentication utility functions
 */

// Valid roles in the system
export const VALID_ROLES = ["admin", "faculty", "student"];

/**
 * Validates if a role is valid
 * @param {string} role - The role to validate
 * @returns {boolean} - True if role is valid, false otherwise
 */
export const isValidRole = (role) => {
  return role && VALID_ROLES.includes(role);
};

/**
 * Gets and validates the user role from localStorage
 * Clears invalid roles automatically
 * @returns {string|null} - Valid role or null
 */
export const getUserRole = () => {
  const role = localStorage.getItem("role");
  
  if (isValidRole(role)) {
    return role;
  }
  
  // Clear invalid role from localStorage
  if (role) {
    localStorage.removeItem("role");
  }
  
  return null;
};

/**
 * Sets the user role in localStorage (with validation)
 * @param {string} role - The role to set
 * @returns {boolean} - True if role was set successfully, false if invalid
 */
export const setUserRole = (role) => {
  if (isValidRole(role)) {
    localStorage.setItem("role", role);
    return true;
  }
  return false;
};

/**
 * Clears the user role from localStorage
 */
export const clearUserRole = () => {
  localStorage.removeItem("role");
};
