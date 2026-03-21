import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useStudents } from "../../../hooks/useSpmsData";
import api from "../../../utils/api.js";

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  rollNumber: "",
  department: "",
  year: "",
  status: "Active",
  designation: "",
  expertise: "",
};

const toStudentRow = (student) => ({
  id: student?._id || student?.id || "",
  name: student?.name || "Unnamed Student",
  rollNo: student?.rollNo || student?.rollNumber || "N/A",
  email: student?.email || "N/A",
  department: student?.department || "N/A",
  year: student?.year || "N/A",
  status: student?.status || "Active",
});

const StudentMaster = () => {
  const { data: students, isLoading, error } = useStudents();
  const [studentRows, setStudentRows] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    setStudentRows(students);
  }, [students]);

  const openAddModal = () => {
    setFormError("");
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    if (submitting) {
      return;
    }
    setShowAddModal(false);
    setFormError("");
    setFormData(INITIAL_FORM);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const requiredFields = ["name", "email", "password", "rollNumber", "department", "year"];
    const hasMissingField = requiredFields.some((key) => !String(formData[key] || "").trim());

    if (hasMissingField) {
      setFormError("Please fill all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post("/admin/students", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        rollNumber: formData.rollNumber.trim(),
        department: formData.department.trim(),
        year: formData.year.trim(),
        status: formData.status,
        designation: formData.designation.trim(),
        expertise: formData.expertise.trim(),
      });

      const createdStudent = response.data?.student;
      if (createdStudent) {
        setStudentRows((prev) => [toStudentRow(createdStudent), ...prev]);
      }

      setFormSuccess("Student added successfully.");
      setShowAddModal(false);
      setFormData(INITIAL_FORM);
    } catch (requestError) {
      setFormError(requestError.response?.data?.message || "Failed to add student.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Student Master</h2>
        <button
          type="button"
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus /> Add Student
        </button>
      </div>

      {formSuccess && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
          {formSuccess}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 border-b dark:border-gray-600">Roll No</th>
              <th className="p-4 border-b dark:border-gray-600">Name</th>
              <th className="p-4 border-b dark:border-gray-600">Department</th>
              <th className="p-4 border-b dark:border-gray-600">Year</th>
              <th className="p-4 border-b dark:border-gray-600">Status</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {isLoading && (
              <tr>
                <td colSpan="6" className="p-4 text-center">Loading students...</td>
              </tr>
            )}
            {!isLoading && error && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-red-600">Failed to load students.</td>
              </tr>
            )}
            {!isLoading && !error && studentRows.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-none">
                <td className="p-4 font-medium">{student.rollNo}</td>
                <td className="p-4">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{student.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
                  </div>
                </td>
                <td className="p-4">{student.department}</td>
                <td className="p-4">{student.year}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    student.status === "Active" 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" 
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      <FiEdit size={18} />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && !error && studentRows.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add Student</h3>
              <button
                type="button"
                onClick={closeAddModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="px-6 py-5 space-y-4">
              {formError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="Student full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="student@college.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="Temporary password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roll Number *</label>
                  <input
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="CS2026001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department *</label>
                  <input
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year *</label>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="Final Year"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Designation</label>
                  <input
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expertise</label>
                <textarea
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                  placeholder="Optional"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  disabled={submitting}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-indigo-600 px-5 py-2 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60"
                >
                  {submitting ? "Saving..." : "Save Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMaster;
