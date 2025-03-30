
import React from 'react';
import { Fan } from 'lucide-react';
import DashboardMetricCard from './DashboardMetricCard';

interface HVACCardProps {
  hvacData: {
    status: string;
    efficiency: number;
    temperature: number;
    carbonImpact: string;
    maintenanceStatus: string;
    energyConsumption: number;
  };
}

const HVACCard: React.FC<HVACCardProps> = ({ hvacData }) => {
  return (
    <DashboardMetricCard title="HVAC Systems" icon={<Fan />}>
      <div className="text-3xl font-semibold">
        {hvacData.temperature}°F
      </div>
      <div className="flex justify-between mt-2">
        <div className={`text-xs px-2 py-1 rounded ${
          hvacData.status === "Running" 
            ? "bg-green-500/20 text-green-400"
            : hvacData.status === "Maintenance"
            ? "bg-amber-500/20 text-amber-400"
            : "bg-blue-500/20 text-blue-400"
        }`}>
          {hvacData.status}
        </div>
        <div className="text-xs text-white/70">
          {hvacData.efficiency}% efficient
        </div>
      </div>
      <div className="mt-2 text-xs">
        <div className="flex justify-between">
          <span className="text-white/70">Maintenance:</span>
          <span className={`${
            hvacData.maintenanceStatus === "Optimal" 
              ? "text-green-400"
              : hvacData.maintenanceStatus === "Needs Service"
              ? "text-amber-400"
              : "text-blue-400"
          }`}>
            {hvacData.maintenanceStatus}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Energy:</span>
          <span>{hvacData.energyConsumption} kWh</span>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <Fan className="w-4 h-4 text-white/30" />
      </div>
    </DashboardMetricCard>
  );
};

export default HVACCard;
