import React from "react";
import useAuthStore from "../store/useAuthStore";
import { FaUserShield, FaEnvelope, FaPhone } from "react-icons/fa";

const GuardProfile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div className="p-6">No user data found.</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <FaUserShield className="text-2xl text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold dark:text-white">
              Guard Profile
            </h2>
            <p className="text-sm text-gray-500">
              Personal Information
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div className="flex items-center gap-3 border-b pb-2 dark:border-gray-700">
            <FaUserShield className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium dark:text-white">{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border-b pb-2 dark:border-gray-700">
            <FaEnvelope className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium dark:text-white">{user.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 border-b pb-2 dark:border-gray-700">
            <FaPhone className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium dark:text-white">
                {user.phone || "Not Provided"}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="mt-4">
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Role: {user.role}
            </span>

            {user.firstLogin && (
              <span className="ml-2 inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                First Login Pending
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardProfile;
