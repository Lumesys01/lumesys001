
import React, { useState, useEffect } from 'react';
import { ChevronDown, MousePointerClick } from 'lucide-react';

type ScrollIndicatorProps = {
  targetId: string;
};

const ScrollIndicator = ({ targetId }: ScrollIndicatorProps) => {
  const [visible, setVisible] = useState(true);
  const [hover, setHover] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Hide the scroll indicator after scrolling a bit
      if (window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div 
      className={`absolute bottom-8 left-0 right-0 flex justify-center transition-all duration-500 ${
        visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 pointer-events-none transform translate-y-10'
      }`}
    >
      <button 
        onClick={scrollToTarget}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex flex-col items-center text-black/70 hover:text-black transition-colors group"
        aria-label={`Scroll to ${targetId}`}
      >
        <div className="relative flex items-center justify-center mb-3">
          <span className="text-sm font-medium transition-all duration-300 group-hover:text-highlight">
            Scroll to explore
          </span>
          {hover && (
            <MousePointerClick className="absolute -right-5 top-0 w-3.5 h-3.5 text-highlight animate-pulse" />
          )}
        </div>
        
        <div className={`relative transition-all duration-300 ${hover ? 'transform scale-125' : ''}`}>
          <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping opacity-75"></div>
          <ChevronDown className={`relative z-10 w-6 h-6 ${hover ? 'text-highlight animate-bounce' : 'text-accent/80 animate-pulse'}`} />
        </div>
      </button>
    </div>
  );
};

export default ScrollIndicator;
