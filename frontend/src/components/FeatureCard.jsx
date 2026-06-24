import React from 'react';

/**
 * Reusable Feature Card Component
 * @param {React.ComponentType} icon - React Icon class.
 * @param {string} title - The title of the feature.
 * @param {string} description - The description details.
 */
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start">
      {/* Icon Wrapper */}
      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        <Icon className="text-2xl" />
      </div>
      
      {/* Feature Content */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
