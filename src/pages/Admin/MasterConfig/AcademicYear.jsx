import React from "react";
import { useAcademicYears } from "../../../hooks/useSpmsData";

const AcademicYear = () => {
  const { data: academicYears, isLoading, error } = useAcademicYears();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Academic Year</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
          Set New Academic Year
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 border-b dark:border-gray-600">Year</th>
              <th className="p-4 border-b dark:border-gray-600">Start Date</th>
              <th className="p-4 border-b dark:border-gray-600">End Date</th>
              <th className="p-4 border-b dark:border-gray-600">Status</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Current</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {isLoading && (
              <tr>
                <td colSpan="5" className="p-4 text-center">Loading academic years...</td>
              </tr>
            )}
            {!isLoading && error && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-red-600">Failed to load academic years.</td>
              </tr>
            )}
            {!isLoading && !error && academicYears.map((ay) => (
              <tr key={ay.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-none">
                <td className="p-4 font-bold">{ay.year}</td>
                <td className="p-4">{ay.startDate}</td>
                <td className="p-4">{ay.endDate}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    ay.status === "Active" 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}>
                    {ay.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {ay.isCurrent && (
                    <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded text-xs font-bold">
                      Current
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!isLoading && !error && academicYears.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center">No academic years found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicYear;
