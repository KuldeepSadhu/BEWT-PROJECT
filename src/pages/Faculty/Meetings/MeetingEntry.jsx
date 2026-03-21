import React from "react";
import { useGroups } from "../../../hooks/useSpmsData";

const MeetingEntry = () => {
  const { data: groups } = useGroups();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Meeting Entry</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Schedule New Meeting</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Group</label>
              <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500">
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>{g.project} ({g.id})</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input type="date" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                <input type="time" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meeting Type</label>
              <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500">
                <option>First Review</option>
                <option>Progress Check</option>
                <option>Final Review</option>
                <option>General Discussion</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Agenda</label>
              <textarea rows="3" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>

            <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors">
              Schedule Meeting
            </button>
          </form>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800">
          <h3 className="text-lg font-semibold mb-2 text-indigo-900 dark:text-indigo-200">Guidelines</h3>
          <ul className="list-disc list-inside space-y-2 text-indigo-800 dark:text-indigo-300">
            <li>Ensure all group members are notified.</li>
            <li>Meeting duration should generally be 30-45 minutes.</li>
            <li>Regular progress checks are mandatory every 2 weeks.</li>
            <li>Update the meeting status after completion.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeetingEntry;
