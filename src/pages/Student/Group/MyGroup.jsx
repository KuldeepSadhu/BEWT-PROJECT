import React from "react";
import { useGroups } from "../../../hooks/useSpmsData";

const MyGroup = () => {
  const { data: groups, isLoading, error } = useGroups();
  const myGroup = groups[0];

  if (isLoading) {
    return <div className="p-6">Loading group...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load group.</div>;
  }

  if (!myGroup) {
    return <div className="p-6">No group assigned.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Group</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
         <div className="flex justify-between items-start mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{myGroup.project}</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">Group ID: {myGroup.groupID}</p>
            </div>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold">
              {myGroup.status}
            </span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">Team Members</h4>
               <ul className="space-y-3">
                 {myGroup.students.map((student) => (
                   <li key={student} className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold">
                       {student.charAt(0)}
                     </div>
                     <span className="text-gray-800 dark:text-gray-200">{student}</span>
                   </li>
                 ))}
               </ul>
            </div>

            <div>
               <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">Project Guide</h4>
               <div className="flex items-center gap-3 p-3 border border-indigo-100 dark:border-indigo-900 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    PG
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{myGroup.guide}</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400">Faculty Guide</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MyGroup;
