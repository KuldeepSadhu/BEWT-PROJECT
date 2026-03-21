import React from "react";
import { FiFileText, FiClock, FiEye } from "react-icons/fi";
import { useSubmissions } from "../../../hooks/useSpmsData";

const SubmissionHistory = () => {
  const { data: submissions, isLoading, error } = useSubmissions();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Submission History</h2>

      <div className="space-y-4">
        {isLoading && <div>Loading submissions...</div>}
        {!isLoading && error && <div className="text-red-600">Failed to load submissions.</div>}
        {!isLoading && !error && submissions.map((sub) => (
          <div key={sub.id} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-full text-indigo-600 dark:text-indigo-400">
                  <FiFileText size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{sub.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center gap-1"><FiClock size={14} /> {sub.date}</span>
                    <span>&bull;</span>
                    <span className={`font-semibold ${
                      sub.status === "Approved" ? "text-green-600 dark:text-green-400" :
                      sub.status === "Rejected" ? "text-red-600 dark:text-red-400" :
                      "text-yellow-600 dark:text-yellow-500"
                    }`}>{sub.status}</span>
                  </div>
                  {sub.remarks && sub.remarks !== "-" && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                      <span className="font-semibold">Feedback:</span> {sub.remarks}
                    </p>
                  )}
                </div>
              </div>

              <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <FiEye size={20} />
              </button>
            </div>
          </div>
        ))}
        {!isLoading && !error && submissions.length === 0 && <div>No submissions found.</div>}
      </div>
    </div>
  );
};

export default SubmissionHistory;
