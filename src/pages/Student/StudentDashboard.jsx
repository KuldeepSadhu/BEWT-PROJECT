import React from "react";
import DashboardCard from "../../Components/DashboardCard";

const StudentDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Student Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard title="Progress" value="65%" color="indigo" />
        <DashboardCard title="Completed Tasks" value="18/24" color="emerald" />
        <DashboardCard title="New Feedback" value="3" color="amber" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Project: Smart Attendance System</h3>
        <p className="mb-2 text-gray-700 dark:text-gray-300"><strong className="text-gray-800 dark:text-white">Guide:</strong> Prof. Rajesh Sharma</p>
        <p className="mb-4 text-gray-700 dark:text-gray-300"><strong className="text-gray-800 dark:text-white">Current Status:</strong> Phase 2 - Implementation</p>
        
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
           <h4 className="font-bold mb-2 text-gray-800 dark:text-white">Team Members:</h4>
           <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
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