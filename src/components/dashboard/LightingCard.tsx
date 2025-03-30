
import React from 'react';
import { PieChart } from 'lucide-react';
import DashboardMetricCard from './DashboardMetricCard';

interface LightingCardProps {
  lightingData: {
    status: string;
    efficiency: number;
    savings: string;
    carbonReduction: string;
  };
}

const LightingCard: React.FC<LightingCardProps> = ({ lightingData }) => {
  return (
    <DashboardMetricCard title="Lighting" icon={<PieChart />}>
      <div className="flex items-end gap-1">
        <span className="text-3xl font-semibold">
          {lightingData.efficiency}%
        </span>
        <span className="text-green-400 text-sm mb-1">
          ({lightingData.savings} saved)
        </span>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
          {lightingData.status}
        </div>
      </div>
      <div className="mt-2 text-xs">
        <div className="flex justify-between">
          <span className="text-white/70">Carbon Reduction:</span>
          <span className="text-green-400">{lightingData.carbonReduction}</span>
        </div>
      </div>
    </DashboardMetricCard>
  );
};

export default LightingCard;
