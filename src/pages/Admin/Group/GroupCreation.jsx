import React, { useEffect, useMemo, useState } from "react";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import api from "../../../utils/api.js";
import { useAcademicYears, useStudents } from "../../../hooks/useSpmsData";

const buildNextGroupId = (groups) => {
  const currentYear = new Date().getFullYear();
  const sequence = groups.reduce((max, group) => {
    const match = String(group.groupID || "").match(/^G-(\d{4})-(\d+)$/);
    if (!match || Number(match[1]) !== currentYear) {
      return max;
    }

    const nextSequence = Number(match[2]);
    return Number.isNaN(nextSequence) ? max : Math.max(max, nextSequence);
  }, 0);

  return `G-${currentYear}-${String(sequence + 1).padStart(3, "0")}`;
};

const DYNAMIC_GROUPING_OPTIONS = [
  { value: "departmentYear", label: "Department + Year" },
  { value: "department", label: "Department" },
  { value: "year", label: "Year" },
  { value: "none", label: "No Grouping (Mixed)" },
];

const GroupCreation = () => {
  const { data: students, isLoading, error } = useStudents();
  const { data: academicYears } = useAcademicYears();
  const [groups, setGroups] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [guideId, setGuideId] = useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dynamicSubmitting, setDynamicSubmitting] = useState(false);
  const [dynamicGroupSize, setDynamicGroupSize] = useState(3);
  const [dynamicGroupingMode, setDynamicGroupingMode] = useState("departmentYear");
  const [dynamicTitlePrefix, setDynamicTitlePrefix] = useState("Auto Project");
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [groupsRes, facultyRes] = await Promise.all([
          api.get("/groups"),
          api.get("/admin/faculty"),
        ]);
        setGroups(Array.isArray(groupsRes.data?.groups) ? groupsRes.data.groups : []);
        setFaculty(Array.isArray(facultyRes.data?.faculty) ? facultyRes.data.faculty : []);
      } catch (requestError) {
        console.error("GroupCreation load error:", requestError);
        setPageError("Failed to load group configuration data.");
      }
    };

    loadAdminData();
  }, []);

  useEffect(() => {
    const currentAcademicYear = academicYears.find((year) => year.isCurrent) || academicYears[0];
    if (currentAcademicYear && !academicYearId) {
      setAcademicYearId(currentAcademicYear.id);
    }
  }, [academicYears, academicYearId]);

  const assignedStudentIds = useMemo(() => {
    const ids = new Set();
    groups.forEach((group) => {
      if (Array.isArray(group.students)) {
        group.students.forEach((student) => {
          const studentId = student?._id || student?.id || student;
          if (studentId) {
            ids.add(String(studentId));
          }
        });
      }
    });
    return ids;
  }, [groups]);

  const unassignedStudents = useMemo(
    () => students.filter((student) => !assignedStudentIds.has(String(student.id))),
    [students, assignedStudentIds],
  );

  const nextGroupId = useMemo(() => buildNextGroupId(groups), [groups]);

  const toggleStudentSelection = (student) => {
    setSuccessMessage("");
    setSelectedStudents((prev) => {
      const exists = prev.some((item) => item.id === student.id);
      if (exists) {
        return prev.filter((item) => item.id !== student.id);
      }
      return [...prev, student];
    });
  };

  const resetForm = () => {
    setSelectedStudents([]);
    setProjectTitle("");
    setProjectDescription("");
    setRemarks("");
    setGuideId("");
  };

  const handleCreateGroup = async () => {
    if (!projectTitle.trim() || !guideId || selectedStudents.length === 0) {
      setPageError("Project title, guide, and at least one student are required.");
      return;
    }

    setSubmitting(true);
    setPageError("");
    setSuccessMessage("");

    try {
      const response = await api.post("/groups", {
        projectTitle: projectTitle.trim(),
        projectDescription: projectDescription.trim(),
        remarks: remarks.trim(),
        guideId,
        academicYearId,
        studentIds: selectedStudents.map((student) => student.id),
      });

      const createdGroup = response.data?.group;
      if (createdGroup) {
        setGroups((prev) => [...prev, createdGroup]);
      }
      setSuccessMessage(`Group ${createdGroup?.groupID || nextGroupId} created successfully.`);
      resetForm();
    } catch (requestError) {
      console.error("Create group error:", requestError);
      setPageError(requestError.response?.data?.message || "Failed to create group.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateDynamicGroups = async () => {
    const parsedGroupSize = Number(dynamicGroupSize);
    if (!Number.isInteger(parsedGroupSize) || parsedGroupSize < 1 || parsedGroupSize > 10) {
      setPageError("Dynamic group size must be an integer between 1 and 10.");
      return;
    }

    if (unassignedStudents.length === 0) {
      setPageError("No unassigned students are available for dynamic grouping.");
      return;
    }

    setDynamicSubmitting(true);
    setPageError("");
    setSuccessMessage("");

    try {
      const response = await api.post("/groups/dynamic", {
        groupSize: parsedGroupSize,
        groupingMode: dynamicGroupingMode,
        projectTitlePrefix: dynamicTitlePrefix.trim() || "Auto Project",
        academicYearId,
        remarks: remarks.trim(),
      });

      const createdGroups = Array.isArray(response.data?.groups) ? response.data.groups : [];
      const groupedStudents = Number(response.data?.groupedStudents || 0);
      if (createdGroups.length > 0) {
        setGroups((prev) => [...prev, ...createdGroups]);

        const assignedIds = new Set();
        createdGroups.forEach((group) => {
          if (Array.isArray(group?.students)) {
            group.students.forEach((student) => {
              const studentId = student?._id || student?.id || student;
              if (studentId) {
                assignedIds.add(String(studentId));
              }
            });
          }
        });

        setSelectedStudents((prev) =>
          prev.filter((student) => !assignedIds.has(String(student.id))),
        );
      }

      setSuccessMessage(
        `Dynamic grouping completed. ${createdGroups.length} groups created for ${groupedStudents} students.`,
      );
    } catch (requestError) {
      console.error("Dynamic grouping error:", requestError);
      setPageError(requestError.response?.data?.message || "Failed to create dynamic groups.");
    } finally {
      setDynamicSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Group Creation</h2>

      {(pageError || error) && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {pageError || "Failed to load students."}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">
            Unassigned Students
          </h3>
          <div className="space-y-3 max-h-[34rem] overflow-y-auto pr-1">
            {isLoading && <p>Loading students...</p>}
            {!isLoading && unassignedStudents.map((student) => {
              const selected = selectedStudents.some((item) => item.id === student.id);
              return (
                <div
                  key={student.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{student.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{student.rollNo} - {student.department}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStudentSelection(student)}
                    className={`rounded-full p-1 ${selected ? "text-red-600" : "text-indigo-600 dark:text-indigo-400"}`}
                    title={selected ? "Remove student" : "Add student"}
                  >
                    {selected ? <FiTrash2 size={22} /> : <FiPlusCircle size={24} />}
                  </button>
                </div>
              );
            })}
            {!isLoading && unassignedStudents.length === 0 && <p>No unassigned students found.</p>}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="rounded-lg border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/70 dark:bg-indigo-900/10 p-4 space-y-3">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Dynamic Grouping</h3>
            <p className="text-sm text-indigo-700/80 dark:text-indigo-300/90">
              Create groups automatically from all unassigned active students.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Group Size</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={dynamicGroupSize}
                  onChange={(event) => setDynamicGroupSize(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grouping Rule</label>
                <select
                  value={dynamicGroupingMode}
                  onChange={(event) => setDynamicGroupingMode(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                >
                  {DYNAMIC_GROUPING_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title Prefix</label>
              <input
                value={dynamicTitlePrefix}
                onChange={(event) => setDynamicTitlePrefix(event.target.value)}
                placeholder="Auto Project"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
              />
            </div>

            <button
              type="button"
              onClick={handleCreateDynamicGroups}
              disabled={dynamicSubmitting || unassignedStudents.length === 0}
              className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {dynamicSubmitting ? "Creating Dynamic Groups..." : "Create Dynamic Groups"}
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">New Group</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Group ID</label>
            <input value={nextGroupId} disabled className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title</label>
            <input value={projectTitle} onChange={(event) => setProjectTitle(event.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white" placeholder="Enter project title" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Guide</label>
            <select value={guideId} onChange={(event) => setGuideId(event.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white">
              <option value="">Select guide</option>
              {faculty.map((member) => (
                <option key={member._id} value={member._id}>{member.name} - {member.department}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year</label>
            <select value={academicYearId} onChange={(event) => setAcademicYearId(event.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white">
              {academicYears.map((year) => (
                <option key={year.id} value={year.id}>{year.year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Description</label>
            <textarea value={projectDescription} onChange={(event) => setProjectDescription(event.target.value)} rows="4" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white" placeholder="Describe the project" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Remarks</label>
            <textarea value={remarks} onChange={(event) => setRemarks(event.target.value)} rows="2" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white" placeholder="Optional remarks" />
          </div>

          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-700/30">
            <p className="font-medium text-gray-800 dark:text-gray-200 mb-3">Selected Students</p>
            {selectedStudents.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Select students to form a group.</p>
            ) : (
              <div className="space-y-2">
                {selectedStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between rounded-lg bg-white dark:bg-gray-800 px-3 py-2 border border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{student.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{student.rollNo}</p>
                    </div>
                    <button type="button" onClick={() => toggleStudentSelection(student)} className="text-red-600" title="Remove student">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleCreateGroup}
            disabled={submitting || dynamicSubmitting || selectedStudents.length === 0}
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating Group..." : "Create Group"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupCreation;
