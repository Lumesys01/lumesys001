
import React from 'react';
import FeatureIndicator from './FeatureIndicator';

const FeatureIndicators: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-3 md:flex md:justify-center gap-3 md:gap-6 text-sm text-black/80">
      <FeatureIndicator color="bg-accent" label="Real-time Monitoring" />
      <FeatureIndicator color="bg-highlight" label="Energy Analytics" />
      <FeatureIndicator color="bg-secondary" label="Cost Optimization" />
    </div>
  );
};

export default FeatureIndicators;
