import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import { useStaff } from "../../../hooks/useSpmsData";
import api from "../../../utils/api.js";

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  department: "",
  designation: "",
  expertise: "",
};

const toStaffRow = (member) => ({
  id: member?._id || member?.id || "",
  name: member?.name || "Unnamed Faculty",
  role: member?.designation || member?.role || "Faculty",
  email: member?.email || "N/A",
  department: member?.department || "N/A",
  lastLogin: member?.lastLogin || "Never",
});

const StaffManagement = () => {
  const { data: staffMembers, isLoading, error } = useStaff();
  const [staffRows, setStaffRows] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    setStaffRows(staffMembers.map(toStaffRow));
  }, [staffMembers]);

  const openAddModal = () => {
    setFormError("");
    setFormSuccess("");
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

  const handleAddStaff = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const requiredFields = ["name", "email", "password", "department"];
    const hasMissingField = requiredFields.some((key) => !String(formData[key] || "").trim());

    if (hasMissingField) {
      setFormError("Please fill all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post("/admin/staff", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        department: formData.department.trim(),
        designation: formData.designation.trim(),
        expertise: formData.expertise.trim(),
      });

      const createdStaff = response.data?.faculty;
      if (createdStaff) {
        setStaffRows((prev) => [toStaffRow(createdStaff), ...prev]);
      }

      setFormSuccess("Staff added successfully.");
      setShowAddModal(false);
      setFormData(INITIAL_FORM);
    } catch (requestError) {
      setFormError(requestError.response?.data?.message || "Failed to add staff.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Staff Management</h2>
        <button
          type="button"
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiUserPlus /> Add Staff
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
              <th className="p-4 border-b dark:border-gray-600">Name</th>
              <th className="p-4 border-b dark:border-gray-600">Designation</th>
              <th className="p-4 border-b dark:border-gray-600">Email</th>
              <th className="p-4 border-b dark:border-gray-600">Department</th>
              <th className="p-4 border-b dark:border-gray-600">Last Login</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {isLoading && (
              <tr>
                <td colSpan="6" className="p-4 text-center">Loading staff...</td>
              </tr>
            )}
            {!isLoading && error && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-red-600">Failed to load staff.</td>
              </tr>
            )}
            {!isLoading && !error && staffRows.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-none">
                <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{staff.name}</td>
                <td className="p-4">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-bold">
                    {staff.role}
                  </span>
                </td>
                <td className="p-4">{staff.email}</td>
                <td className="p-4">{staff.department}</td>
                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{staff.lastLogin}</td>
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
            {!isLoading && !error && staffRows.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center">No staff records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add Staff (Faculty)</h3>
              <button
                type="button"
                onClick={closeAddModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                X
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="px-6 py-5 space-y-4">
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
                    placeholder="Faculty full name"
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
                    placeholder="faculty@college.edu"
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department *</label>
                  <input
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Designation</label>
                  <input
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="Assistant Professor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expertise</label>
                  <input
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-white"
                    placeholder="AI/ML, Cloud, Data Science"
                  />
                </div>
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
                  {submitting ? "Saving..." : "Save Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
