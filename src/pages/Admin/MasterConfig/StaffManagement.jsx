import React from "react";
import { FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import { useStaff } from "../../../hooks/useSpmsData";

const StaffManagement = () => {
  const { data: staffMembers, isLoading, error } = useStaff();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Staff Management</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FiUserPlus /> Add Staff
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-4 border-b dark:border-gray-600">Name</th>
              <th className="p-4 border-b dark:border-gray-600">Role</th>
              <th className="p-4 border-b dark:border-gray-600">Email</th>
              <th className="p-4 border-b dark:border-gray-600">Last Login</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {isLoading && (
              <tr>
                <td colSpan="5" className="p-4 text-center">Loading staff...</td>
              </tr>
            )}
            {!isLoading && error && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-red-600">Failed to load staff.</td>
              </tr>
            )}
            {!isLoading && !error && staffMembers.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700 last:border-none">
                <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{staff.name}</td>
                <td className="p-4">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-bold">
                    {staff.role}
                  </span>
                </td>
                <td className="p-4">{staff.email}</td>
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
            {!isLoading && !error && staffMembers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center">No staff records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
