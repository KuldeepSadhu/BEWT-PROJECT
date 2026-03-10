import React, { useEffect, useState } from "react";
import DashboardCard from "../../Components/DashboardCard.jsx";
import api from "../../utils/api.js";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, proposalsRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/proposals/recent"),
        ]);
        setStats(statsRes.data.stats);
        setProposals(proposalsRes.data.proposals);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again.");
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      default:
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Total Projects"
          value={stats?.totalProjects ?? 0}
          color="blue"
        />
        <DashboardCard
          title="Pending Approvals"
          value={stats?.pendingApprovals ?? 0}
          color="amber"
        />
        <DashboardCard
          title="Active Groups"
          value={stats?.activeGroups ?? 0}
          color="emerald"
        />
        <DashboardCard
          title="Total Faculty"
          value={stats?.totalFaculty ?? 0}
          color="indigo"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-800 dark:text-white">
          Recent Project Proposals
        </h3>
        <div className="overflow-x-auto">
          {proposals.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6">
              No proposals found.
            </p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    Project Name
                  </th>
                  <th className="p-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    Department
                  </th>
                  <th className="p-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    Faculty
                  </th>
                  <th className="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr
                    key={proposal._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                      {proposal.title}
                    </td>
                    <td className="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                      {proposal.department}
                    </td>
                    <td className="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                      {proposal.faculty?.name || "—"}
                    </td>
                    <td className="p-3 border border-gray-200 dark:border-gray-600 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${getStatusStyle(proposal.status)}`}
                      >
                        {proposal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
