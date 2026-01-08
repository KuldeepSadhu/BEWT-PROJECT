import React from "react";
import DashboardCard from "../../components/DashboardCard";

const StudentDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard title="Progress" value="65%" color="indigo" />
        <DashboardCard title="Completed Tasks" value="18/24" color="emerald" />
        <DashboardCard title="New Feedback" value="3" color="amber" />
      </div>

      <div className="bg-white p-6 rounded shadow border">
        <h3 className="text-xl font-bold mb-4">Project: Smart Attendance System</h3>
        <p className="mb-2"><strong>Guide:</strong> Prof. Rajesh Sharma</p>
        <p className="mb-4"><strong>Current Status:</strong> Phase 2 - Implementation</p>
        
        <div className="border rounded p-4 bg-gray-50">
           <h4 className="font-bold mb-2">Team Members:</h4>
           <ul className="list-disc ml-5 text-sm">
              <li>John Doe (UI/UX)</li>
              <li>Sarah Smith (Backend)</li>
              <li>Mike Ross (DevOps)</li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;