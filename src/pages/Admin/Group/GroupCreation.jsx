import React from "react";
import { dummyStudents } from "../../../utils/dummyData";
import { FiPlusCircle, FiCheck } from "react-icons/fi";

const GroupCreation = () => {
  // Filter for 'unassigned' students (mocking by taking odd ID students)
  const unassignedStudents = dummyStudents.filter((s) => s.id % 2 !== 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Group Creation
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Unassigned Students List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">
            Unassigned Students
          </h3>
          <div className="space-y-3">
            {unassignedStudents.map((student) => (
              <div
                key={student.id}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {student.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {student.rollNo} - {student.department}
                  </p>
                </div>
                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                  <FiPlusCircle size={24} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Group Area (Mockup) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">
            New Group
          </h3>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/30 text-gray-500 dark:text-gray-400">
            <p className="mb-2">Select students to form a group</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg mt-4 opacity-50 cursor-not-allowed">
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCreation;
