import React, { useMemo } from "react";
import { FiUser, FiMail, FiPhone, FiBook, FiAward, FiEdit2 } from "react-icons/fi";
import { useStudents } from "../../hooks/useSpmsData";
import { getCurrentUser } from "../../utils/auth";

const normalize = (value, fallback = "N/A") => {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return fallback;
};

const Profile = () => {
  const { data: students, isLoading, error } = useStudents();
  const currentUser = getCurrentUser();

  const student = useMemo(() => {
    if (!Array.isArray(students) || students.length === 0) {
      return null;
    }

    const currentId = String(currentUser?.id || "").trim();
    const currentEmail = String(currentUser?.email || "").trim().toLowerCase();
    const currentName = String(currentUser?.name || "").trim().toLowerCase();

    return (
      students.find((item) => currentId && String(item.id || "") === currentId)
      || students.find((item) => currentEmail && String(item.email || "").toLowerCase() === currentEmail)
      || students.find((item) => currentName && String(item.name || "").trim().toLowerCase() === currentName)
      || null
    );
  }, [students, currentUser]);

  const profile = student || {
    name: currentUser?.name || "Student",
    email: currentUser?.email || "N/A",
    department: "N/A",
    year: "N/A",
    rollNo: "N/A",
  };

  if (isLoading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (error && !currentUser) {
    return <div className="p-6 text-red-600">Failed to load profile.</div>;
  }

  if (!profile?.name) {
    return <div className="p-6">No student profile found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Profile</h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-indigo-600 h-32"></div>
        <div className="px-6 pb-6">
          <div className="relative -top-16 flex justify-between items-end gap-4">
            <div className="flex items-end gap-6">
              <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-indigo-600 dark:text-indigo-400 shadow-lg">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className="mb-2">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{normalize(profile.name, "Student")}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {normalize(profile.department)} | {normalize(profile.year)}
                </p>
              </div>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-4 shadow">
              <FiEdit2 /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 border-b dark:border-gray-600 pb-2">Academic Info</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <FiBook className="text-indigo-500" />
                    <span className="font-medium">Roll No:</span> {normalize(profile.rollNo)}
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <FiAward className="text-indigo-500" />
                    <span className="font-medium">Year:</span> {normalize(profile.year)}
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <FiUser className="text-indigo-500" />
                    <span className="font-medium">Department:</span> {normalize(profile.department)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 border-b dark:border-gray-600 pb-2">Contact Info</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <FiMail className="text-indigo-500" />
                    <span>{normalize(profile.email)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <FiPhone className="text-indigo-500" />
                    <span>Not Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
