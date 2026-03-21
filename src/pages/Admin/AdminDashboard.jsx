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
        setStats(statsRes.data?.stats ?? {});
        setProposals(Array.isArray(proposalsRes.data?.proposals) ? proposalsRes.data.proposals : []);
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
        return "bg-emerald-100 text-emerald-800";
      case "Rejected":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  const getProjectName = (proposal) => {
    const candidates = [
      proposal?.projectName,
      proposal?.title,
      proposal?.name,
      proposal?.project?.projectName,
      proposal?.project?.title,
      proposal?.project?.name,
      proposal?.projectId?.projectName,
      proposal?.projectId?.title,
      proposal?.projectId?.name,
    ];

    const value = candidates.find(
      (item) => typeof item === "string" && item.trim().length > 0,
    );

    return value?.trim() || "N/A";
  };

  const getDepartment = (proposal) => {
    const candidates = [
      proposal?.faculty?.department,
      proposal?.faculty?.dept,
      proposal?.faculty?.profile?.department,
      proposal?.mentor?.department,
      proposal?.mentor?.dept,
      proposal?.mentor?.profile?.department,
      proposal?.guide?.department,
      proposal?.guide?.dept,
      proposal?.guide?.profile?.department,
    ];

    const value = candidates.find(
      (item) => typeof item === "string" && item.trim().length > 0,
    );

    return value?.trim() || "N/A";
  };

  const normalizedProposals = proposals.map((proposal, index) => {
    const facultyName =
      proposal?.faculty?.name?.trim() ||
      proposal?.mentor?.name?.trim() ||
      proposal?.guide?.name?.trim() ||
      "";

    return {
      id: proposal?._id || `proposal-${index}`,
      title: getProjectName(proposal),
      department: getDepartment(proposal),
      facultyName,
      status: proposal?.status || "Pending",
    };
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-slate-500 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">Admin Dashboard</h2>
      <p className="page-subtitle">
        Track projects, approvals, and mentoring activity in one place.
      </p>

      <div className="mb-8 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total Projects" value={stats?.totalProjects ?? 0} color="blue" />
        <DashboardCard
          title="Pending Approvals"
          value={stats?.pendingApprovals ?? 0}
          color="amber"
        />
        <DashboardCard title="Active Groups" value={stats?.activeGroups ?? 0} color="emerald" />
        <DashboardCard title="Total Faculty" value={stats?.totalFaculty ?? 0} color="indigo" />
      </div>

      <div className="surface-card p-6">
        <h3 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">
          Recent Project Proposals
        </h3>
        <div className="mt-4 overflow-x-auto">
          {normalizedProposals.length === 0 ? (
            <p className="py-8 text-center text-slate-500">No proposals found.</p>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-200 p-3 text-slate-700">Project Name</th>
                  <th className="border border-slate-200 p-3 text-slate-700">Department</th>
                  <th className="border border-slate-200 p-3 text-slate-700">Faculty</th>
                  <th className="border border-slate-200 p-3 text-center text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {normalizedProposals.map((proposal) => (
                  <tr key={proposal.id} className="transition-colors hover:bg-slate-50">
                    <td className="border border-slate-200 p-3 text-slate-800">{proposal.title}</td>
                    <td className="border border-slate-200 p-3 text-slate-800">{proposal.department}</td>
                    <td className="border border-slate-200 p-3 text-slate-800">
                      {proposal.facultyName ? (
                        proposal.facultyName
                      ) : (
                        <span className="font-medium text-amber-500">Not Assigned</span>
                      )}
                    </td>
                    <td className="border border-slate-200 p-3 text-center">
                      <span className={`status-chip ${getStatusStyle(proposal.status)}`}>
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
