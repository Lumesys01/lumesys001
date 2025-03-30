
import React from 'react';

interface FeatureIndicatorProps {
  color: string;
  label: string;
}

const FeatureIndicator: React.FC<FeatureIndicatorProps> = ({ color, label }) => {
  return (
    <div className="flex flex-col items-center p-3 rounded-lg hover:bg-accent/5 transition-all">
      <span className={`w-3 h-3 inline-block rounded-full ${color} mb-2`}></span>
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default FeatureIndicator;
