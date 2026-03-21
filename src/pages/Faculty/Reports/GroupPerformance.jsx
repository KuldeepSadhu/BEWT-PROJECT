import React from "react";
import { FiTrendingUp, FiBarChart2 } from "react-icons/fi";
import { useGroups } from "../../../hooks/useSpmsData";

const GroupPerformance = () => {
  const { data: groups, isLoading, error } = useGroups();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Group Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
           <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
             <FiTrendingUp className="text-green-500" /> Overall Progress
           </h3>
           <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded text-gray-400 dark:text-gray-500">
             [Chart Placeholder]
           </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
           <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
             <FiBarChart2 className="text-blue-500" /> Category Analysis
           </h3>
           <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded text-gray-400 dark:text-gray-500">
             [Chart Placeholder]
           </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 border-b dark:border-gray-600">Group ID</th>
              <th className="p-4 border-b dark:border-gray-600">Project Title</th>
              <th className="p-4 border-b dark:border-gray-600">Guide</th>
              <th className="p-4 border-b dark:border-gray-600">Progress</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Score</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {isLoading && (
              <tr>
                <td colSpan="5" className="p-4 text-center">Loading groups...</td>
              </tr>
            )}
            {!isLoading && error && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-red-600">Failed to load groups.</td>
              </tr>
            )}
            {!isLoading && !error && groups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-none">
                <td className="p-4 font-mono text-sm">{group.id}</td>
                <td className="p-4 font-semibold">{group.project}</td>
                <td className="p-4">{group.guide}</td>
                <td className="p-4">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${
                        group.progress >= 75 ? "bg-green-600" :
                        group.progress >= 40 ? "bg-blue-600" : 
                        "bg-yellow-500"
                      }`} 
                      style={{ width: `${group.progress}%` }}
                    ></div>
                  </div>
                </td>
                <td className="p-4 text-center font-bold text-gray-800 dark:text-gray-200">
                  {group.progress > 80 ? "A" : group.progress > 50 ? "B" : "C"}
                </td>
              </tr>
            ))}
            {!isLoading && !error && groups.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center">No groups found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupPerformance;
