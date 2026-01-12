import React from "react";

const GroupList = () => {
  const groups = [
    { id: "G1", project: "Smart Attendance", students: ["Sadhu", "Kuldeep"], progress: "65%" },
    { id: "G2", project: "AI Resume Parser", students: ["Sarah Smith", "Sam Wilson"], progress: "40%" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Mentored Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((g) => (
          <div key={g.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-700">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{g.id}: {g.project}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300"><strong>Students:</strong> {g.students.join(", ")}</p>
            <div className="mt-4">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Progress: {g.progress}</span>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-1">
                <div 
                  className="bg-green-500 h-2 rounded" 
                  style={{ width: g.progress }}
                ></div>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-1 rounded transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
