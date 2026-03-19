import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";

// Keep the app in light mode by default and clear any stale forced dark setting.
document.documentElement.classList.remove("dark");
if (localStorage.getItem("theme") === "dark") {
  localStorage.setItem("theme", "light");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
