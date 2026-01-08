import React from "react";

const DashboardCard = ({ title, value, color }) => {
  const bgColors = {
    blue: "bg-blue-500",
    emerald: "bg-green-500",
    indigo: "bg-indigo-500",
    amber: "bg-yellow-500",
  };

  return (
    <div className={`${bgColors[color] || "bg-gray-500"} p-4 rounded shadow-md text-white`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
