
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureIndicatorProps {
  color: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
}

const FeatureIndicator: React.FC<FeatureIndicatorProps> = ({ color, label, icon, description }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center p-3 rounded-lg hover:bg-accent/10 transition-all cursor-pointer relative group">
            <div className="flex items-center justify-center mb-2 relative">
              <div className={`absolute w-8 h-8 rounded-full ${color} opacity-20 animate-pulse blur-md`}></div>
              {icon ? (
                <div className="z-10">{icon}</div>
              ) : (
                <span className={`w-4 h-4 z-10 inline-block rounded-full ${color} shadow-lg`}></span>
              )}
            </div>
            <span className="font-medium text-center text-xs leading-tight group-hover:opacity-80 transition-colors">
              {label}
            </span>
          </div>
        </TooltipTrigger>
        {description && (
          <TooltipContent side="bottom" className="bg-black/90 text-white border-highlight/30">
            <p className="text-sm">{description}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default FeatureIndicator;
