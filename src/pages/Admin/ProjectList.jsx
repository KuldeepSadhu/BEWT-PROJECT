import React from "react";

const ProjectList = () => {
  const projects = [
    { id: 1, name: "Smart Attendance System", student: "Kuldeep Sadhu", department: "CS", status: "Pending" },
    { id: 2, name: "AI Resume Parser", student: "Sarah Smith", department: "IT", status: "Approved" },
    { id: 3, name: "Blockchain Voting", student: "Mike Ross", department: "CS", status: "Rejected" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Manage All Projects</h2>
      <div className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden border dark:border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-3 border-b dark:border-gray-600">Project Name</th>
              <th className="p-3 border-b dark:border-gray-600">Student</th>
              <th className="p-3 border-b dark:border-gray-600">Department</th>
              <th className="p-3 border-b dark:border-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700 last:border-none">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.student}</td>
                <td className="p-3">{p.department}</td>
                <td className="p-3 font-semibold">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
