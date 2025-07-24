import React from 'react';

const LeaveCountCard = ({ finalCounts }) => {
  const statusCards = [
    {
      title: "Pending Leaves",
      count: finalCounts.pending,
      iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Approved Leaves",
      count: finalCounts.approved,
      iconPath: "M5 13l4 4L19 7",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Rejected Leaves",
      count: finalCounts.rejected,
      iconPath: "M6 18L18 6M6 6l12 12",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      textColor: "text-red-600 dark:text-red-400"
    }
  ];

  return (
    <>
      {statusCards.map((card, index) => (
        <div key={index} className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-xl shadow-lg dark:shadow-gray-900/20 p-6 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{card.count}</p>
            </div>
            <div className={`w-12 h-12 rounded-full ${card.bgColor} flex items-center justify-center transition-colors duration-200`}>
              <svg 
                className={`w-6 h-6 ${card.textColor} transition-colors duration-200`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={card.iconPath} 
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LeaveCountCard;