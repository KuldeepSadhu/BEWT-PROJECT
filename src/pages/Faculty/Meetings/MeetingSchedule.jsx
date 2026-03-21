import React from "react";
import { FiCalendar, FiClock, FiVideo } from "react-icons/fi";
import { useMeetings } from "../../../hooks/useSpmsData";

const MeetingSchedule = () => {
  const { data: meetings, isLoading, error } = useMeetings();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Meeting Schedule</h2>

      <div className="space-y-4">
        {isLoading && <div>Loading meetings...</div>}
        {!isLoading && error && <div className="text-red-600">Failed to load meetings.</div>}
        {!isLoading && !error && meetings.map((meeting) => (
          <div key={meeting.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  meeting.status === "Completed"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    : meeting.status === "Scheduled"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                }`}>
                  {meeting.status}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">&bull; {meeting.type}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{meeting.title}</h3>
              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FiCalendar />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock />
                  <span>{meeting.time}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2">
                <FiVideo /> Join Meeting
              </button>
            </div>
          </div>
        ))}
        {!isLoading && !error && meetings.length === 0 && <div>No meetings found.</div>}
      </div>
    </div>
  );
};

export default MeetingSchedule;
