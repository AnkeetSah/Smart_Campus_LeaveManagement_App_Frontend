// src/components/GuidelineCard.jsx
import React from "react";

// Predefined Tailwind color mappings (safe for JIT)
const colorMap = {
  blue: {
    bgLight: "bg-blue-200/50 dark:bg-blue-900/20",
    border: "border-blue-100 dark:border-blue-800",
    badge: "bg-blue-500",
    marker: "marker:text-blue-500 dark:marker:text-blue-400",
  },
  emerald: {
    bgLight: "bg-emerald-200/50 dark:bg-emerald-900/20",
    border: "border-emerald-100 dark:border-emerald-800",
    badge: "bg-emerald-500",
    marker: "marker:text-emerald-500 dark:marker:text-emerald-400",
  },
};

function GuidelineCard({ title, points, color = "blue", number }) {
  const theme = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`p-6 rounded-xl border ${theme.bgLight} ${theme.border} 
      shadow-sm hover:shadow-md hover:-translate-y-1 focus-within:ring-2 
      focus-within:ring-offset-2 focus-within:ring-${color}-400 
      transition-all duration-300`}
    >
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
        <span
          className={`w-7 h-7 rounded-full ${theme.badge} text-white 
          flex items-center justify-center mr-2 text-sm font-semibold shadow-sm`}
        >
          {number}
        </span>
        {title}
      </h4>
      <ul
        className={`text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-2 ${theme.marker}`}
      >
        {points.map((point, index) => (
          <li
            key={index}
            className="transition-colors duration-300 hover:text-gray-900 dark:hover:text-white"
          >
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuidelineCard;
