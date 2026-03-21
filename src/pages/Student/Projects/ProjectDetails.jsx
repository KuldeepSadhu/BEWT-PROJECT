import React from "react";
import { useGroups } from "../../../hooks/useSpmsData";

const ProjectDetails = () => {
  const { data: groups, isLoading, error } = useGroups();
  const myGroup = groups[0];

  if (isLoading) {
    return <div className="p-6">Loading project details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load project details.</div>;
  }

  if (!myGroup) {
    return <div className="p-6">No project details found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Project Details</h2>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-6">
        <div>
          <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{myGroup.project}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Domain: {myGroup.domain}</p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Abstract</h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {myGroup.abstract || "No abstract available for this project."}
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Technologies Used</h4>
          <div className="flex flex-wrap gap-3">
             {(myGroup.technologies.length > 0 ? myGroup.technologies : ["Not specified"]).map((tech) => (
               <span key={tech} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-semibold border border-gray-200 dark:border-gray-600">
                 {tech}
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
