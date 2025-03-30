
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type ScrollIndicatorProps = {
  targetId: string;
};

const ScrollIndicator = ({ targetId }: ScrollIndicatorProps) => {
  const [visible, setVisible] = useState(true);
  
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
      className={`absolute bottom-8 left-0 right-0 flex justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button 
        onClick={scrollToTarget}
        className="flex flex-col items-center text-black/70 hover:text-black transition-colors"
        aria-label={`Scroll to ${targetId}`}
      >
        <span className="mb-2 text-sm">Scroll</span>
        <ChevronDown className="animate-bounce" size={24} />
      </button>
    </div>
  );
};

export default ScrollIndicator;
