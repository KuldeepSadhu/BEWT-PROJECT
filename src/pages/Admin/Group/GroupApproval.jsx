import React, { useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import api from "../../../utils/api.js";

const GroupApproval = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null); // track which group is being updated

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await api.get("/groups");
      // Show all groups but filter for pending ones
      const pending = res.data.groups.filter((g) => g.status === "Pending");
      setGroups(pending);
    } catch (err) {
      setError("Failed to load groups. Please try again.");
      console.error("GroupApproval fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (groupId, status) => {
    setActionLoading(groupId + status);
    try {
      await api.patch(`/groups/${groupId}/status`, { status });
      // Remove from list after approval/rejection
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
    } catch (err) {
      alert(`Failed to ${status.toLowerCase()} group. Please try again.`);
      console.error("Status update error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">
          Loading groups...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Group Approval
      </h2>

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {group.project}
                  </h3>
                  <span className="text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded font-semibold mt-2 inline-block">
                    {group.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {group.groupID}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Members:
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  {group.students.map((student, index) => (
                    <li key={index}>{student}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Proposed Guide:</span>{" "}
                  {group.guide}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleStatusUpdate(group._id, "Approved")}
                  disabled={actionLoading !== null}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <FiCheck />
                  {actionLoading === group._id + "Approved"
                    ? "Approving..."
                    : "Approve"}
                </button>
                <button
                  onClick={() => handleStatusUpdate(group._id, "Rejected")}
                  disabled={actionLoading !== null}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <FiX />
                  {actionLoading === group._id + "Rejected"
                    ? "Rejecting..."
                    : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center border border-gray-200 dark:border-gray-700">
          <FiCheck size={48} className="mx-auto mb-4 text-green-500" />
          <p className="text-gray-500 dark:text-gray-400">
            No pending groups to approve. All caught up!
          </p>
        </div>
      )}
    </div>
  );
};

export default GroupApproval;
