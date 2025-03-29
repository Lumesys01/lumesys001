
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  popupContent: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, popupContent }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div 
      className="glass-card rounded-xl p-6 sm:p-8 relative group"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div className="mb-6 p-3 rounded-lg bg-primary inline-block">
        <Icon className="w-8 h-8 text-highlight" />
      </div>
      
      <h3 className="text-xl sm:text-2xl font-medium mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
      
      {/* Interactive popup */}
      <div 
        className={`absolute inset-x-4 -top-2 bg-surface glass-card p-4 rounded-lg shadow-xl transform transition-all duration-300 z-10 text-sm border border-highlight/30
        ${showPopup ? 'opacity-100 -translate-y-full' : 'opacity-0 -translate-y-3/4 pointer-events-none'}`}
      >
        {popupContent}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-surface border-r border-b border-highlight/30"></div>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 -z-10 bg-glow-gradient opacity-0 group-hover:opacity-10 blur-xl rounded-xl transition-opacity duration-500"></div>
    </div>
  );
};

export default FeatureCard;
