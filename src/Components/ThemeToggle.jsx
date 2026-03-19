const ThemeToggle = () => {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
  return null;
};

export default ThemeToggle;
