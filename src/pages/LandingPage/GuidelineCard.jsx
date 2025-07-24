// src/components/GuidelineCard.jsx
import React from "react";

function GuidelineCard({ title, points, color, number }) {
  return (
    <div className={`p-6 rounded-xl border bg-${color}-50/50 dark:bg-${color}-900/20 border-${color}-100 dark:border-${color}-800 transition-colors duration-300`}>
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
        <span
          className={`w-6 h-6 rounded-full bg-${color}-500 text-white flex items-center justify-center mr-2 text-sm`}
        >
          {number}
        </span>
        {title}
      </h4>
      <ul
        className={`text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-2 marker:text-${color}-500 dark:marker:text-${color}-400`}
      >
        {points.map((point, index) => (
          <li key={index} className="transition-colors duration-300">{point}</li>
        ))}
      </ul>
    </div>
  );
}

export default GuidelineCard;