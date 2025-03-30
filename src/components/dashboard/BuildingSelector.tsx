
import React from 'react';

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
    <div className="flex space-x-2 mb-6">
      {buildings.map((building) => (
        <button
          key={building}
          onClick={() => setActiveBuilding(building)}
          className={`px-4 py-2 rounded-md transition-all ${
            activeBuilding === building
              ? "bg-highlight text-white"
              : "bg-white/10 hover:bg-white/20 text-white/80"
          }`}
        >
          {building}
        </button>
      ))}
    </div>
  );
};

export default BuildingSelector;
