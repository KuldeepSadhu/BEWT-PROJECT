import React from "react";

const DashboardCard = ({ title, value, color }) => {
  const bgColors = {
    blue: "from-sky-600 to-sky-700",
    emerald: "from-teal-600 to-teal-700",
    indigo: "from-cyan-700 to-blue-700",
    amber: "from-amber-500 to-amber-600",
  };

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${bgColors[color] || "from-slate-500 to-slate-600"} p-6 text-white shadow-lg transition-transform duration-200 hover:-translate-y-1`}
    >
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/85">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
