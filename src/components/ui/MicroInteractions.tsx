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

export const EnhancedText: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.span
      className={`text-xl md:text-2xl font-extrabold tracking-widest uppercase ${className}`}
      style={{ 
        background: 'linear-gradient(to right, #A8EB12, #00bf72, #A8EB12)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 2px 10px rgba(168,235,18,0.4), 0 0 30px rgba(0,191,114,0.2)',
        letterSpacing: '0.15em'
      }}
      animate={{
        backgroundPosition: ['0% center', '200% center', '0% center'],
        textShadow: [
          '0 2px 10px rgba(168,235,18,0.4), 0 0 30px rgba(0,191,114,0.2)',
          '0 2px 15px rgba(168,235,18,0.7), 0 0 40px rgba(0,191,114,0.5)',
          '0 2px 10px rgba(168,235,18,0.4), 0 0 30px rgba(0,191,114,0.2)'
        ]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.span>
  );
};

export const PulsingGlowText: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ textShadow: "0 0 8px rgba(168,235,18,0.4)" }}
      animate={{
        textShadow: [
          "0 0 8px rgba(168,235,18,0.4)",
          "0 0 18px rgba(168,235,18,0.7)",
          "0 0 8px rgba(168,235,18,0.4)"
        ],
        color: [
          "rgba(168,235,18,1)",
          "rgba(255,255,255,1)",
          "rgba(168,235,18,1)"
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {children}
    </motion.div>
  );
};
