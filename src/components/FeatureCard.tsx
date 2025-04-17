
import React, { useState } from 'react';
import { LucideIcon, Zap } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  popupContent: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, popupContent }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isIconAnimating, setIsIconAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleIconClick = () => {
    setIsIconAnimating(true);
    setShowPopup(true);
    setHasInteracted(true);
    // Reset animation after it completes
    setTimeout(() => setIsIconAnimating(false), 1000);
  };

  return (
    <div 
      className={`neo-card p-6 sm:p-8 relative group hover:shadow-lg transition-all duration-500 
        ${!hasInteracted && 'animate-pulse-subtle'}
        ${showPopup ? 'transform scale-[1.01] bg-white shadow-xl border-accent/20' : ''}`}
      onMouseLeave={() => setShowPopup(false)}
    >
      {/* Subtle highlight gradient when hovered */}
      <div className={`absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl transition-opacity duration-500 ${showPopup ? 'opacity-100' : 'opacity-0'}`}></div>
      
      <div 
        className="clickable-icon mb-6 inline-block"
        onClick={handleIconClick}
        role="button"
        tabIndex={0}
        aria-label={`${title} icon`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleIconClick();
          }
        }}
      >
        <Icon 
          className={`w-8 h-8 text-accent transition-all duration-300 
            ${isIconAnimating ? 'animate-bounce text-highlight' : ''}`} 
        />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-highlight rounded-full ping-badge"></span>
        
        {!hasInteracted && (
          <span className="absolute -top-2 -right-2 text-xs bg-highlight/90 text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse-slow">
            <Zap className="w-3 h-3" /> 
            <span className="font-medium">Click me</span>
          </span>
        )}
      </div>
      
      <h3 className="text-xl sm:text-2xl font-medium mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      
      {/* Interactive popup with enhanced design */}
      <div 
        className={`absolute inset-x-4 -top-2 bg-white frosted-glass p-5 rounded-lg shadow-xl transform transition-all duration-500 z-10 text-sm border-2 border-accent/30
        ${showPopup ? 'opacity-100 -translate-y-full' : 'opacity-0 -translate-y-3/4 pointer-events-none'}`}
      >
        <div className="relative">
          {/* Accent bar at top */}
          <div className="absolute -top-5 left-0 right-0 h-1 bg-gradient-to-r from-accent/80 to-highlight/80 rounded-t-lg"></div>
          
          <p className="leading-relaxed">{popupContent}</p>
          
          {/* Bottom tag */}
          <div className="mt-2 text-xs bg-accent/10 text-accent px-2 py-1 rounded-full w-fit">
            Feature insight
          </div>
        </div>
        
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-r border-b border-accent/30"></div>
      </div>
    </div>
  );
};

export default FeatureCard;
