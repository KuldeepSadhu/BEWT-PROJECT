import React from "react";
import { useGroups } from "../../../hooks/useSpmsData";

const ProjectProgress = () => {
  const { data: groups, isLoading, error } = useGroups();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Project Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && <div>Loading progress data...</div>}
        {!isLoading && error && <div className="text-red-600">Failed to load progress data.</div>}
        {!isLoading && !error && groups.map((group) => (
          <div key={group.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{group.project}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{group.guide}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                <span>Overall Progress</span>
                <span>{group.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full">
                <div 
                  className={`h-2.5 rounded-full ${
                    group.progress >= 75 ? "bg-green-600" :
                    group.progress >= 40 ? "bg-blue-600" : 
                    "bg-yellow-500"
                  }`} 
                  style={{ width: `${group.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked readOnly className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                <span className="text-sm text-gray-700 dark:text-gray-300 line-through">Project Selection</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={group.progress >= 20} readOnly className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                <span className={`text-sm ${group.progress >= 20 ? "text-gray-700 dark:text-gray-300 line-through" : "text-gray-500 dark:text-gray-500"}`}>Synopsis Approval</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={group.progress >= 40} readOnly className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                <span className={`text-sm ${group.progress >= 40 ? "text-gray-700 dark:text-gray-300 line-through" : "text-gray-500 dark:text-gray-500"}`}>Mid-Term Review</span>
              </div>
              <div className="flex items-center gap-2">
                 <input type="checkbox" checked={group.progress >= 80} readOnly className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                 <span className={`text-sm ${group.progress >= 80 ? "text-gray-700 dark:text-gray-300 line-through" : "text-gray-500 dark:text-gray-500"}`}>Final Documentation</span>
              </div>
            </div>

            <button className="w-full border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 font-medium py-2 rounded transition-colors">
              Update Progress
            </button>
          </div>
        ))}
        {!isLoading && !error && groups.length === 0 && <div>No project progress records found.</div>}
      </div>
    </div>
  );
};

export default ProjectProgress;
