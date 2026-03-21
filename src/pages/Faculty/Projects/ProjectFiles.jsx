import React from "react";
import { FiFile, FiDownload, FiTrash2 } from "react-icons/fi";
import { useSubmissions } from "../../../hooks/useSpmsData";

const ProjectFiles = () => {
  const { data: submissions, isLoading, error } = useSubmissions();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Project Files</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 border-b dark:border-gray-600">File Name</th>
              <th className="p-4 border-b dark:border-gray-600">Uploaded By</th>
              <th className="p-4 border-b dark:border-gray-600">Date</th>
              <th className="p-4 border-b dark:border-gray-600">Size</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {isLoading && (
              <tr>
                <td colSpan="5" className="p-4 text-center">Loading files...</td>
              </tr>
            )}
            {!isLoading && error && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-red-600">Failed to load files.</td>
              </tr>
            )}
            {!isLoading && !error && submissions.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-none">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-blue-600 dark:text-blue-400">
                      <FiFile />
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{file.title}.pdf</span>
                  </div>
                </td>
                <td className="p-4">{file.student}</td>
                <td className="p-4">{file.date}</td>
                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{file.size}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" title="Download">
                      <FiDownload size={18} />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300" title="Delete">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && !error && submissions.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center">No files found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectFiles;
