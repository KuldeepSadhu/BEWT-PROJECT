import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./Auth/Login.jsx";
import LoginPage from "./Auth/LoginPage.jsx";
import RegisterPage from "./Auth/RegisterPage.jsx";

// Layouts
import AdminLayout from "./Layouts/AdminLayout.jsx";
import FacultyLayout from "./Layouts/FacultyLayout.jsx";
import StudentLayout from "./Layouts/StudentLayout.jsx";

// Components
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ProjectList from "./pages/Admin/ProjectList.jsx";
import StudentMaster from "./pages/Admin/Students/StudentMaster.jsx";
import GroupCreation from "./pages/Admin/Group/GroupCreation.jsx";
import GroupApproval from "./pages/Admin/Group/GroupApproval.jsx";
import MemberMapping from "./pages/Admin/Group/MemberMapping.jsx";
import ProjectTypes from "./pages/Admin/MasterConfig/ProjectTypes.jsx";
import StaffManagement from "./pages/Admin/MasterConfig/StaffManagement.jsx";
import AcademicYear from "./pages/Admin/MasterConfig/AcademicYear.jsx";

// Faculty Pages
import FacultyDashboard from "./pages/Faculty/FacultyDashboard.jsx";
import GroupList from "./pages/Faculty/GroupList.jsx";
import MeetingSchedule from "./pages/Faculty/Meetings/MeetingSchedule.jsx";
import MeetingEntry from "./pages/Faculty/Meetings/MeetingEntry.jsx";
import Attendance from "./pages/Faculty/Meetings/Attendance.jsx";
import ProposalReview from "./pages/Faculty/Projects/ProposalReview.jsx";
import ProjectProgress from "./pages/Faculty/Projects/ProjectProgress.jsx";
import ProjectFiles from "./pages/Faculty/Projects/ProjectFiles.jsx";
import ProjectEvaluation from "./pages/Faculty/Projects/ProjectEvaluation.jsx";
import GroupPerformance from "./pages/Faculty/Reports/GroupPerformance.jsx";
import MarksReport from "./pages/Faculty/Reports/MarksReport.jsx";

// Student Pages
import StudentDashboard from "./pages/Student/StudentDashboard.jsx";
import MyProject from "./pages/Student/MyProject.jsx";
import MyGroup from "./pages/Student/Group/MyGroup.jsx";
import GroupStatus from "./pages/Student/Group/GroupStatus.jsx";
import StudentMeetingSchedule from "./pages/Student/Meetings/MeetingSchedule.jsx";
import MeetingHistory from "./pages/Student/Meetings/MeetingHistory.jsx";
import MeetingAttendance from "./pages/Student/Meetings/MeetingAttendance.jsx";
import ProjectDetails from "./pages/Student/Projects/ProjectDetails.jsx";
import ProposalSubmit from "./pages/Student/Projects/ProposalSubmit.jsx";
import SubmissionHistory from "./pages/Student/Projects/SubmissionHistory.jsx";
import Profile from "./pages/Student/Profile.jsx";
import ProgressReport from "./pages/Student/Reports/ProgressReport.jsx";
import Marks from "./pages/Student/Reports/Marks.jsx";
import DownloadSummary from "./pages/Student/Reports/DownloadSummary.jsx";
import DownloadCertificates from "./pages/Student/Reports/DownloadCertificates.jsx";
import NotFound from "./pages/NotFound.jsx";

// Utils
import { getUserRole } from "./utils/auth";

// Component to handle login page redirects
const LoginRoute = () => {
  const userRole = getUserRole();

  // If user is already logged in, redirect to their dashboard
  if (userRole) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }
  return <Login />;
};

// Component to handle root path redirects
const RootRoute = () => {
  const userRole = getUserRole();

  // If user is logged in, redirect to their dashboard
  if (userRole) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  // Otherwise redirect to login
  return <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/" element={<RootRoute />} />

      {/* Authentication Pages */}
      <Route path="/admin/login" element={<LoginPage role="admin" />} />
      <Route path="/faculty/login" element={<LoginPage role="faculty" />} />
      <Route path="/student/login" element={<LoginPage role="student" />} />

      <Route
        path="/faculty/register"
        element={<RegisterPage role="faculty" />}
      />
      <Route
        path="/student/register"
        element={<RegisterPage role="student" />}
      />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Student Management */}
          <Route path="students/master" element={<StudentMaster />} />

          {/* Group Management */}
          <Route
            path="groups"
            element={<Navigate to="/admin/groups/creation" replace />}
          />
          <Route path="groups/creation" element={<GroupCreation />} />
          <Route path="groups/approval" element={<GroupApproval />} />
          <Route path="groups/member-mapping" element={<MemberMapping />} />

          {/* Project Management */}
          <Route path="projects" element={<ProjectList />} />

          {/* Master Configuration */}
          <Route
            path="config"
            element={<Navigate to="/admin/config/project-types" replace />}
          />
          <Route path="config/project-types" element={<ProjectTypes />} />
          <Route path="config/staff" element={<StaffManagement />} />
          <Route path="config/academic-year" element={<AcademicYear />} />

          {/* Reports */}
          <Route
            path="reports"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Route>
      </Route>

      {/* Faculty Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="faculty" />}>
        <Route path="/faculty" element={<FacultyLayout />}>
          <Route index element={<Navigate to="/faculty/dashboard" replace />} />
          <Route path="dashboard" element={<FacultyDashboard />} />

          {/* Group Management */}
          <Route path="groups" element={<GroupList />} />

          {/* Meetings */}
          <Route
            path="meetings"
            element={<Navigate to="/faculty/meetings/schedule" replace />}
          />
          <Route path="meetings/schedule" element={<MeetingSchedule />} />
          <Route path="meetings/entry" element={<MeetingEntry />} />
          <Route path="meetings/attendance" element={<Attendance />} />

          {/* Projects */}
          <Route
            path="projects"
            element={<Navigate to="/faculty/projects/proposals" replace />}
          />
          <Route path="projects/proposals" element={<ProposalReview />} />
          <Route path="projects/progress" element={<ProjectProgress />} />
          <Route path="projects/files" element={<ProjectFiles />} />
          <Route path="projects/evaluation" element={<ProjectEvaluation />} />

          {/* Reports */}
          <Route
            path="reports"
            element={<Navigate to="/faculty/reports/performance" replace />}
          />
          <Route path="reports/performance" element={<GroupPerformance />} />
          <Route path="reports/marks" element={<MarksReport />} />
        </Route>
      </Route>

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />

          {/* Group Management */}
          <Route
            path="group"
            element={<Navigate to="/student/group/my-group" replace />}
          />
          <Route path="group/my-group" element={<MyGroup />} />
          <Route path="group/status" element={<GroupStatus />} />

          {/* Project Management */}
          <Route path="project" element={<MyProject />} />
          <Route
            path="projects"
            element={<Navigate to="/student/projects/details" replace />}
          />
          <Route path="projects/details" element={<ProjectDetails />} />
          <Route path="projects/proposal" element={<ProposalSubmit />} />
          <Route path="projects/submissions" element={<SubmissionHistory />} />

          {/* Meetings */}
          <Route
            path="meetings"
            element={<Navigate to="/student/meetings/schedule" replace />}
          />
          <Route
            path="meetings/schedule"
            element={<StudentMeetingSchedule />}
          />
          <Route path="meetings/history" element={<MeetingHistory />} />
          <Route path="meetings/attendance" element={<MeetingAttendance />} />

          {/* Reports */}
          <Route
            path="reports"
            element={<Navigate to="/student/reports/progress" replace />}
          />
          <Route path="reports/progress" element={<ProgressReport />} />
          <Route path="reports/marks" element={<Marks />} />
          <Route path="reports/summary" element={<DownloadSummary />} />
          <Route
            path="reports/certificates"
            element={<DownloadCertificates />}
          />

          {/* Profile */}
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Fallback - redirect to login */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
