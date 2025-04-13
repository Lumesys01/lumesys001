
import React from 'react';

interface FeatureIndicatorProps {
  color: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  description: string;
}

const FeatureIndicator: React.FC<FeatureIndicatorProps> = ({ color, label, icon, description }) => {
  return (
    <div className="flex flex-col items-center text-center px-2 py-4 hover:scale-105 transition-transform duration-300">
      <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="font-semibold mb-1.5">{label}</div>
      <p className="text-xs opacity-80 leading-relaxed max-w-[220px]">{description}</p>
    </div>
  );
};

export default FeatureIndicator;
