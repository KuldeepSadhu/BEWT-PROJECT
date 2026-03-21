import React from "react";
import { FiCheckCircle, FiXCircle, FiDownload } from "react-icons/fi";
import { useSubmissions } from "../../../hooks/useSpmsData";

const ProposalReview = () => {
  const { data: submissions, isLoading, error } = useSubmissions();
  const proposals = submissions.filter((submission) => submission.title.includes("Proposal"));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Proposal Review</h2>
      
      <div className="space-y-6">
        {isLoading && <div>Loading proposals...</div>}
        {!isLoading && error && <div className="text-red-600">Failed to load proposals.</div>}
        {!isLoading && !error && proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Project Proposal: {proposal.student}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Submitted on: {proposal.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                proposal.status === "Approved" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" :
                proposal.status === "Rejected" ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" :
                "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
              }`}>
                {proposal.status}
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded text-red-600 dark:text-red-400">
                    <FiDownload size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">project_proposal_v1.pdf</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2.4 MB</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:underline text-sm font-medium dark:text-blue-400">View Document</button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Remarks</label>
              <textarea 
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                rows="2"
                defaultValue={proposal.remarks}
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                <FiCheckCircle /> Approve
              </button>
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                <FiXCircle /> Reject
              </button>
            </div>
          </div>
        ))}
        {!isLoading && !error && proposals.length === 0 && <div>No proposals found.</div>}
      </div>
    </div>
  );
};

export default ProposalReview;
