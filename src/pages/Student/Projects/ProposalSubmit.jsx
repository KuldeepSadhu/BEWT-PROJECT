import React from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useAcademicYears, useProjectTypes, useSubmissions } from "../../../hooks/useSpmsData";

const ProposalSubmit = () => {
  const { data: projectTypes } = useProjectTypes();
  const { data: academicYears } = useAcademicYears();
  const { data: submissions } = useSubmissions();
  const currentYear = academicYears.find((year) => year.isCurrent) || academicYears[0];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Submit Proposal</h2>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Active academic year: {currentYear?.year || "N/A"}
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title</label>
            <input type="text" className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500" placeholder="Enter project title" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Type</label>
            <select className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500">
              <option>Select Project Type</option>
              {projectTypes.map((projectType) => (
                <option key={projectType.id}>{projectType.type} ({projectType.semester})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Problem Statement</label>
            <textarea rows="4" className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500" placeholder="Describe the problem you are solving..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Proposal Document (PDF)</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <FiUploadCloud size={40} className="text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF, DOC up to 5MB</p>
            </div>
          </div>

          <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">
            Submit Proposal
          </button>
        </form>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Seeded Proposal Files</h3>
          {submissions.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No proposal history found.</p>
          ) : (
            submissions
              .filter((submission) => submission.title.toLowerCase().includes("proposal"))
              .slice(0, 3)
              .map((submission) => (
                <p key={submission.id} className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {submission.fileName} - {submission.status}
                </p>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalSubmit;
