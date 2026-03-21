import React from "react";
import { useGroups } from "../../hooks/useSpmsData";

const GroupList = () => {
  const { data: groups, isLoading, error } = useGroups();

  if (isLoading) {
    return <div className="p-6">Loading groups...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load groups.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Mentored Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">No groups found.</div>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-700">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{group.groupID}: {group.project}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300"><strong>Students:</strong> {group.students.join(", ")}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300"><strong>Guide:</strong> {group.guide}</p>
              <div className="mt-4">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Progress: {group.progress}%</span>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-1">
                  <div className="bg-green-500 h-2 rounded" style={{ width: `${group.progress}%` }}></div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{group.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupList;
