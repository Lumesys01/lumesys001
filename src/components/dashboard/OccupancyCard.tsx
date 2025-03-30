
import React from 'react';
import { Building2 } from 'lucide-react';
import DashboardMetricCard from './DashboardMetricCard';

interface OccupancyCardProps {
  occupancyData: {
    current: number;
    capacity: number;
    peakHours: string;
    energyImpact: string;
  };
}

const OccupancyCard: React.FC<OccupancyCardProps> = ({ occupancyData }) => {
  return (
    <DashboardMetricCard title="Occupancy" icon={<Building2 />}>
      <div className="text-3xl font-semibold">
        {occupancyData.current} <span className="text-white/50 text-base">/ {occupancyData.capacity}</span>
      </div>
      <div className="mt-2 text-xs text-white/70">
        Peak hours: {occupancyData.peakHours}
      </div>
      <div className="mt-2 text-xs">
        <div className="flex justify-between">
          <span className="text-white/70">Energy Impact:</span>
          <span className={`${
            occupancyData.energyImpact === "Low" 
              ? "text-green-400" 
              : occupancyData.energyImpact === "Medium" 
              ? "text-blue-400" 
              : "text-amber-400"
          }`}>
            {occupancyData.energyImpact}
          </span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
        <div 
          className="h-full bg-highlight rounded-full"
          style={{ width: `${(occupancyData.current / occupancyData.capacity) * 100}%` }}
        ></div>
      </div>
    </DashboardMetricCard>
  );
};

export default OccupancyCard;
