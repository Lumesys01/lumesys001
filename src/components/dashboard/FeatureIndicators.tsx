
import React from 'react';
import FeatureIndicator from './FeatureIndicator';
import { BarChart3, Lightbulb, BadgePercent, Zap, Clock } from 'lucide-react';

const FeatureIndicators: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-3 md:flex md:justify-center gap-3 md:gap-6 text-sm text-black/80 dark:text-white/90">
      <FeatureIndicator 
        color="bg-accent" 
        label={<span>Real-time Monitoring</span>}
        icon={<BarChart3 className="w-5 h-5 text-accent" />}
        description="View live building performance metrics as they happen - no delays like other platforms"
      />
      <FeatureIndicator 
        color="bg-highlight" 
        label={<span>AI-Powered Analytics</span>}
        icon={<Lightbulb className="w-5 h-5 text-highlight" />}
        description="Our proprietary AI analyzes patterns other systems simply can't detect"
      />
      <FeatureIndicator 
        color="bg-secondary" 
        label={<span>15% Cost Savings</span>}
        icon={<BadgePercent className="w-5 h-5 text-secondary" />}
        description="Our customers achieve minimum 15% savings vs. industry average of 8-10%"
      />
      <FeatureIndicator 
        color="bg-accent" 
        label={<span>48hr Deployment</span>}
        icon={<Clock className="w-5 h-5 text-accent" />}
        description="Deploy in just 48 hours vs. competitors' 4-6 week implementation"
      />
      <FeatureIndicator 
        color="bg-highlight" 
        label={<span>Adaptive Learning</span>}
        icon={<Zap className="w-5 h-5 text-highlight" />}
        description="Our system continuously improves - unlike static solutions from competitors"
      />
    </div>
  );
};

export default FeatureIndicators;
