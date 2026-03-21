import React from "react";
import { FiDownload, FiFileText } from "react-icons/fi";
import { useSubmissions } from "../../../hooks/useSpmsData";

const DownloadSummary = () => {
  const { data: submissions, isLoading, error } = useSubmissions();

  if (isLoading) {
    return <div className="p-6">Loading summary files...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load summary files.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Download Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col justify-between h-48">
            <div className="flex items-start justify-between">
              <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-lg text-indigo-600 dark:text-indigo-400">
                <FiFileText size={28} />
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">PDF</span>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-1">{doc.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{doc.date} | {doc.size}</p>
            </div>

            <button className="w-full mt-4 border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors">
              <FiDownload /> {doc.fileName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadSummary;
