
import React from 'react';
import FeatureIndicator from './FeatureIndicator';
import { BarChart3, Lightbulb, BadgePercent, Zap } from 'lucide-react';

const FeatureIndicators: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-3 md:flex md:justify-center gap-3 md:gap-6 text-sm text-black/80 dark:text-white/90">
      <FeatureIndicator 
        color="bg-accent" 
        label={<span className="gradient-animated">AI-Powered Analysis</span>}
        icon={<BarChart3 className="w-5 h-5 text-accent" />}
        description="Advanced energy pattern analysis with unprecedented depth and accuracy"
      />
      <FeatureIndicator 
        color="bg-highlight" 
        label={<span className="gradient-animated">AI Investigation</span>}
        icon={<Lightbulb className="w-5 h-5 text-highlight" />}
        description="Our AI investigates energy anomalies other systems simply can't detect"
      />
      <FeatureIndicator 
        color="bg-secondary" 
        label={<span className="gradient-animated">Cost Recovery</span>}
        icon={<BadgePercent className="w-5 h-5 text-secondary" />}
        description="Our analysis helps recover up to 20% in hidden energy costs"
      />
      <FeatureIndicator 
        color="bg-highlight" 
        label={<span className="gradient-animated">Predictive Intelligence</span>}
        icon={<Zap className="w-5 h-5 text-highlight" />}
        description="Our system predicts energy anomalies before they impact your bottom line"
      />
    </div>
  );
};

export default FeatureIndicators;
