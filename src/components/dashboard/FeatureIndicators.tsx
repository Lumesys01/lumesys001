
import React from 'react';
import FeatureIndicator from './FeatureIndicator';
import { BarChart3, Lightbulb, BadgePercent, Zap, Clock, ShieldCheck } from 'lucide-react';
import { GoldAccentText } from '@/components/ui/ExclusiveContent';

const FeatureIndicators: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-3 md:flex md:justify-center gap-3 md:gap-6 text-sm text-black/80 dark:text-white/90">
      <FeatureIndicator 
        color="bg-accent" 
        label={<>Real-time <GoldAccentText>Monitoring</GoldAccentText></>} 
        icon={<BarChart3 className="w-5 h-5 text-accent" />}
        description="View live building performance metrics as they happen - no delays like other platforms"
      />
      <FeatureIndicator 
        color="bg-highlight" 
        label={<>AI-Powered <GoldAccentText>Analytics</GoldAccentText></>} 
        icon={<Lightbulb className="w-5 h-5 text-highlight" />}
        description="Our proprietary AI analyzes patterns other systems simply can't detect"
      />
      <FeatureIndicator 
        color="bg-gold" 
        label={<><GoldAccentText>15%</GoldAccentText> Cost Savings</>} 
        icon={<BadgePercent className="w-5 h-5 text-gold" />}
        description="Our exclusive customers achieve minimum 15% savings vs. industry average of 8-10%"
      />
      <FeatureIndicator 
        color="bg-accent" 
        label={<><GoldAccentText>48hr</GoldAccentText> Deployment</>} 
        icon={<Clock className="w-5 h-5 text-accent" />}
        description="Deploy in just 48 hours vs. competitors' 4-6 week implementation"
      />
      <FeatureIndicator 
        color="bg-richpurple" 
        label={<>Adaptive <GoldAccentText>Learning</GoldAccentText></>} 
        icon={<Zap className="w-5 h-5 text-richpurple" />}
        description="Our system continuously improves - unlike static solutions from competitors"
      />
      <FeatureIndicator 
        color="bg-gold" 
        label={<><GoldAccentText>Premium</GoldAccentText> Support</>} 
        icon={<ShieldCheck className="w-5 h-5 text-gold" />}
        description="Members-only dedicated support team available 24/7 for our exclusive clients"
      />
    </div>
  );
};

export default FeatureIndicators;
