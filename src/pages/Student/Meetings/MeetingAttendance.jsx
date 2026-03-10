import React from "react";
import { dummyMeetings } from "../../../utils/dummyData";

const MeetingAttendance = () => {
  // Mocking attendance data based on meetings

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        My Attendance
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 border-b dark:border-gray-600">
                Meeting Title
              </th>
              <th className="p-4 border-b dark:border-gray-600">Date</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">
                Attendance Status
              </th>
              <th className="p-4 border-b dark:border-gray-600">Remarks</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {dummyMeetings.map((meeting, index) => (
              <tr
                key={meeting.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-none"
              >
                <td className="p-4 font-semibold">{meeting.title}</td>
                <td className="p-4">{meeting.date}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      index % 3 === 0
                        ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                        : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    }`}
                  >
                    {index % 3 === 0 ? "Absent" : "Present"}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                  {index % 3 === 0 ? "Medical Leave" : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingAttendance;
