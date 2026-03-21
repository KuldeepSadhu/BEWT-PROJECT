import { useEffect, useState } from "react";
import api from "../utils/api";

const formatDate = (value, fallback = "N/A") => {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : fallback;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const extractCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.groups)) {
    return payload.groups;
  }

  if (Array.isArray(payload?.students)) {
    return payload.students;
  }

  if (Array.isArray(payload?.projects)) {
    return payload.projects;
  }

  return [];
};

const toDisplayValue = (value, fallback = "N/A") => {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return fallback;
};

const toPersonName = (person, fallback) => {
  if (typeof person === "string") {
    return toDisplayValue(person, fallback);
  }

  const fullName = [person?.firstName, person?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return toDisplayValue(person?.name || fullName, fallback);
};

const normalizeStudent = (student) => ({
  id: student?._id || student?.id || "",
  name: toPersonName(student, "Unnamed Student"),
  rollNo: student?.rollNo || student?.rollNumber || student?.enrollmentNo || "N/A",
  email: student?.email || student?.user?.email || "N/A",
  department: student?.department || student?.program || "N/A",
  year: student?.year || student?.academicYear || student?.semester || "N/A",
  status: student?.status || (student?.isActive === false ? "Inactive" : "Active"),
  marks: student?.marks || {},
});

const normalizeGroup = (group) => ({
  id: group?._id || group?.id || "",
  groupID: group?.groupID || group?.code || "N/A",
  project:
    group?.project?.title ||
    group?.project ||
    group?.projectTitle ||
    group?.title ||
    "Untitled Project",
  students: Array.isArray(group?.students)
    ? group.students.map((student) => toPersonName(student, "Unknown Student"))
    : Array.isArray(group?.members)
      ? group.members.map((student) => toPersonName(student, "Unknown Student"))
      : [],
  guide: toPersonName(
    group?.guide || group?.faculty || group?.mentor,
    group?.guideName || "Guide not assigned",
  ),
  status: group?.status || "Pending",
  progress: Number(group?.progress || group?.completionPercentage || 0),
  abstract: group?.abstract || group?.project?.description || "",
  domain: group?.domain || group?.project?.department || "N/A",
  technologies: Array.isArray(group?.technologies)
    ? group.technologies
    : Array.isArray(group?.project?.technologies)
      ? group.project.technologies
      : [],
  remarks: group?.remarks || group?.project?.remarks || "-",
});

const normalizeProjectType = (projectType) => ({
  id: projectType?._id || projectType?.id || "",
  type: projectType?.type || projectType?.name || "Untitled Type",
  semester: projectType?.semester || "N/A",
  credits: projectType?.credits ?? "N/A",
  description: projectType?.description || "No description available.",
});

const normalizeAcademicYear = (academicYear) => ({
  id: academicYear?._id || academicYear?.id || "",
  year: academicYear?.year || academicYear?.name || "N/A",
  startDate: formatDate(academicYear?.startDate),
  endDate: formatDate(academicYear?.endDate),
  isCurrent: Boolean(academicYear?.isCurrent || academicYear?.current),
  status: academicYear?.status || "Inactive",
});

const normalizeStaff = (staff) => ({
  id: staff?._id || staff?.id || "",
  name: toPersonName(staff, "Unnamed Staff"),
  role: staff?.role || staff?.designation || "N/A",
  email: staff?.email || staff?.user?.email || "N/A",
  department: staff?.department || "N/A",
  lastLogin: formatDate(staff?.lastLogin || staff?.lastSeen, "Never"),
});

const normalizeMeeting = (meeting) => ({
  id: meeting?._id || meeting?.id || "",
  date: formatDate(meeting?.date || meeting?.meetingDate),
  time: meeting?.time || meeting?.meetingTime || meeting?.startTime || "N/A",
  title: meeting?.title || meeting?.agenda || "Untitled Meeting",
  type: meeting?.type || meeting?.category || "General",
  status: meeting?.status || "Scheduled",
  location: meeting?.location || "Online",
  attendanceStatus: meeting?.attendanceStatus || "Present",
  remarks: meeting?.remarks || meeting?.notes || "-",
});

const normalizeSubmission = (submission) => ({
  id: submission?._id || submission?.id || "",
  title: submission?.title || submission?.name || "Untitled Submission",
  date: formatDate(submission?.date || submission?.submittedAt),
  student: toPersonName(
    submission?.student || submission?.submittedBy,
    submission?.studentName || "Unknown Student",
  ),
  status: submission?.status || "Pending Review",
  remarks: submission?.remarks || "-",
  size: submission?.size || submission?.fileSize || "2.5 MB",
  fileName: submission?.fileName || `${submission?.title || "submission"}.pdf`,
  grade: submission?.grade || "Pending",
  project: submission?.project?.title || submission?.projectName || "N/A",
});

const useApiCollection = (endpoint, normalizer) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCollection = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(endpoint);
        const items = extractCollection(response.data).map(normalizer);

        if (isMounted) {
          setData(items);
          setError(null);
        }
      } catch (requestError) {
        if (isMounted) {
          setData([]);
          setError(requestError);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCollection();

    return () => {
      isMounted = false;
    };
  }, [endpoint, normalizer]);

  return { data, isLoading, error };
};

export const useStudents = () => useApiCollection("/students", normalizeStudent);
export const useGroups = () => useApiCollection("/groups", normalizeGroup);
export const useProjectTypes = () => useApiCollection("/project-types", normalizeProjectType);
export const useAcademicYears = () => useApiCollection("/academic-years", normalizeAcademicYear);
export const useStaff = () => useApiCollection("/staff", normalizeStaff);
export const useMeetings = () => useApiCollection("/meetings", normalizeMeeting);
export const useSubmissions = () => useApiCollection("/submissions", normalizeSubmission);
