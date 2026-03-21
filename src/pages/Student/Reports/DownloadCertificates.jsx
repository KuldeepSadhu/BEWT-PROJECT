import React from "react";
import { FiLock } from "react-icons/fi";
import { useGroups, useSubmissions } from "../../../hooks/useSpmsData";

const DownloadCertificates = () => {
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
  const { data: submissions, isLoading: submissionsLoading, error: submissionsError } = useSubmissions();
  const readyForCertificate = groups.some((group) => group.progress >= 75) && submissions.some((submission) => submission.grade === "A");

  if (groupsLoading || submissionsLoading) {
    return <div className="p-6">Loading certificate status...</div>;
  }

  if (groupsError || submissionsError) {
    return <div className="p-6 text-red-600">Failed to load certificate status.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Download Certificates</h2>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 text-center">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 dark:text-gray-500">
          <FiLock size={40} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {readyForCertificate ? "Certificate Ready" : "Certificates Locked"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
          {readyForCertificate
            ? "Seed data indicates final evaluation is complete. The certificate can now be generated."
            : "Certificates will unlock after enough project progress and at least one approved final review from the database."}
        </p>
        <button className={`px-6 py-2 rounded-lg font-semibold ${readyForCertificate ? "bg-indigo-600 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"}`} disabled={!readyForCertificate}>
          {readyForCertificate ? "Download Certificate" : "Download Certificate"}
        </button>
      </div>
    </div>
  );
};

export default DownloadCertificates;
