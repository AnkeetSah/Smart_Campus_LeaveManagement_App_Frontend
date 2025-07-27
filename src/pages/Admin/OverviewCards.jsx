import React from 'react';
import { motion } from 'framer-motion';

const OverviewCards = ({ overviewCardData }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const bgClasses = [
    'from-blue-100 to-blue-200 border-blue-200 text-blue-700',
    'from-amber-100 to-amber-200 border-amber-200 text-amber-700',
    'from-green-100 to-green-200 border-green-200 text-green-700',
    'from-red-100 to-red-200 border-red-200 text-red-700'
  ];

  const iconBgClasses = [
    'bg-blue-200 text-blue-700',
    'bg-amber-200 text-amber-700',
    'bg-green-200 text-green-700',
    'bg-red-200 text-red-700'
  ];

  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {overviewCardData.map((card, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`rounded-lg p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br ${bgClasses[index]} border`}
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.heading}</p>
              <h2 className="text-2xl font-bold mt-1 text-gray-800">{card.value.toLocaleString()}</h2>
            </div>
            <div className={`p-3 rounded-xl ${iconBgClasses[index]}`}>
              {card.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewCards;
