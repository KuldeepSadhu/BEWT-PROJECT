import React from "react";
import { useGroups, useSubmissions } from "../../hooks/useSpmsData";

const MyProject = () => {
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
  const { data: submissions, isLoading: submissionsLoading, error: submissionsError } = useSubmissions();
  const myGroup = groups[0];
  const latestSubmission = submissions[0];

  if (groupsLoading || submissionsLoading) {
    return <div className="p-6 max-w-4xl mx-auto">Loading project...</div>;
  }

  if (groupsError || submissionsError) {
    return <div className="p-6 max-w-4xl mx-auto text-red-600">Failed to load project data.</div>;
  }

  if (!myGroup) {
    return <div className="p-6 max-w-4xl mx-auto">No project found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Manage My Project</h2>
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow border dark:border-gray-700 space-y-6">
        <section>
          <h3 className="text-xl font-bold border-b dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200">Project Overview</h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300"><strong>Title:</strong> {myGroup.project}</p>
          <p className="mt-1 text-gray-700 dark:text-gray-300"><strong>Category:</strong> {myGroup.domain}</p>
          <p className="mt-1 text-gray-700 dark:text-gray-300"><strong>Status:</strong> {myGroup.status}</p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {myGroup.abstract || "No project abstract available yet."}
          </p>
        </section>
        <section>
          <h3 className="text-lg font-bold border-b dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200">Submission Area</h3>
          <div className="mt-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 text-center rounded bg-gray-50 dark:bg-gray-700/50">
            <p className="text-gray-500 dark:text-gray-400">
              Latest seeded file: {latestSubmission?.fileName || "No file uploaded"}
            </p>
            <button className="mt-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 dark:hover:bg-blue-600">Upload File</button>
          </div>
        </section>

        <section className="bg-yellow-50 dark:bg-yellow-900/20 p-4 border border-yellow-200 dark:border-yellow-700 rounded">
          <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Latest Remarks</h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 italic mt-1">
            {latestSubmission?.remarks || myGroup.remarks}
          </p>
        </section>
      </div>
    </div>
  );
};

export default MyProject;
