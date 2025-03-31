
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export const ButtonHoverEffect: React.FC<{
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export const SlideInContainer: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}> = ({ children, className = '', delay = 0, direction = 'up' }) => {
  // Define initial state with proper typing for variants
  let initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  
  switch (direction) {
    case 'left':
      initial = { ...initial, x: 50 };
      break;
    case 'right':
      initial = { ...initial, x: -50 };
      break;
    case 'up':
      initial = { ...initial, y: 50 };
      break;
    case 'down':
      initial = { ...initial, y: -50 };
      break;
  }
  
  return (
    <motion.div 
      className={className}
      initial={initial}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.1, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

export const ScaleOnHover: React.FC<{
  children: ReactNode;
  className?: string;
  scale?: number;
}> = ({ children, className = '', scale = 1.05 }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredChildren: React.FC<{
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.05 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: staggerDelay 
          } 
        },
        hidden: { 
          opacity: 0 
        }
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
          transition={{ duration: 0.5 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
