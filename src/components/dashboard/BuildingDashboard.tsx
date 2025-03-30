
import React from 'react';
import BuildingSelector from './BuildingSelector';
import HVACCard from './HVACCard';
import LightingCard from './LightingCard';
import CarbonEmissionsCard from './CarbonEmissionsCard';
import OccupancyCard from './OccupancyCard';
import EnergyUsageCard from './EnergyUsageCard';
import WeatherImpactCard from './WeatherImpactCard';

interface BuildingData {
  hvac: {
    status: string;
    efficiency: number;
    temperature: number;
    carbonImpact: string;
    maintenanceStatus: string;
    energyConsumption: number;
  };
  lighting: {
    status: string;
    efficiency: number;
    savings: string;
    carbonReduction: string;
  };
  occupancy: {
    current: number;
    capacity: number;
    peakHours: string;
    energyImpact: string;
  };
  energy: {
    current: number;
    target: number;
    savings: string;
    co2Reduction: string;
  };
  carbon: {
    current: number;
    target: number;
    reduction: string;
    trend: string;
  };
}

interface BuildingDashboardProps {
  buildingData: Record<string, BuildingData>;
}

const BuildingDashboard: React.FC<BuildingDashboardProps> = ({ buildingData }) => {
  const [activeBuilding, setActiveBuilding] = React.useState("Building A");
  const buildings = Object.keys(buildingData);
  
  const currentBuildingData = buildingData[activeBuilding as keyof typeof buildingData];

  return (
    <div className="w-full h-full bg-black/90 text-white p-5 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Building Management System</h3>
        <div className="text-sm text-white/70">Live Data • Last updated: Just now</div>
      </div>
      
      <BuildingSelector 
        buildings={buildings}
        activeBuilding={activeBuilding}
        setActiveBuilding={setActiveBuilding}
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <HVACCard hvacData={currentBuildingData.hvac} />
        <LightingCard lightingData={currentBuildingData.lighting} />
        <CarbonEmissionsCard carbonData={currentBuildingData.carbon} />
        <OccupancyCard occupancyData={currentBuildingData.occupancy} />
        <EnergyUsageCard energyData={currentBuildingData.energy} />
        <WeatherImpactCard />
      </div>

      <div className="text-center mt-6 text-white/60 text-sm">
        Real-time monitoring helps identify optimization opportunities and reduce energy waste.
      </div>
    </div>
  );
};

export default BuildingDashboard;
