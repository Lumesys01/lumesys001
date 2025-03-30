
import React from 'react';

interface FeatureIndicatorProps {
  color: string;
  label: string;
  icon?: React.ReactNode;
}

const FeatureIndicator: React.FC<FeatureIndicatorProps> = ({ color, label, icon }) => {
  return (
    <div className="flex flex-col items-center p-3 rounded-lg hover:bg-accent/5 transition-all">
      <div className="flex items-center justify-center mb-2">
        {icon ? (
          icon
        ) : (
          <span className={`w-3 h-3 inline-block rounded-full ${color}`}></span>
        )}
      </div>
      <span className="font-medium text-center">{label}</span>
    </div>
  );
};

export default FeatureIndicator;
