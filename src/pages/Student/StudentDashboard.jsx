import React from "react";
import DashboardCard from "../../Components/DashboardCard.jsx";
import { dummyGroups } from "../../utils/dummyData";

const StudentDashboard = () => {
  // Mocking logged in student's group
  const myGroup = dummyGroups[0];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Student Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard
          title="Project Progress"
          value={`${myGroup.progress}%`}
          color="indigo"
        />
        <DashboardCard title="Upcoming Meetings" value="1" color="emerald" />
        <DashboardCard title="Pending Tasks" value="3" color="amber" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Project: {myGroup.project}
        </h3>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <strong className="text-gray-800 dark:text-white">Guide:</strong>{" "}
          {myGroup.guide}
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          <strong className="text-gray-800 dark:text-white">
            Current Status:
          </strong>{" "}
          {myGroup.status}
        </p>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
          <h4 className="font-bold mb-2 text-gray-800 dark:text-white">
            Team Members:
          </h4>
          <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
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
