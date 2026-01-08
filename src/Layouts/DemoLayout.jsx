import { Outlet, Link } from "react-router-dom";

export default function DemoLayout() {
  return (
    <div style={{ padding: "20px", border: "2px solid blue" }}>
      <h2>Demo Layout</h2>

      <hr />
      <Outlet />
      <hr />

      <footer>Footer always visible</footer>
    </div>
  );
}
