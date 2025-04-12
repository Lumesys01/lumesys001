
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion } from "framer-motion";

interface FeatureIndicatorProps {
  color: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  premium?: boolean;
}

const FeatureIndicator: React.FC<FeatureIndicatorProps> = ({ 
  color, 
  label, 
  icon, 
  description,
  premium = false
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div 
          className="flex flex-col items-center p-4 rounded-lg hover:bg-accent/10 transition-all cursor-pointer relative group"
          whileHover={{ 
            y: -5,
            transition: { duration: 0.2 }
          }}
        >
          <div className="flex items-center justify-center mb-3 relative">
            <motion.div 
              className={`absolute w-8 h-8 rounded-full ${color} opacity-20 blur-md`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            {icon ? (
              <motion.div 
                className="z-10"
                whileHover={{ 
                  rotate: 5,
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {icon}
              </motion.div>
            ) : (
              <motion.span 
                className={`w-4 h-4 z-10 inline-block rounded-full ${color} shadow-lg`}
                whileHover={{ 
                  scale: 1.2,
                  transition: { duration: 0.2 }
                }}
              />
            )}
          </div>
          <span className="font-medium text-center group-hover:text-accent transition-colors">{label}</span>
        </motion.div>
      </HoverCardTrigger>
      {description && (
        <HoverCardContent 
          variant={premium ? "exclusive" : "premium"} 
          side="bottom" 
          className="text-sm"
        >
          <p className="text-sm">{description}</p>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default FeatureIndicator;
