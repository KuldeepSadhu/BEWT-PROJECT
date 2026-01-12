import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme class
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <FiMoon size={20} className="text-gray-700 dark:text-gray-300" />
      ) : (
        <FiSun size={20} className="text-yellow-500 dark:text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
