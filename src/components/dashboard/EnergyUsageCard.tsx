
import React from 'react';
import { Gauge } from 'lucide-react';
import DashboardMetricCard from './DashboardMetricCard';

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
  
  return (
    <DashboardMetricCard title="Energy Usage" icon={<Gauge />}>
      <div className="text-3xl font-semibold">
        {energyData.current} <span className="text-sm text-white/50">kWh</span>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-xs text-green-400">
          {percentageSavings} below target
        </div>
        <div className="text-xs text-white/70">
          Target: {energyData.target} kWh
        </div>
      </div>
      <div className="mt-2 text-xs">
        <div className="flex justify-between">
          <span className="text-white/70">CO₂ Reduction:</span>
          <span className="text-green-400">{energyData.co2Reduction}</span>
        </div>
      </div>
    </DashboardMetricCard>
  );
};

export default EnergyUsageCard;
