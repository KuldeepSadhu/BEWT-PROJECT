import React from "react";
import { useGroups, useSubmissions } from "../../../hooks/useSpmsData";

const ProgressReport = () => {
  const { data: groups, isLoading, error } = useGroups();
  const { data: submissions } = useSubmissions();
  const myGroup = groups[0];
  const latestReviews = submissions.slice(0, 2);

  if (isLoading) {
    return <div className="p-6">Loading progress report...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load progress report.</div>;
  }

  if (!myGroup) {
    return <div className="p-6">No progress data found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Progress Report</h2>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
         <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-indigo-100 dark:border-indigo-900 mb-4">
               <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{myGroup.progress}%</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Overall Completion</h3>
            <p className="text-gray-500 dark:text-gray-400">Based on phases completed</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Phase Breakdown</h4>
               <div className="space-y-4">
                  {[100, Math.min(myGroup.progress + 15, 100), myGroup.progress, Math.max(myGroup.progress - 60, 0)].map((value, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
                        <span>{["Requirement Analysis", "Design", "Coding", "Testing"][index]}</span>
                        <span className="font-bold text-green-600">{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: `${value}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
               <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Faculty Remarks</h4>
               <div className="space-y-4">
                  {latestReviews.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 shadow-sm">
                      <p className="text-sm text-gray-600 dark:text-gray-300 italic">No remarks available.</p>
                    </div>
                  ) : (
                    latestReviews.map((submission) => (
                      <div key={submission.id} className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 shadow-sm">
                        <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{submission.remarks}"</p>
                        <p className="text-xs text-right text-gray-400 mt-2">- {myGroup.guide}, {submission.date}</p>
                      </div>
                    ))
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProgressReport;
