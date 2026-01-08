import React from "react";

const ProjectList = () => {
  const projects = [
    { id: 1, name: "Smart Attendance System", student: "Kuldeep Sadhu", department: "CS", status: "Pending" },
    { id: 2, name: "AI Resume Parser", student: "Sarah Smith", department: "IT", status: "Approved" },
    { id: 3, name: "Blockchain Voting", student: "Mike Ross", department: "CS", status: "Rejected" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage All Projects</h2>
      <div className="bg-white rounded shadow overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">Project Name</th>
              <th className="p-3 border-b">Student</th>
              <th className="p-3 border-b">Department</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{p.name}</td>
                <td className="p-3 border-b">{p.student}</td>
                <td className="p-3 border-b">{p.department}</td>
                <td className="p-3 border-b font-semibold">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
