import React from "react";
import { FiCalendar, FiClock, FiVideo, FiMapPin } from "react-icons/fi";
import { useMeetings } from "../../../hooks/useSpmsData";

const MeetingSchedule = () => {
  const { data: meetings, isLoading, error } = useMeetings();
  const upcomingMeetings = meetings.filter(
    (meeting) => meeting.status !== "Completed",
  );
  const nextMeeting = upcomingMeetings[0];

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
    }
    if (status === "Scheduled") {
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
    }
    return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Meeting Schedule
      </h2>

      {isLoading && <div>Loading meetings...</div>}
      {!isLoading && error && <div className="text-red-600">Failed to load meetings.</div>}

      {!isLoading && !error && nextMeeting && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold">
            Next Upcoming Meeting
          </p>
          <h3 className="mt-1 text-xl font-bold text-gray-800 dark:text-white">
            {nextMeeting.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <FiCalendar /> {nextMeeting.date}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> {nextMeeting.time}
            </span>
            <span className="flex items-center gap-2">
              <FiMapPin /> {nextMeeting.location}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!isLoading && !error && meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${getStatusClass(meeting.status)}`}
                  >
                    {meeting.status}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {meeting.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {meeting.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <FiCalendar /> {meeting.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiClock /> {meeting.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiMapPin /> {meeting.location}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {meeting.status === "Completed" ? (
                  <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                    View Notes
                  </button>
                ) : (
                  <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
                    <FiVideo /> Join
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {!isLoading && !error && meetings.length === 0 && <div>No meetings found.</div>}
      </div>
    </div>
  );
};

export default MeetingSchedule;
