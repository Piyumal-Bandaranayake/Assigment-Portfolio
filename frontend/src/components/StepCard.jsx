import React from 'react';

/**
 * Reusable Step Card Component
 * @param {string|number} number - The step number (e.g. 1, 2, 3).
 * @param {React.ComponentType} icon - React Icon class for the step.
 * @param {string} title - The title of the step.
 * @param {string} description - The description of what to do.
 */
const StepCard = ({ number, icon: Icon, title, description }) => {
  return (
    <div className="relative flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 w-full">
      {/* Number Badge overlapping the top border */}
      <div className="absolute -top-4 bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm shadow-md border-2 border-white">
        {number}
      </div>

      {/* Icon container */}
      <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4 mt-2">
        <Icon className="text-3xl" />
      </div>

      {/* Title & Description */}
      <h4 className="text-lg font-bold text-gray-900 mb-2">
        {title}
      </h4>
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  );
};

export default StepCard;
