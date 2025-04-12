
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, CalendarClock } from 'lucide-react';
import { EnhancedText } from '@/components/ui/MicroInteractions';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverDemo, setHoverDemo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for parallax effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    });
  }, []);
  
  useEffect(() => {
    let frameId: number | null = null;
    const throttledHandleMouseMove = (e: MouseEvent) => {
      if (frameId === null) {
        frameId = requestAnimationFrame(() => {
          handleMouseMove(e);
          frameId = null;
        });
      }
    };
    
    window.addEventListener('mousemove', throttledHandleMouseMove);
    return () => {
      window.removeEventListener('mousemove', throttledHandleMouseMove);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [handleMouseMove]);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Typewriter effect text variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-b from-white to-gray-50 dark:from-background-dark dark:to-black/70">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-background-dark dark:via-gray-900/50 dark:to-black/80 opacity-90"></div>
      
      {/* Dynamic background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div 
          className="absolute -top-[30%] -left-[10%] w-[80%] h-[70%] rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-[30%] -right-[10%] w-[80%] h-[70%] rounded-full bg-gradient-to-tl from-highlight/5 to-transparent blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
      
      {/* Mouse parallax effect */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)`,
        }}
      />

      <div className="container mx-auto z-10 px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div 
            className="mb-8 animate-float"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/27f5da26-b388-4950-8f4b-3cc7bbf89a05.png" 
                  alt="Lumesys Logo" 
                  className="h-16 w-16 filter drop-shadow-[0_0_8px_rgba(168,235,18,0.6)] transition-transform duration-300 hover:scale-110 relative z-10" 
                />
              </div>
              
              <motion.div 
                className="text-3xl md:text-4xl font-bold flex items-center ml-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="gradient-text mr-2 font-extrabold filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] tracking-tighter">Lumesys</span>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <EnhancedText>DO DARE DOMINATE</EnhancedText>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-extralight mb-6 leading-tight"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Animated text with staggered letters */}
            <span className="inline-block">The</span>{' '}
            <span className="inline-block">Brain</span>{' '}
            <span className="inline-block">for</span>{' '}
            <span className="gradient-text font-normal filter drop-shadow-[0_0_20px_rgba(168,235,18,0.3)]">
              <span className="inline-block">Energy</span>{' '}
              <span className="inline-block">Optimization</span>
            </span>{' '}
            <span className="inline-block">&</span>{' '}
            <span className="inline-block">Efficiency</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-black/80 dark:text-white/80 max-w-3xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <span className="text-highlight font-medium">&gt;15% off your energy bill</span>—or your AI isn't thinking hard enough.
          </motion.p>
          
          <motion.div 
            className="flex items-center gap-2 mb-4 bg-accent/10 px-4 py-2 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <p className="text-sm md:text-base font-medium">
              <span className="text-accent">Elite:</span> Go live in 48 hours. Think faster than the competition.
            </p>
          </motion.div>
          
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            <p className="text-lg md:text-xl font-medium text-black/90 dark:text-white/90 italic">
              "Designed to Think. Built to Optimize."
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <div 
              className="relative group"
              onMouseEnter={() => setHoverDemo(true)}
              onMouseLeave={() => setHoverDemo(false)}
            >
              <Button 
                onClick={scrollToContact}
                className="bg-gradient-to-r from-accent to-highlight text-white font-medium px-8 py-6 rounded-full text-lg hover:scale-105 transition-all duration-300 hover:brightness-110 shadow-lg relative z-10 overflow-hidden"
                aria-label="Request a product demo"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Request Demo
                  <motion.span
                    animate={hoverDemo ? { x: [0, 5, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    {hoverDemo ? <ArrowRight className="w-4 h-4" /> : <CalendarClock className="w-4 h-4" />}
                  </motion.span>
                </span>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          >
            <button 
              onClick={() => {
                const dashboardSection = document.getElementById('dashboard-preview');
                if (dashboardSection) {
                  dashboardSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex flex-col items-center text-black/60 dark:text-white/60 hover:text-highlight transition-colors"
              aria-label="View dashboard preview"
            >
              <span className="text-sm mb-2 font-medium">Scroll to Dashboard</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl will-change-transform" 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ 
          transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0)` 
        }}
      />
    </section>
  );
};

export default HeroSection;
