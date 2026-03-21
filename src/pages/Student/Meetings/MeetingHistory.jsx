import React from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { useMeetings } from "../../../hooks/useSpmsData";

const MeetingHistory = () => {
  const { data: meetings, isLoading, error } = useMeetings();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Meeting History
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 border-b dark:border-gray-600">
                Meeting Title
              </th>
              <th className="p-4 border-b dark:border-gray-600">Date</th>
              <th className="p-4 border-b dark:border-gray-600">Time</th>
              <th className="p-4 border-b dark:border-gray-600">Type</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {isLoading && (
              <tr>
                <td colSpan="5" className="p-4 text-center">Loading meeting history...</td>
              </tr>
            )}
            {!isLoading && error && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-red-600">Failed to load meeting history.</td>
              </tr>
            )}
            {!isLoading && !error && meetings.map((meeting) => (
              <tr
                key={meeting.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-none"
              >
                <td className="p-4 font-semibold">{meeting.title}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FiCalendar /> {meeting.date}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FiClock /> {meeting.time}
                  </div>
                </td>
                <td className="p-4">{meeting.type}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      meeting.status === "Completed"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : meeting.status === "Upcoming"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                    }`}
                  >
                    {meeting.status}
                  </span>
                </td>
              </tr>
            ))}
            {!isLoading && !error && meetings.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center">No meeting history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingHistory;
