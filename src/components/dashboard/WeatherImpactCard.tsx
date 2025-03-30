
import React from 'react';
import { CloudLightning } from 'lucide-react';
import DashboardMetricCard from './DashboardMetricCard';

const WeatherImpactCard: React.FC = () => {
  return (
    <DashboardMetricCard title="Weather Impact" icon={<CloudLightning />} iconColor="text-blue-400">
      <div className="text-3xl font-semibold">
        73°F <span className="text-sm text-white/50">Sunny</span>
      </div>
      <div className="mt-2 text-xs">
        <div className="flex justify-between">
          <span className="text-white/70">HVAC Load:</span>
          <span className="text-amber-400">+12%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Forecast:</span>
          <span className="text-blue-400">Stable</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Humidity:</span>
          <span>42%</span>
        </div>
      </div>
    </DashboardMetricCard>
  );
};

export default WeatherImpactCard;
