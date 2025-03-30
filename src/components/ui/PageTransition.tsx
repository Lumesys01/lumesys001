
import React, { useEffect, useRef } from 'react';

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
            // Once animation is complete, stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
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
  }, []);
  
  return (
    <div 
      ref={ref} 
      className={`opacity-0 transform transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
