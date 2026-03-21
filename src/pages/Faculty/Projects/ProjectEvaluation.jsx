import React from "react";
import { useGroups } from "../../../hooks/useSpmsData";

const ProjectEvaluation = () => {
  const { data: groups, isLoading, error } = useGroups();
  const group = groups[0];

  if (isLoading) {
    return <div className="p-6">Loading evaluation data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load evaluation data.</div>;
  }

  if (!group) {
    return <div className="p-6">No group available for evaluation.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Project Evaluation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
             <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">Evaluate: {group.project}</h3>
             
             <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requirement Analysis (20)</label>
                   <input type="number" min="0" max="20" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="Enter marks" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Design & Methodology (20)</label>
                   <input type="number" min="0" max="20" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="Enter marks" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Implementation (30)</label>
                   <input type="number" min="0" max="30" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="Enter marks" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Presentation & Viva (30)</label>
                   <input type="number" min="0" max="30" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="Enter marks" />
                 </div>
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Overall Remarks</label>
                  <textarea rows="3" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="Enter detailed feedback..."></textarea>
               </div>
               
               <div className="flex gap-4 pt-4">
                 <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold">Submit Marks</button>
                 <button type="button" className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-semibold">Save Draft</button>
               </div>
             </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Rubrics Guide</h4>
            <div className="text-sm space-y-4 text-gray-600 dark:text-gray-400">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-300">Requirement Analysis</p>
                <p>Clarity of objective, scope definition, and feasibility study.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-300">Implementation</p>
                <p>Code quality, functionality, error handling, and UI/UX.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEvaluation;
