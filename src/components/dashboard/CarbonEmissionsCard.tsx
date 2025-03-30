
import React from 'react';
import { Leaf } from 'lucide-react';
import DashboardMetricCard from './DashboardMetricCard';

interface CarbonEmissionsCardProps {
  carbonData: {
    current: number;
    target: number;
    reduction: string;
    trend: string;
  };
}

const CarbonEmissionsCard: React.FC<CarbonEmissionsCardProps> = ({ carbonData }) => {
  return (
    <DashboardMetricCard title="Carbon Emissions" icon={<Leaf />} iconColor="text-green-400">
      <div className="flex items-end gap-1">
        <span className="text-3xl font-semibold">
          {carbonData.current}
        </span>
        <span className="text-xs text-white/70 mb-1">tons CO₂e</span>
      </div>
      <div className="mt-2 text-xs">
        <div className="flex justify-between">
          <span className="text-white/70">Target:</span>
          <span>{carbonData.target} tons</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Reduction:</span>
          <span className="text-green-400">{carbonData.reduction}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Trend:</span>
          <span className={`${
            carbonData.trend === "Decreasing" 
              ? "text-green-400" 
              : carbonData.trend === "Increasing" 
              ? "text-red-400" 
              : "text-blue-400"
          }`}>
            {carbonData.trend}
          </span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
        <div 
          className="h-full bg-green-400 rounded-full"
          style={{ width: `${(carbonData.current / carbonData.target) * 100}%` }}
        ></div>
      </div>
    </DashboardMetricCard>
  );
};

export default CarbonEmissionsCard;
