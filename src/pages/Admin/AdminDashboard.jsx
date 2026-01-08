import React from "react";
import DashboardCard from "../../components/DashboardCard";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Projects" value="45" color="blue" />
        <DashboardCard title="Pending Approvals" value="12" color="amber" />
        <DashboardCard title="Active Groups" value="38" color="emerald" />
        <DashboardCard title="Total Faculty" value="15" color="indigo" />
      </div>

      <div className="bg-white p-4 rounded shadow border">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Recent Project Proposals</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Project Name</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Faculty</th>
              <th className="p-1 border text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">Smart Attendance System</td>
              <td className="p-2 border">Computer Science</td>
              <td className="p-2 border">Prof. Sharma</td>
              <td className="p-2 border text-center">
                 <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Pending</span>
              </td>
            </tr>
            <tr>
              <td className="p-2 border">AI Resume Parser</td>
              <td className="p-2 border">IT</td>
              <td className="p-2 border">Dr. Verma</td>
              <td className="p-2 border text-center">
                 <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Approved</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
