import React from "react";
import { dummyGroups } from "../../../utils/dummyData";
import { FiCheck, FiX } from "react-icons/fi";

const GroupApproval = () => {
  const pendingGroups = dummyGroups.filter(g => g.status === "Pending");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Group Approval</h2>
      
      {pendingGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingGroups.map((group) => (
            <div key={group.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">{group.project}</h3>
                   <span className="text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded font-semibold mt-2 inline-block">
                     {group.status}
                   </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">ID: {group.id}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Members:</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  {group.students.map((student, index) => (
                    <li key={index}>{student}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                 <p className="text-gray-700 dark:text-gray-300">
                   <span className="font-semibold">Proposed Guide:</span> {group.guide}
                 </p>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <FiCheck /> Approve
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <FiX /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No pending groups to approve.</p>
        </div>
      )}
    </div>
  );
};

export default GroupApproval;
