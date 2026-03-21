import React from "react";
import { useStudents } from "../../../hooks/useSpmsData";

const Attendance = () => {
  const { data: students, isLoading, error } = useStudents();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Meeting Attendance</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 items-center justify-between">
           <h3 className="font-semibold text-gray-700 dark:text-gray-300">Mark Attendance for: <span className="text-indigo-600 dark:text-indigo-400">Review Meeting - 25 Oct 2025</span></h3>
           <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm">Save Attendance</button>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 border-b dark:border-gray-600">Roll No</th>
              <th className="p-4 border-b dark:border-gray-600">Student Name</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Status</th>
              <th className="p-4 border-b dark:border-gray-600">Remarks</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {isLoading && (
              <tr>
                <td colSpan="4" className="p-4 text-center">Loading students...</td>
              </tr>
            )}
            {!isLoading && error && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-red-600">Failed to load students.</td>
              </tr>
            )}
            {!isLoading && !error && students.slice(0, 3).map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-none">
                <td className="p-4 font-mono">{student.rollNo}</td>
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4 text-center">
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" className="px-4 py-1 text-sm font-medium text-white bg-green-600 rounded-l-lg hover:bg-green-700 focus:z-10 focus:ring-2 focus:ring-green-500">
                      Present
                    </button>
                    <button type="button" className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600">
                      Absent
                    </button>
                    <button type="button" className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600">
                      Leave
                    </button>
                  </div>
                </td>
                <td className="p-4">
                  <input type="text" placeholder="Optional remarks" className="w-full p-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" />
                </td>
              </tr>
            ))}
            {!isLoading && !error && students.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
