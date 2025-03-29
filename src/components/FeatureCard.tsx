
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
  const [isIconAnimating, setIsIconAnimating] = useState(false);

  const handleIconClick = () => {
    setIsIconAnimating(true);
    setShowPopup(true);
    // Reset animation after it completes
    setTimeout(() => setIsIconAnimating(false), 1000);
  };

  return (
    <div 
      className="neo-card p-6 sm:p-8 relative group hover:shadow-lg transition-all duration-300"
      onMouseLeave={() => setShowPopup(false)}
    >
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
      </div>
      
      <h3 className="text-xl sm:text-2xl font-medium mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      
      {/* Interactive popup */}
      <div 
        className={`absolute inset-x-4 -top-2 bg-white frosted-glass p-4 rounded-lg shadow-xl transform transition-all duration-300 z-10 text-sm border-2 border-accent/30
        ${showPopup ? 'opacity-100 -translate-y-full' : 'opacity-0 -translate-y-3/4 pointer-events-none'}`}
      >
        {popupContent}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-r border-b border-accent/30"></div>
      </div>
    </div>
  );
};

export default FeatureCard;
