
import React, { useState, useEffect } from 'react';
import { Gauge, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import DashboardMetricCard from './DashboardMetricCard';
import { Progress } from '@/components/ui/progress';

interface EnergyUsageCardProps {
  energyData: {
    current: number;
    target: number;
    savings: string;
    co2Reduction: string;
  };
}

const EnergyUsageCard: React.FC<EnergyUsageCardProps> = ({ energyData }) => {
  // Calculate percentage savings for display
  const percentageSavings = energyData.savings.includes('%') 
    ? energyData.savings
    : `${Math.round((1 - (energyData.current / energyData.target)) * 100)}%`;
  
  // Extract the percentage value for the progress bar
  const savingsValue = parseInt(percentageSavings);
  
  // Animation state
  const [progressValue, setProgressValue] = useState(0);
  const [animatedCurrent, setAnimatedCurrent] = useState(0);
  
  // Animate the progress bar and current value
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setProgressValue(savingsValue * progress);
      setAnimatedCurrent(Math.floor(energyData.current * progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setProgressValue(savingsValue);
        setAnimatedCurrent(energyData.current);
      }
    };
    
    requestAnimationFrame(animate);
  }, [energyData.current, savingsValue]);
  
  return (
    <DashboardMetricCard title="Energy Usage" icon={<Gauge />}>
      <div className="relative">
        <div className="mb-1 flex items-baseline">
          <div className="text-3xl font-semibold transition-all duration-700">
            {animatedCurrent}
            <span className="text-sm text-white/50 ml-1">kWh</span>
          </div>
          <div className="ml-auto flex items-center text-xs text-green-400 font-medium">
            <TrendingDown className="w-3 h-3 mr-1" />
            {percentageSavings} 
          </div>
        </div>
        
        <div className="relative mt-2 mb-3">
          <Progress value={progressValue} max={100} className="h-2 bg-white/10" />
          <div className="absolute top-0 left-0 w-full flex justify-between text-[10px] mt-3 text-white/70">
            <span>0</span>
            <span>Target: {energyData.target} kWh</span>
          </div>
        </div>
        
        <div className="mt-4 text-xs">
          <div className="flex justify-between items-center p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center">
              <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
              <span className="text-white/90">CO₂ Reduction</span>
            </div>
            <span className="font-medium text-green-400">{energyData.co2Reduction}</span>
          </div>
          
          <div className="flex justify-between items-center p-2 mt-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center">
              <AlertCircle className="w-3 h-3 text-white/60 mr-2" />
              <span className="text-white/90">Efficiency</span>
            </div>
            <span className="font-medium">
              {savingsValue >= 15 ? 
                <span className="text-green-400">Excellent</span> : 
                savingsValue >= 10 ? 
                  <span className="text-yellow-400">Good</span> : 
                  <span className="text-orange-400">Needs Improvement</span>}
            </span>
          </div>
        </div>
      </div>
    </DashboardMetricCard>
  );
};

export default EnergyUsageCard;
