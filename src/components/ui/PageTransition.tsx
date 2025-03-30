
import React, { useEffect, useRef } from 'react';

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Add delay option for staggered animations
  direction?: 'up' | 'down' | 'left' | 'right'; // Add direction options
};

const PageTransition = ({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up'
}: PageTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply animation after any specified delay
            setTimeout(() => {
              if (ref.current) {
                ref.current.classList.add('animate-in-view');
                ref.current.style.opacity = '1';
                
                // Apply direction-based transform
                switch (direction) {
                  case 'up':
                    ref.current.style.transform = 'translateY(0)';
                    break;
                  case 'down':
                    ref.current.style.transform = 'translateY(0)';
                    break;
                  case 'left':
                    ref.current.style.transform = 'translateX(0)';
                    break;
                  case 'right':
                    ref.current.style.transform = 'translateX(0)';
                    break;
                }
              }
            }, delay);
            
            // Once animation is complete, stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Increased threshold for better timing
        rootMargin: '20px', // Added margin to start animations a bit earlier
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, direction]);
  
  // Set initial styles based on direction
  let initialStyles = {};
  switch (direction) {
    case 'up':
      initialStyles = { opacity: 0, transform: 'translateY(30px)' };
      break;
    case 'down':
      initialStyles = { opacity: 0, transform: 'translateY(-30px)' };
      break;
    case 'left':
      initialStyles = { opacity: 0, transform: 'translateX(30px)' };
      break;
    case 'right':
      initialStyles = { opacity: 0, transform: 'translateX(-30px)' };
      break;
  }
  
  return (
    <div 
      ref={ref} 
      className={`transform transition-all duration-700 ease-out ${className}`}
      style={{
        ...initialStyles,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
