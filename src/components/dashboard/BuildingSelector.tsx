
import React from 'react';
import { Building2 } from 'lucide-react';

interface BuildingSelectorProps {
  buildings: string[];
  activeBuilding: string;
  setActiveBuilding: (building: string) => void;
}

const BuildingSelector: React.FC<BuildingSelectorProps> = ({
  buildings,
  activeBuilding,
  setActiveBuilding,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2 text-white/80 text-xs">
        <Building2 className="w-3 h-3" />
        <span>Select a building to view its metrics</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {buildings.map((building) => (
          <button
            key={building}
            onClick={() => setActiveBuilding(building)}
            className={`px-4 py-2 rounded-md transition-all ${
              activeBuilding === building
                ? "bg-highlight text-black font-medium shadow-md shadow-highlight/30 border border-highlight/50"
                : "bg-white/10 hover:bg-white/20 text-white/80 border border-white/10"
            }`}
          >
            {building}
            {activeBuilding === building && (
              <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-black"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BuildingSelector;
