import React from "react";

const DashboardCard = ({ title, value, color }) => {
  const bgColors = {
    blue: "bg-blue-500 dark:bg-blue-600",
    emerald: "bg-green-500 dark:bg-green-600",
    indigo: "bg-indigo-500 dark:bg-indigo-600",
    amber: "bg-yellow-500 dark:bg-yellow-600",
  };

  return (
    <div className={`${bgColors[color] || "bg-gray-500 dark:bg-gray-600"} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white`}>
      <h3 className="text-lg font-semibold mb-2 opacity-90">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
