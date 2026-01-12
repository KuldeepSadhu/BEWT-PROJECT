import React from "react";
import DashboardCard from "../../Components/DashboardCard";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Projects" value="45" color="blue" />
        <DashboardCard title="Pending Approvals" value="12" color="amber" />
        <DashboardCard title="Active Groups" value="38" color="emerald" />
        <DashboardCard title="Total Faculty" value="15" color="indigo" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-800 dark:text-white">
          Recent Project Proposals
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">Project Name</th>
                <th className="p-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">Department</th>
                <th className="p-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">Faculty</th>
                <th className="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">Smart Attendance System</td>
                <td className="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">Computer Science</td>
                <td className="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">Prof. Sharma</td>
                <td className="p-3 border border-gray-200 dark:border-gray-600 text-center">
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded text-xs font-bold">Pending</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">AI Resume Parser</td>
                <td className="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">IT</td>
                <td className="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">Dr. Verma</td>
                <td className="p-3 border border-gray-200 dark:border-gray-600 text-center">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-bold">Approved</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
