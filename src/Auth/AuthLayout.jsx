import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const AuthLayout = ({ children, title, subtitle }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const card = containerRef.current.querySelector(".auth-card");
    const items = containerRef.current.querySelectorAll(".auth-anim-item");

    animate(card, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 650,
      ease: "outExpo",
    });

    animate(items, {
      opacity: [0, 1],
      translateY: [16, 0],
      delay: stagger(90, { start: 140 }),
      duration: 520,
      ease: "outQuad",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center px-4 py-10"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.2),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(14,116,144,0.2),transparent_40%)]" />
      <div className="auth-card w-full max-w-md rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-2xl backdrop-blur">
        <div className="auth-anim-item mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        </div>
        <div className="auth-anim-item">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
