
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, CalendarClock, ShieldCheck, ArrowRight } from 'lucide-react';
import { EnhancedText } from '@/components/ui/MicroInteractions';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverDemo, setHoverDemo] = useState(false);
  
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

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-b from-white to-gray-50 dark:from-background-dark dark:to-black/70">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-background-dark dark:via-gray-900/50 dark:to-black/80 opacity-90"></div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[70%] rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[80%] h-[70%] rounded-full bg-gradient-to-tl from-highlight/5 to-transparent blur-3xl"></div>
      </div>
      
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)`,
        }}
      ></div>

      <div className="container mx-auto z-10 px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="mb-8 animate-float" style={{ animationDelay: "0s" }}>
            <div className="flex items-center justify-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/27f5da26-b388-4950-8f4b-3cc7bbf89a05.png" 
                  alt="Lumesys Logo" 
                  className="h-16 w-16 mr-3 filter drop-shadow-[0_0_8px_rgba(168,235,18,0.6)] transition-transform duration-300 hover:scale-110" 
                />
              </div>
              
              <div className="text-3xl md:text-4xl font-bold flex items-center">
                <span className="gradient-text mr-2 font-extrabold filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] tracking-tighter">Lumesys</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4 animate-float" style={{ animationDelay: "0.2s" }}>
            <EnhancedText>DO DARE DOMINATE</EnhancedText>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight mb-6 leading-tight animate-float" style={{ animationDelay: "0.4s" }}>
            The Brain for <span className="gradient-text font-normal filter drop-shadow-[0_0_20px_rgba(168,235,18,0.3)]">Energy Optimization</span> & Efficiency
          </h1>
          
          <p className="text-lg md:text-xl text-black/80 max-w-3xl mb-6 animate-float" style={{ animationDelay: "0.6s" }}>
            <span className="text-highlight font-medium">&gt;15% off your energy bill</span> — or your AI isn't thinking hard enough.
          </p>
          
          <div className="flex items-center gap-2 mb-4 animate-float bg-accent/10 px-4 py-2 rounded-full" style={{ animationDelay: "0.5s" }}>
            <ShieldCheck className="w-5 h-5 text-accent" />
            <p className="text-sm md:text-base font-medium">
              <span className="text-accent">Go live in 48 hours.</span> Think faster than the competition.
            </p>
          </div>
          
          <div className="mb-8 animate-float" style={{ animationDelay: "0.7s" }}>
            <p className="text-lg md:text-xl font-medium text-black/90 italic">
              "Designed to Think. Built to Optimize."
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-float" style={{ animationDelay: "0.8s" }}>
            <div 
              className="relative group"
              onMouseEnter={() => setHoverDemo(true)}
              onMouseLeave={() => setHoverDemo(false)}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.2 }
                }}
              >
                <Button 
                  onClick={scrollToContact}
                  className="relative bg-gradient-to-r from-accent to-highlight text-white font-medium px-8 py-6 rounded-full text-lg transition-all duration-300 hover:brightness-110 shadow-lg overflow-hidden group"
                  aria-label="Request a product demo"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request Demo
                    <motion.div
                      animate={{
                        x: hoverDemo ? [0, 5, 0] : 0
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: hoverDemo ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <CalendarClock className="w-4 h-4 transition-opacity duration-300" />
                    </motion.div>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ 
                      scale: 1.5, 
                      opacity: 0.15,
                      transition: { duration: 0.5 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-16 animate-bounce">
            <button 
              onClick={() => {
                const dashboardSection = document.getElementById('dashboard-preview');
                if (dashboardSection) {
                  dashboardSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex flex-col items-center text-black/60 hover:text-highlight transition-colors"
              aria-label="View dashboard preview"
            >
              <span className="text-sm mb-2 font-medium">Scroll to Dashboard</span>
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float will-change-transform" 
        style={{ 
          animationDelay: "1.5s", 
          animationDuration: "8s",
          transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0)` 
        }}
      ></div>
    </section>
  );
};

export default HeroSection;
