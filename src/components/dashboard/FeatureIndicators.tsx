
import React from 'react';
import FeatureIndicator from './FeatureIndicator';
import { BarChart3, Lightbulb, BadgePercent } from 'lucide-react';

const FeatureIndicators: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-3 md:flex md:justify-center gap-3 md:gap-6 text-sm text-black/80">
      <FeatureIndicator 
        color="bg-accent" 
        label="Real-time Monitoring" 
        icon={<BarChart3 className="w-5 h-5 text-accent" />}
        description="View live building performance metrics as they happen"
      />
      <FeatureIndicator 
        color="bg-highlight" 
        label="Energy Analytics" 
        icon={<Lightbulb className="w-5 h-5 text-highlight" />}
        description="Analyze energy consumption patterns and identify optimization opportunities"
      />
      <FeatureIndicator 
        color="bg-secondary" 
        label="Cost Optimization" 
        icon={<BadgePercent className="w-5 h-5 text-secondary" />}
        description="Track savings and reduce operational expenses through smart recommendations"
      />
    </div>
  );
};

export default FeatureIndicators;
