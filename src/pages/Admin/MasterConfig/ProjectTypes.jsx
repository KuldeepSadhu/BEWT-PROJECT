import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useProjectTypes } from "../../../hooks/useSpmsData";

const ProjectTypes = () => {
  const { data: projectTypes, isLoading, error } = useProjectTypes();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Project Types</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
          Add Project Type
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            Loading project types...
          </div>
        )}
        {!isLoading && error && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-red-200 text-red-600 dark:border-red-700">
            Failed to load project types.
          </div>
        )}
        {!isLoading && !error && projectTypes.map((type) => (
          <div key={type.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{type.type}</h3>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  <FiEdit />
                </button>
                <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                  <FiTrash2 />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                <span className="text-gray-500 dark:text-gray-400">Semester:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{type.semester}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                <span className="text-gray-500 dark:text-gray-400">Credits:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{type.credits}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-sm block mb-1">Description:</span>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{type.description}</p>
              </div>
            </div>
          </div>
        ))}
        {!isLoading && !error && projectTypes.length === 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            No project types found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTypes;
