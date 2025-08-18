import React from "react";

const Skeleton = () => {
  return (
    <>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`p-4 rounded-lg flex items-start bg-white dark:bg-gray-800 animate-pulse shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <div className="mr-3 w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4"></div>
              </div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Skeleton;
