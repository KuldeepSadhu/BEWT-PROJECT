import React from "react";
import DashboardCard from "../../Components/DashboardCard.jsx";
import { dummyGroups } from "../../utils/dummyData";

const StudentDashboard = () => {
  const myGroup = dummyGroups[0];

  return (
    <div>
      <h2 className="page-title">Student Dashboard</h2>
      <p className="page-subtitle">Stay aligned with project milestones and your team timeline.</p>

      <div className="mb-8 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <DashboardCard title="Project Progress" value={`${myGroup.progress}%`} color="indigo" />
        <DashboardCard title="Upcoming Meetings" value="1" color="emerald" />
        <DashboardCard title="Pending Tasks" value="3" color="amber" />
      </div>

      <div className="surface-card p-6">
        <h3 className="mb-4 text-xl font-bold text-slate-900">Project: {myGroup.project}</h3>

        <p className="mb-2 text-slate-700">
          <strong className="text-slate-900">Guide:</strong> {myGroup.guide}
        </p>
        <p className="mb-4 text-slate-700">
          <strong className="text-slate-900">Current Status:</strong> {myGroup.status}
        </p>

        <div className="surface-card-soft p-4">
          <h4 className="mb-2 font-bold text-slate-900">Team Members:</h4>
          <ul className="list-disc ml-5 text-sm text-slate-700">
            {myGroup.students.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
