import React from "react";
import DashboardCard from "../../components/DashboardCard";

const FacultyDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Faculty Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Assigned Groups" value="8" color="emerald" />
        <DashboardCard title="New Proposals" value="4" color="amber" />
        <DashboardCard title="Meetings" value="2" color="blue" />
        <DashboardCard title="Evaluations" value="3" color="indigo" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow border">
          <h3 className="text-lg font-semibold mb-2">My Groups</h3>
          <ul className="list-disc ml-5">
            <li>CS-G12: Smart Attendance</li>
            <li>IT-B4: AI Resume Parser</li>
            <li>CS-G15: Blockchain Voting</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow border">
          <h3 className="text-lg font-semibold mb-2">Upcoming Meetings</h3>
          <p className="text-sm">Today at 2:00 PM: CS-G12 Sync</p>
          <p className="text-sm">Tomorrow at 10:30 AM: Review</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
