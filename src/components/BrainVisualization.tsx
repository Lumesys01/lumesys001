
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ToggleRight, ToggleLeft, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BrainRegion {
  id: string;
  name: string;
  description: string;
  color: string;
  x: number;
  y: number;
  radius: number;
  connections: string[];
  moduleId: string;
}

interface AIModule {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const BrainVisualization: React.FC = () => {
  const [isBiological, setIsBiological] = useState(true);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const brainRegions: BrainRegion[] = [
    {
      id: "frontal",
      name: "Frontal Lobe",
      description: "Decision making and problem solving",
      color: "#9b87f5",
      x: 30,
      y: 40,
      radius: 22,
      connections: ["temporal", "parietal"],
      moduleId: "optimization"
    },
    {
      id: "parietal",
      name: "Parietal Lobe",
      description: "Sensory processing and spatial awareness",
      color: "#7E69AB",
      x: 65,
      y: 35,
      radius: 20,
      connections: ["frontal", "occipital"],
      moduleId: "monitoring"
    },
    {
      id: "temporal",
      name: "Temporal Lobe",
      description: "Memory formation and language processing",
      color: "#D946EF",
      x: 25,
      y: 65,
      radius: 18,
      connections: ["frontal", "occipital"],
      moduleId: "analytics"
    },
    {
      id: "occipital",
      name: "Occipital Lobe",
      description: "Visual processing",
      color: "#F97316",
      x: 60,
      y: 70,
      radius: 16,
      connections: ["parietal", "temporal"],
      moduleId: "compliance"
    },
    {
      id: "cerebellum",
      name: "Cerebellum",
      description: "Motor control and balance",
      color: "#0EA5E9",
      x: 50,
      y: 85,
      radius: 14,
      connections: ["temporal"],
      moduleId: "management"
    }
  ];

  const aiModules: AIModule[] = [
    {
      id: "optimization",
      name: "Energy Optimization",
      description: "AI algorithms that dynamically adjust energy usage based on real-time data and predictive analytics",
      color: "#9b87f5",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/></svg>
    },
    {
      id: "monitoring",
      name: "Proactive Monitoring",
      description: "24/7 anomaly detection and predictive maintenance alerts to prevent system failures",
      color: "#7E69AB",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
    },
    {
      id: "analytics",
      name: "Data Analytics",
      description: "Deep learning algorithms that identify patterns and provide actionable insights for energy efficiency",
      color: "#D946EF",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
    },
    {
      id: "compliance",
      name: "Compliance Tracking",
      description: "Automated regulatory compliance monitoring and detailed reporting capabilities",
      color: "#F97316",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect width="6" height="4" x="9" y="3" rx="2"/><path d="m9 14 2 2 4-4"/></svg>
    },
    {
      id: "management",
      name: "Central Management",
      description: "Unified control interface for managing multiple sites and systems from a single dashboard",
      color: "#0EA5E9",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10v2H7z"/><path d="M7 11h10v2H7z"/><path d="M7 15h10v2H7z"/></svg>
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      triggerAnimation();
    }
  }, [isVisible, hasAnimated]);

  const triggerAnimation = () => {
    if (hasAnimated) return;
    
    setIsAnimating(true);
    setHasAnimated(true);
    
    // Animate regions in sequence
    brainRegions.forEach((region, index) => {
      setTimeout(() => {
        setActiveRegion(region.id);
        setTimeout(() => {
          setActiveRegion(null);
        }, 700);
      }, index * 800);
    });
    
    // End animation sequence
    setTimeout(() => {
      setIsAnimating(false);
    }, brainRegions.length * 800 + 700);
  };

  const getModuleForRegion = (regionId: string) => {
    const region = brainRegions.find(r => r.id === regionId);
    if (!region) return null;
    return aiModules.find(m => m.id === region.moduleId);
  };

  const toggleBrainMode = () => {
    setIsBiological(prev => !prev);
  };

  return (
    <section className="py-20 relative overflow-hidden" id="brain-visualization">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-background-dark dark:via-gray-900/30 dark:to-background-dark"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="flex justify-center mb-10">
          <h2 className="text-3xl md:text-5xl font-light">
            Explore the <span className="gradient-text font-normal">Brain</span>
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
          <div className="w-full lg:w-1/2 relative min-h-[400px] flex justify-center">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              {/* Brain Shape Background */}
              <motion.div 
                className="absolute inset-0 bg-gray-100 dark:bg-gray-800/30 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] shadow-lg"
                animate={{
                  borderRadius: isBiological 
                    ? "40% 60% 70% 30% / 50% 40% 60% 50%" 
                    : "10% 10% 10% 10% / 10% 10% 10% 10%"
                }}
                transition={{ duration: 1 }}
              ></motion.div>
              
              {/* Neural connections */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {brainRegions.map(region => 
                  region.connections.map(connId => {
                    const connectedRegion = brainRegions.find(r => r.id === connId);
                    if (!connectedRegion) return null;
                    
                    return (
                      <motion.line 
                        key={`${region.id}-${connId}`}
                        x1={`${region.x}%`} 
                        y1={`${region.y}%`} 
                        x2={`${connectedRegion.x}%`} 
                        y2={`${connectedRegion.y}%`}
                        stroke={activeRegion === region.id || activeRegion === connId ? "#A8EB12" : "#D6BCFA"}
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        initial={{ pathLength: 0, opacity: isBiological ? 1 : 0.3 }}
                        animate={{ 
                          pathLength: 1, 
                          opacity: isBiological ? 1 : 0.3,
                          stroke: (activeRegion === region.id || activeRegion === connId) ? "#A8EB12" : "#D6BCFA"
                        }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    );
                  })
                )}
              </svg>
              
              {/* Brain regions / AI modules */}
              {brainRegions.map((region) => {
                const isActive = activeRegion === region.id;
                
                return (
                  <TooltipProvider key={region.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="absolute rounded-full cursor-pointer flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 hover:z-10"
                          style={{ 
                            left: `${region.x}%`, 
                            top: `${region.y}%`, 
                            backgroundColor: isActive ? "#A8EB12" : region.color,
                            width: `${region.radius * 2}px`,
                            height: `${region.radius * 2}px`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: isActive ? 1.2 : 1, 
                            opacity: isBiological ? 1 : 0.5,
                            boxShadow: isActive ? "0 0 15px rgba(168, 235, 18, 0.7)" : "none"
                          }}
                          transition={{ duration: 0.5 }}
                          onMouseEnter={() => !isAnimating && setActiveRegion(region.id)}
                          onMouseLeave={() => !isAnimating && setActiveRegion(null)}
                        >
                          {!isBiological && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="text-white"
                            >
                              {getModuleForRegion(region.id)?.icon}
                            </motion.div>
                          )}
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[250px] p-3 z-50">
                        <div>
                          <p className="font-bold mb-1 text-accent">
                            {isBiological ? region.name : getModuleForRegion(region.id)?.name}
                          </p>
                          <p className="text-sm">
                            {isBiological ? region.description : getModuleForRegion(region.id)?.description}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
              
              {/* Main pulsing center */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent z-10"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 rgba(168, 235, 18, 0.4)",
                    "0 0 20px rgba(168, 235, 18, 0.7)",
                    "0 0 0 rgba(168, 235, 18, 0.4)"
                  ]
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  duration: 3,
                  ease: "easeInOut"
                }}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 p-4">
            <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-xl p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-light mb-4">
                {isBiological 
                  ? "The Biological Brain" 
                  : "The Lumesys AI Brain"}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {isBiological 
                  ? "Just as the human brain processes sensory inputs and coordinates responses, Lumesys serves as the central intelligence for your building systems." 
                  : "Lumesys AI brings intelligence to energy management by analyzing patterns, making decisions, and optimizing systems automatically."}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {aiModules.map((module) => (
                  <motion.div 
                    key={module.id}
                    className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start gap-3 ${activeRegion === brainRegions.find(r => r.moduleId === module.id)?.id ? 'bg-gradient-to-br from-accent/10 to-highlight/5' : ''}`}
                    animate={{
                      scale: activeRegion === brainRegions.find(r => r.moduleId === module.id)?.id ? 1.05 : 1,
                      boxShadow: activeRegion === brainRegions.find(r => r.moduleId === module.id)?.id ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
                    }}
                  >
                    <div className="rounded-full p-2" style={{ backgroundColor: `${module.color}20` }}>
                      <div className="text-accent">
                        {module.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{module.name}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex items-center justify-center mt-8">
                <button 
                  onClick={toggleBrainMode}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className={`text-sm ${isBiological ? 'font-medium' : ''}`}>Biological Brain</span>
                  <motion.div
                    initial={false}
                    animate={{ rotate: isBiological ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isBiological ? <ToggleLeft className="text-accent" /> : <ToggleRight className="text-highlight" />}
                  </motion.div>
                  <span className={`text-sm ${!isBiological ? 'font-medium' : ''}`}>Lumesys AI Brain</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="flex items-center justify-center text-gray-500 text-sm">
            <Info size={14} className="mr-1" />
            Hover or tap regions to explore functionality
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrainVisualization;
