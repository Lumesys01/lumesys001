
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

// New engagement-enhancing components

// Creates subtle movement to draw attention
export const FloatingElement: React.FC<{
  children: ReactNode;
  className?: string;
  floatIntensity?: number; // Controls how much the element floats
}> = ({ children, className = '', floatIntensity = 10 }) => {
  return (
    <motion.div
      className={`${className}`}
      animate={{
        y: [`-${floatIntensity}px`, `${floatIntensity}px`, `-${floatIntensity}px`]
      }}
      transition={{
        duration: 6 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      }}
    >
      {children}
    </motion.div>
  );
};

// Creates a subtle bounce effect when elements come into view
export const BounceInView: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay * 0.1
      }}
    >
      {children}
    </motion.div>
  );
};

// Creates a sense of urgency through pulsing animations
export const AttentionPulse: React.FC<{
  children: ReactNode;
  className?: string;
  pulseColor?: string;
  pulseIntensity?: number;
}> = ({ children, className = '', pulseColor = "rgba(168,235,18,0.5)", pulseIntensity = 1.05 }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileInView={{
        scale: [1, pulseIntensity, 1],
        boxShadow: [
          `0 0 0 0 ${pulseColor}`,
          `0 0 15px 5px ${pulseColor}`,
          `0 0 0 0 ${pulseColor}`
        ]
      }}
      viewport={{ once: false, margin: '0px' }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
};

// Creates a persistent but subtle visual cue suggesting continuation
export const DirectionalHint: React.FC<{
  children: ReactNode;
  className?: string;
  direction?: 'down' | 'right';
}> = ({ children, className = '', direction = 'down' }) => {
  const directionTransform = direction === 'down' 
    ? { y: [0, 6, 0] }
    : { x: [0, 6, 0] };
    
  return (
    <motion.div 
      className={`inline-flex items-center ${className}`}
    >
      {children}
      <motion.div
        className="ml-2"
        animate={directionTransform}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {direction === 'down' ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
};

// Creates a subtle highlight that draws attention to limited availability
export const LimitedAvailability: React.FC<{
  children: ReactNode;
  className?: string;
  spots?: number;
}> = ({ children, className = '', spots = 15 }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -top-2 -right-2 bg-accent/90 text-white text-xs font-bold px-2 py-1 rounded-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
      >
        {spots} spots left
      </motion.div>
      {children}
    </div>
  );
};

// Creates a gently pulsating notification dot
export const NotificationDot: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 8 }) => {
  return (
    <motion.div
      className={`rounded-full bg-accent ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};
