import React from "react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { useGroups } from "../../../hooks/useSpmsData";

const GroupStatus = () => {
  const { data: groups, isLoading, error } = useGroups();
  const myGroup = groups[0];
  const steps = [
    { name: "Group Formation", status: "completed" },
    { name: "Guide Allocation", status: "completed" },
    { name: "Topic Approval", status: myGroup?.status === "Approved" ? "completed" : "current" },
    { name: "Synopsis Submission", status: myGroup?.progress >= 30 ? "completed" : "current" },
    { name: "Mid-Term Review", status: myGroup?.progress >= 60 ? "completed" : "pending" },
    { name: "Final Submission", status: myGroup?.progress >= 90 ? "completed" : "pending" },
  ];

  if (isLoading) {
    return <div className="p-6">Loading group status...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load group status.</div>;
  }

  if (!myGroup) {
    return <div className="p-6">No group status available.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Group Status Tracking</h2>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 relative pb-8 last:pb-0">
              {index !== steps.length - 1 && (
                <div className={`absolute left-3.5 top-8 bottom-0 w-0.5 ${
                  step.status === "completed" ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                }`}></div>
              )}
              
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                 step.status === "completed" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                 step.status === "current" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 ring-4 ring-blue-50 dark:ring-blue-900/20" :
                 "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
              }`}>
                {step.status === "completed" ? <FiCheckCircle size={20} /> : <FiCircle size={20} />}
              </div>
              
              <div className="pt-1">
                <h4 className={`font-bold text-lg ${
                   step.status === "current" ? "text-blue-600 dark:text-blue-400" :
                   step.status === "completed" ? "text-gray-800 dark:text-gray-200" :
                   "text-gray-400 dark:text-gray-500"
                }`}>{step.name}</h4>
                {step.status === "current" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Action required: Please submit your synopsis document by due date.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupStatus;
