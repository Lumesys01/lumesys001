
import React from 'react';
import FeatureIndicator from './FeatureIndicator';
import { BarChart3, Lightbulb, BadgePercent, Clock, Zap, HeadphonesIcon } from 'lucide-react';

const FeatureIndicators: React.FC = () => {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-8 text-sm text-black/80 dark:text-white/90">
      <FeatureIndicator 
        color="bg-green-500"
        gradientClass="bg-gradient-to-r from-green-400 to-teal-400" 
        label="Real-time Monitoring"
        icon={<BarChart3 className="w-6 h-6 text-white" />}
      />
      <FeatureIndicator 
        color="bg-purple-500"
        gradientClass="bg-gradient-to-r from-yellow-400 to-amber-400" 
        label="AI-Powered Analytics"
        icon={<Lightbulb className="w-6 h-6 text-white" />}
      />
      <FeatureIndicator 
        color="bg-amber-500"
        gradientClass="bg-gradient-to-r from-orange-400 to-amber-400" 
        label="Cost Savings"
        icon={<BadgePercent className="w-6 h-6 text-white" />}
      />
      <FeatureIndicator 
        color="bg-blue-500"
        gradientClass="bg-gradient-to-r from-cyan-400 to-blue-400" 
        label="48hr Deployment"
        icon={<Clock className="w-6 h-6 text-white" />}
      />
      <FeatureIndicator 
        color="bg-purple-500"
        gradientClass="bg-gradient-to-r from-purple-400 to-indigo-400" 
        label="Adaptive Learning"
        icon={<Zap className="w-6 h-6 text-white" />}
      />
      <FeatureIndicator 
        color="bg-rose-500"
        gradientClass="bg-gradient-to-r from-rose-400 to-pink-400" 
        label="Support"
        icon={<HeadphonesIcon className="w-6 h-6 text-white" />}
      />
    </div>
  );
};

export default FeatureIndicators;
