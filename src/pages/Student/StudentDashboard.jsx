import React, { useMemo } from "react";
import DashboardCard from "../../Components/DashboardCard.jsx";
import { useGroups, useMeetings, useSubmissions } from "../../hooks/useSpmsData";
import { getCurrentUser } from "../../utils/auth";

const normalize = (value) => String(value || "").trim().toLowerCase();

const StudentDashboard = () => {
  const currentUser = getCurrentUser();
  const { data: groups, isLoading, error } = useGroups();
  const { data: meetings } = useMeetings();
  const { data: submissions } = useSubmissions();

  const myGroup = useMemo(() => {
    if (!Array.isArray(groups) || groups.length === 0) {
      return null;
    }

    const currentId = normalize(currentUser?.id);
    const currentEmail = normalize(currentUser?.email);
    const currentName = normalize(currentUser?.name);

    return (
      groups.find((group) => {
        const members = Array.isArray(group.memberDetails) ? group.memberDetails : [];
        if (!members.length) {
          return Array.isArray(group.students)
            ? group.students.some((name) => normalize(name) === currentName)
            : false;
        }

        return members.some((member) => {
          const memberId = normalize(member.id);
          const memberEmail = normalize(member.email);
          const memberName = normalize(member.name);

          return (
            (currentId && memberId && memberId === currentId)
            || (currentEmail && memberEmail && memberEmail === currentEmail)
            || (currentName && memberName && memberName === currentName)
          );
        });
      })
      || groups[0]
      || null
    );
  }, [groups, currentUser]);

  const upcomingMeetings = useMemo(
    () => meetings.filter((meeting) => normalize(meeting.status) !== "completed").length,
    [meetings],
  );

  const pendingTasks = useMemo(
    () => submissions.filter((submission) => normalize(submission.status) !== "approved").length,
    [submissions],
  );

  const displayName = currentUser?.name || "Student";

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load dashboard data.</div>;
  }

  return (
    <div>
      <h2 className="page-title">Welcome, {displayName}</h2>
      <p className="page-subtitle">Stay aligned with project milestones and your team timeline.</p>

      <div className="mb-8 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <DashboardCard title="Project Progress" value={myGroup ? `${myGroup.progress}%` : "0%"} color="indigo" />
        <DashboardCard title="Upcoming Meetings" value={String(upcomingMeetings)} color="emerald" />
        <DashboardCard title="Pending Tasks" value={String(pendingTasks)} color="amber" />
      </div>

      {!myGroup ? (
        <div className="surface-card p-6">
          <h3 className="text-xl font-bold text-slate-900">No group data found</h3>
          <p className="mt-2 text-slate-700">
            Your account is active, but no project group is mapped yet. Contact your admin or faculty guide.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="surface-card p-6 xl:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-xl font-bold text-slate-900">Project: {myGroup.project}</h3>
              <span
                className={`status-chip ${
                  normalize(myGroup.status) === "approved"
                    ? "bg-emerald-500/20 text-emerald-200"
                    : normalize(myGroup.status) === "rejected"
                      ? "bg-rose-500/20 text-rose-200"
                      : "bg-amber-500/20 text-amber-100"
                }`}
              >
                {myGroup.status}
              </span>
            </div>

            <p className="mt-4 text-slate-700">
              <strong className="text-slate-900">Guide:</strong> {myGroup.guide}
            </p>
            <p className="mt-1 text-slate-700">
              <strong className="text-slate-900">Group ID:</strong> {myGroup.groupID}
            </p>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
                <span>Completion</span>
                <span className="font-semibold text-slate-900">{myGroup.progress}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-700/40">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${Math.max(0, Math.min(100, Number(myGroup.progress) || 0))}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="surface-card-soft p-6">
            <h4 className="mb-3 text-lg font-semibold text-slate-900">Team Members</h4>
            {myGroup.students.length === 0 ? (
              <p className="text-slate-700">No members listed.</p>
            ) : (
              <ul className="space-y-2">
                {myGroup.students.map((student) => {
                  const isCurrentUser = normalize(student) === normalize(displayName);
                  return (
                    <li
                      key={student}
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        isCurrentUser
                          ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-100"
                          : "border-slate-600/70 bg-slate-800/50 text-slate-200"
                      }`}
                    >
                      {student}
                      {isCurrentUser ? " (You)" : ""}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
