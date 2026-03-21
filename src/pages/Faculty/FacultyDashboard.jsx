import React, { useMemo } from "react";
import DashboardCard from "../../Components/DashboardCard.jsx";
import { useGroups, useMeetings, useSubmissions } from "../../hooks/useSpmsData";

const FacultyDashboard = () => {
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
  const { data: meetings, isLoading: meetingsLoading, error: meetingsError } = useMeetings();
  const { data: submissions, isLoading: submissionsLoading, error: submissionsError } = useSubmissions();

  const upcomingMeetings = useMemo(
    () => meetings.filter((meeting) => meeting.status !== "Completed").slice(0, 2),
    [meetings],
  );
  const recentSubmissions = useMemo(() => submissions.slice(0, 3), [submissions]);

  if (groupsLoading || meetingsLoading || submissionsLoading) {
    return <div className="p-6">Loading faculty dashboard...</div>;
  }

  if (groupsError || meetingsError || submissionsError) {
    return <div className="p-6 text-red-600">Failed to load faculty dashboard data.</div>;
  }

  return (
    <div>
      <h2 className="page-title">Faculty Dashboard</h2>
      <p className="page-subtitle">Monitor your groups, meetings, and evaluation pipeline.</p>

      <div className="mb-8 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Assigned Groups" value={String(groups.length)} color="emerald" />
        <DashboardCard
          title="New Proposals"
          value={String(submissions.filter((item) => item.title.toLowerCase().includes("proposal")).length)}
          color="amber"
        />
        <DashboardCard title="Meetings" value={String(upcomingMeetings.length)} color="blue" />
        <DashboardCard title="Evaluations" value={String(groups.filter((group) => group.progress >= 40).length)} color="indigo" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="surface-card p-5">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">My Groups</h3>
          {groups.length === 0 ? (
            <p className="text-slate-600">No groups found.</p>
          ) : (
            <ul className="list-disc ml-5 space-y-1 text-slate-700">
              {groups.slice(0, 3).map((group) => (
                <li key={group.id}>{group.groupID}: {group.project}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="surface-card-soft p-5">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Upcoming Meetings</h3>
          {upcomingMeetings.length === 0 ? (
            <p className="text-sm text-slate-700">No upcoming meetings.</p>
          ) : (
            upcomingMeetings.map((meeting) => (
              <p key={meeting.id} className="mt-2 text-sm text-slate-700">
                {meeting.date} at {meeting.time}: {meeting.title}
              </p>
            ))
          )}
          {recentSubmissions.length > 0 && (
            <p className="mt-4 text-sm text-slate-500">
              Latest file: {recentSubmissions[0].fileName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
