
import React from 'react';
import FeatureIndicator from './FeatureIndicator';
import { BarChart3, Lightbulb, BadgePercent, Clock, Sparkles, HeartHandshake } from 'lucide-react';

const FeatureIndicators: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 justify-center text-sm text-black/80 dark:text-white/90">
      <FeatureIndicator 
        color="bg-[#32CD78]" 
        label={<>
          <span className="block text-black/90 dark:text-white/90">Real-time</span>
          <span className="gradient-gold">Monitoring</span>
        </>}
        icon={<BarChart3 className="w-5 h-5 text-[#32CD78]" />}
        description="Advanced pattern monitoring with unprecedented accuracy"
      />
      <FeatureIndicator 
        color="bg-[#B0EA26]" 
        label={<>
          <span className="block text-black/90 dark:text-white/90">AI-</span>
          <span className="gradient-gold">Powered</span>
        </>}
        icon={<Lightbulb className="w-5 h-5 text-[#B0EA26]" />}
        description="Our AI investigates anomalies other systems simply can't detect"
      />
      <FeatureIndicator 
        color="bg-[#FFA500]" 
        label={<>
          <span className="block text-black/90 dark:text-white/90">5%</span>
          <span className="gradient-gold">Savings</span>
        </>}
        icon={<BadgePercent className="w-5 h-5 text-[#FFA500]" />}
        description="Our analysis helps recover up to 5% in hidden costs"
      />
      <FeatureIndicator 
        color="bg-[#1E90FF]" 
        label={<>
          <span className="block text-black/90 dark:text-white/90">48hr</span>
          <span className="gradient-gold">Deployment</span>
        </>}
        icon={<Clock className="w-5 h-5 text-[#1E90FF]" />}
        description="Our system deploys quickly so you see results faster"
      />
      <FeatureIndicator 
        color="bg-[#9932CC]" 
        label={<>
          <span className="block text-black/90 dark:text-white/90">Adaptive</span>
          <span className="gradient-gold">Learning</span>
        </>}
        icon={<Sparkles className="w-5 h-5 text-[#9932CC]" />}
        description="Our system continuously learns and adapts to your needs"
      />
      <FeatureIndicator 
        color="bg-[#FFC125]" 
        label={<>
          <span className="block text-black/90 dark:text-white/90">Premium</span>
          <span className="gradient-gold">Support</span>
        </>}
        icon={<HeartHandshake className="w-5 h-5 text-[#FFC125]" />}
        description="Expert support team available to assist you 24/7"
      />
    </div>
  );
};

export default FeatureIndicators;
