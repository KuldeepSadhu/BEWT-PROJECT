import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { animate, stagger } from "animejs";

const roleButtons = [
  {
    path: "/admin/login",
    title: "Continue as Admin",
    description: "Configure cycles, approvals, and platform settings.",
    gradient: "from-teal-700 to-teal-600",
  },
  {
    path: "/faculty/login",
    title: "Continue as Faculty",
    description: "Manage groups, meetings, and evaluations.",
    gradient: "from-sky-700 to-sky-600",
  },
  {
    path: "/student/login",
    title: "Continue as Student",
    description: "Track milestones, submissions, and reports.",
    gradient: "from-cyan-700 to-blue-700",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const card = containerRef.current.querySelector(".role-card");
    const title = containerRef.current.querySelector(".role-title");
    const buttons = containerRef.current.querySelectorAll(".role-button");

    animate(card, {
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 680,
      ease: "outExpo",
    });

    animate(title, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 520,
      delay: 120,
      ease: "outQuad",
    });

    animate(buttons, {
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: stagger(100, { start: 190 }),
      duration: 500,
      ease: "outQuad",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center px-4 py-10"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(75,98,133,0.3),transparent_44%),radial-gradient(circle_at_80%_0%,rgba(107,127,157,0.26),transparent_45%)]" />

      <div className="role-card w-full max-w-xl rounded-3xl border border-slate-700/70 bg-slate-900/85 p-8 shadow-2xl backdrop-blur md:p-10">
        <h1 className="role-title text-center text-3xl font-bold text-slate-100 md:text-4xl">
          Student Project Management System
        </h1>
        <p className="mt-3 text-center text-slate-400">Choose your workspace to continue.</p>

        <div className="mt-8 space-y-4">
          {roleButtons.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`role-button w-full rounded-2xl bg-gradient-to-r px-5 py-4 text-left text-white shadow-lg transition-transform hover:-translate-y-0.5 ${item.gradient}`}
            >
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-white/85">{item.description}</p>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          &copy; 2026 SPMS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
