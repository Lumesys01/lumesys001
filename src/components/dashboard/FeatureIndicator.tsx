
import React from 'react';

interface FeatureIndicatorProps {
  color: string;
  label: string;
  icon: React.ReactNode;
  gradientClass?: string;
}

const FeatureIndicator: React.FC<FeatureIndicatorProps> = ({ color, label, icon, gradientClass }) => {
  return (
    <div className="flex flex-col items-center text-center px-2 py-4 hover:scale-105 transition-transform duration-300">
      <div className={`${gradientClass || color} w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-sm`}>
        {icon}
      </div>
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default FeatureIndicator;
