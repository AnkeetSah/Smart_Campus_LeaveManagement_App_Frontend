import React from "react";
import OverviewCards from "./OverviewCards";
import {
  MdPeopleAlt,
  MdPendingActions,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";
import RecentLeave from "./RecentLeave";
import RecentLeaveApplications from "./RecentLeave";

const AdminDashboard = () => {
  const overviewCardData = [
    {
      heading: "Total Users",
      value: 1432,
      icon: <MdPeopleAlt size={24} />,
    },
    {
      heading: "Pending Requests",
      value: 245,
      icon: <MdPendingActions size={24} />,
    },
    {
      heading: "Approved",
      value: 1150,
      icon: <MdCheckCircle size={24} />,
    },
    {
      heading: "Rejected",
      value: 37,
      icon: <MdCancel size={24} />,
    },
  ];

  return (
    <div className=" bg-white rounded-lg shadow-sm px-6 py-4">
      <div className="mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Welcome back! Here is the complete overview of the leave portal.
        </p>
      </div>

      <div className="mb-5">
        <OverviewCards overviewCardData={overviewCardData} />
      </div>


      <RecentLeaveApplications/>
    </div>
  );
};

export default AdminDashboard;
