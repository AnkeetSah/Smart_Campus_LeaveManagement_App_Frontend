import React from 'react'
import UserAdd from './UserAdd'
const UserManagement = () => {
  return (
    <div className=" bg-white rounded-lg shadow-sm px-3 md:px-6 py-4">
        <div className="mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">
         User Management
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
        Manage users, upload bulk data, and control access permissions.
        </p>
      </div>

      <div>
        <UserAdd/>
        
      </div>



    </div>
  )
}

export default UserManagement