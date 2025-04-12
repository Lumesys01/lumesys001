
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface FeatureIndicatorProps {
  color: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
}

const FeatureIndicator: React.FC<FeatureIndicatorProps> = ({ color, label, icon, description }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex flex-col items-center p-4 rounded-lg hover:bg-accent/10 transition-all cursor-pointer relative group">
          <div className="flex items-center justify-center mb-3 relative">
            <div className={`absolute w-8 h-8 rounded-full ${color} opacity-20 animate-pulse blur-md`}></div>
            {icon ? (
              <div className="z-10">{icon}</div>
            ) : (
              <span className={`w-4 h-4 z-10 inline-block rounded-full ${color} shadow-lg`}></span>
            )}
          </div>
          <span className="font-medium text-center group-hover:text-accent transition-colors">{label}</span>
        </div>
      </HoverCardTrigger>
      {description && (
        <HoverCardContent variant="premium" side="bottom" className="text-sm">
          <p className="text-sm">{description}</p>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default FeatureIndicator;
