import React from "react";
import DashboardCard from "../../Components/DashboardCard.jsx";

const FacultyDashboard = () => {
  return (
    <div>
      <h2 className="page-title">Faculty Dashboard</h2>
      <p className="page-subtitle">Monitor your groups, meetings, and evaluation pipeline.</p>

      <div className="mb-8 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Assigned Groups" value="8" color="emerald" />
        <DashboardCard title="New Proposals" value="4" color="amber" />
        <DashboardCard title="Meetings" value="2" color="blue" />
        <DashboardCard title="Evaluations" value="3" color="indigo" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="surface-card p-5">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">My Groups</h3>
          <ul className="list-disc ml-5 space-y-1 text-slate-700">
            <li>CS-G12: Smart Attendance</li>
            <li>IT-B4: AI Resume Parser</li>
            <li>CS-G15: Blockchain Voting</li>
          </ul>
        </div>

        <div className="surface-card-soft p-5">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Upcoming Meetings</h3>
          <p className="text-sm text-slate-700">Today at 2:00 PM: CS-G12 Sync</p>
          <p className="mt-2 text-sm text-slate-700">Tomorrow at 10:30 AM: Review</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
