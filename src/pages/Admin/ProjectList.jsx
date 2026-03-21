import React, { useEffect, useState } from "react";
import api from "../../utils/api.js";

const getStatusStyle = (status) => {
  switch (status) {
    case "Approved":
      return "text-green-600 dark:text-green-400 font-semibold";
    case "Rejected":
      return "text-red-600 dark:text-red-400 font-semibold";
    default:
      return "text-yellow-600 dark:text-yellow-400 font-semibold";
  }
};

const getProjectName = (project) => {
  const candidates = [
    project?.projectName,
    project?.title,
    project?.name,
    project?.proposal?.projectName,
    project?.proposal?.title,
    project?.proposal?.name,
  ];

  const value = candidates.find(
    (item) => typeof item === "string" && item.trim().length > 0,
  );

  return value?.trim() || "N/A";
};

const getStudentName = (project) => {
  const candidates = [
    project?.student?.name,
    project?.studentName,
    project?.owner?.name,
    project?.submittedBy?.name,
  ];

  const value = candidates.find(
    (item) => typeof item === "string" && item.trim().length > 0,
  );

  return value?.trim() || "-";
};

const getDepartment = (project) => {
  const candidates = [
    project?.department,
    project?.student?.department,
    project?.owner?.department,
    project?.submittedBy?.department,
  ];

  const value = candidates.find(
    (item) => typeof item === "string" && item.trim().length > 0,
  );

  return value?.trim() || "N/A";
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/admin/projects");
        const payload = res.data;

        const projectList = Array.isArray(payload?.projects)
          ? payload.projects
          : Array.isArray(payload?.data?.projects)
            ? payload.data.projects
            : Array.isArray(payload?.data)
              ? payload.data
              : Array.isArray(payload)
                ? payload
                : [];

        setProjects(projectList);
      } catch (err) {
        setError("Failed to load projects. Please try again.");
        console.error("ProjectList fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">
          Loading projects...
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
        Manage All Projects
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden border dark:border-gray-700">
        {projects.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-10">
            No projects found.
          </p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="p-3 border-b dark:border-gray-600">
                  Project Name
                </th>
                <th className="p-3 border-b dark:border-gray-600">Student</th>
                <th className="p-3 border-b dark:border-gray-600">
                  Department
                </th>
                <th className="p-3 border-b dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {projects.map((p, index) => (
                <tr
                  key={p._id || p.id || `project-${index}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700 last:border-none"
                >
                  <td className="p-3 font-medium">{getProjectName(p)}</td>
                  <td className="p-3">{getStudentName(p)}</td>
                  <td className="p-3">{getDepartment(p)}</td>
                  <td className={`p-3 ${getStatusStyle(p.status || "Pending")}`}>
                    {p.status || "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
