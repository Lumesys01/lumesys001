import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Zap, Users, Award, Shield, LineChart, BatteryCharging, Lightbulb, Rocket, TrendingUp, Star, CircleDollarSign, CircleUserRound } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ChartContainer, ChartTooltipContent } from './ui/chart';
import { Progress } from './ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

const WhyLumesys: React.FC = () => {
  const [savingsPercent, setSavingsPercent] = useState(0);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('features');
  const [animateMetric, setAnimateMetric] = useState(false);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  
  useEffect(() => {
    // Start with 0% and animate to 23%
    const targetValue = 23;
    const duration = 2000; // 2 seconds
    const step = 10; // Update every 10ms for smooth animation
    const increment = (targetValue / (duration / step));
    let currentValue = 0;
    
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        setSavingsPercent(targetValue);
        clearInterval(interval);
      } else {
        setSavingsPercent(parseFloat(currentValue.toFixed(1)));
      }
    }, step);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Trigger growth metrics animation when tab changes to 'growth'
    if (activeTab === 'growth') {
      setTimeout(() => {
        setAnimateMetric(true);
      }, 300);
      
      // Launch the rocket after a delay
      setTimeout(() => {
        setRocketLaunched(true);
      }, 800);
    } else {
      setAnimateMetric(false);
      setRocketLaunched(false);
    }
  }, [activeTab]);

  const comparisonData = [
    {
      feature: "Energy Analysis",
      lumesys: "AI-powered, Real-time",
      traditional: "Manual, Periodic",
      benefit: "Immediate insights to prevent waste",
      icon: <LineChart className="w-5 h-5 text-accent" />,
      lumesysRating: 95,
      traditionalRating: 40,
    },
    {
      feature: "Anomaly Detection",
      lumesys: "Predictive, Automated",
      traditional: "Reactive, Manual",
      benefit: "Prevent issues before they occur",
      icon: <Shield className="w-5 h-5 text-accent" />,
      lumesysRating: 90,
      traditionalRating: 30,
    },
    {
      feature: "Optimization",
      lumesys: "Continuous, Adaptive",
      traditional: "Static, Scheduled",
      benefit: "24/7 optimization for maximum savings",
      icon: <BatteryCharging className="w-5 h-5 text-accent" />,
      lumesysRating: 98,
      traditionalRating: 45,
    },
    {
      feature: "Maintenance",
      lumesys: "Proactive, Preventive",
      traditional: "Reactive, Repairs",
      benefit: "Reduce downtime and extend equipment life",
      icon: <Award className="w-5 h-5 text-accent" />,
      lumesysRating: 92,
      traditionalRating: 38,
    },
    {
      feature: "Data Insights",
      lumesys: "Deep Learning Patterns",
      traditional: "Basic Historical Data",
      benefit: "Discover hidden opportunities for savings",
      icon: <Lightbulb className="w-5 h-5 text-accent" />,
      lumesysRating: 96,
      traditionalRating: 35,
    }
  ];

  const marketGrowthData = [
    { year: '2024', lumesys: 100, marketAverage: 50, users: 100 },
    { year: '2025', lumesys: 800, marketAverage: 200, users: 500 },
    { year: '2026', lumesys: 2000, marketAverage: 600, users: 1500 },
    { year: '2027', lumesys: 3200, marketAverage: 1200, users: 3000 },
    { year: '2028', lumesys: 4800, marketAverage: 2000, users: 5000 }
  ];

  // Helper function to render rating stars
  const renderRatingDots = (rating: number, maxRating: number = 100, maxDots: number = 5) => {
    const filledDots = Math.round((rating / maxRating) * maxDots);
    
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxDots }).map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full ${i < filledDots ? 'bg-accent' : 'bg-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-xs font-medium">{rating}%</span>
      </div>
    );
  };

  return (
    <section className="section-padding relative bg-white">
      <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-neonpurple/5 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light mb-4 text-black">
            Why <span className="gradient-text font-normal">Lumesys</span>?
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            See how our AI-driven approach delivers superior results compared to traditional energy management systems.
          </p>
          
          <div className="flex justify-center gap-4 mt-8 mb-8 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 text-lg transition-colors ${activeTab === 'features' 
                ? 'text-accent border-b-2 border-accent' 
                : 'text-black/60 hover:text-black/80'}`}
            >
              Feature Comparison
            </button>
            <button 
              onClick={() => setActiveTab('growth')}
              className={`px-4 py-2 text-lg transition-all ${activeTab === 'growth' 
                ? 'text-accent border-b-2 border-accent scale-110 font-medium' 
                : 'text-black/60 hover:text-black/80'}`}
            >
              Growth & Adoption
            </button>
          </div>
        </div>
        
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card rounded-xl p-8 md:p-10 text-center">
              <h3 className="text-xl font-medium mb-2 text-black">Industry Benchmark Energy Savings</h3>
              <div className="relative mb-6">
                <div className="text-7xl md:text-8xl font-light gradient-text transition-all duration-300">
                  {savingsPercent.toFixed(1)}
                  <span className="text-4xl md:text-5xl">%</span>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-highlight/20 rounded-full blur-[30px]"></div>
              </div>
              <div className="w-full mb-4">
                <Progress value={(savingsPercent / 23) * 100} className="h-2 bg-gray-200" />
              </div>
              <p className="text-black/70">
                Potential savings based on industry benchmarks for similar AI-driven energy management solutions.
              </p>
            </div>
            
            <Card className="shadow-lg border-highlight/20 overflow-hidden transition-all relative">
              {/* Add a pulsing dot to hint at interactivity */}
              <div className="absolute top-4 right-4 z-10">
                <div className="relative">
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-ping"></span>
                  <span className="w-2 h-2 rounded-full bg-accent block"></span>
                </div>
                <span className="text-xs text-accent mt-1 block">Tap to explore</span>
              </div>

              <div className="bg-gray-50 py-3 px-4 border-b border-gray-100">
                <h3 className="font-medium text-lg text-black">Feature Comparison</h3>
                <p className="text-sm text-black/60">See how Lumesys outperforms traditional systems</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {comparisonData.map((item, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer group transition-all duration-300 hover:bg-gray-50 
                      ${activeFeature === item.feature ? 'bg-accent/5' : ''}`}
                    onClick={() => setActiveFeature(activeFeature === item.feature ? null : item.feature)}
                  >
                    <div className="p-4 relative">
                      {/* Add a subtle glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      
                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="flex items-center gap-2">
                          {/* Wrap icon with a hover effect */}
                          <div className="group/icon relative">
                            {item.icon}
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full 
                              bg-accent opacity-0 group-hover/icon:opacity-100 transition-opacity"></span>
                          </div>
                          <h4 className="font-medium">{item.feature}</h4>
                        </div>
                        <button 
                          className="text-xs text-accent hover:underline z-20 relative"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveFeature(item.feature);
                          }}
                        >
                          {activeFeature === item.feature ? 'Hide details' : 'View details'}
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="bg-accent/5 p-2 rounded-md">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Check className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium">Lumesys</span>
                          </div>
                          <p className="text-xs mb-2">{item.lumesys}</p>
                          {renderRatingDots(item.lumesysRating)}
                        </div>
                        <div className="bg-gray-100 p-2 rounded-md">
                          <div className="flex items-center gap-1.5 mb-1">
                            <X className="w-4 h-4 text-black/40" />
                            <span className="text-sm font-medium text-black/70">Traditional</span>
                          </div>
                          <p className="text-xs mb-2">{item.traditional}</p>
                          {renderRatingDots(item.traditionalRating)}
                        </div>
                      </div>
                    </div>

                    {activeFeature === item.feature && (
                      <div className="bg-accent/10 p-4 border-t border-accent/20 animate-fade-in">
                        <div className="flex items-start gap-3">
                          <div className="bg-accent/20 p-1.5 rounded-full mt-0.5">
                            <Zap className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-accent mb-1">Lumesys Advantage:</p>
                            <p className="text-sm">{item.benefit}</p>
                            
                            <div className="mt-3 bg-white/60 rounded-lg p-3 border border-accent/20">
                              <h5 className="font-medium text-sm mb-2">Performance Comparison</h5>
                              <div className="relative pt-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-semibold inline-block text-accent">
                                    Lumesys
                                  </span>
                                  <span className="text-xs font-semibold inline-block text-accent">
                                    {item.lumesysRating}%
                                  </span>
                                </div>
                                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                  <div 
                                    style={{ width: `${item.lumesysRating}%` }} 
                                    className="animate-slide-in shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-accent"
                                  />
                                </div>
                              </div>
                              <div className="relative pt-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-semibold inline-block text-gray-600">
                                    Traditional
                                  </span>
                                  <span className="text-xs font-semibold inline-block text-gray-600">
                                    {item.traditionalRating}%
                                  </span>
                                </div>
                                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                  <div 
                                    style={{ width: `${item.traditionalRating}%` }} 
                                    className="animate-slide-in shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-gray-400"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'growth' && (
          <div className="glass-card rounded-xl p-8 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h2 className="font-medium text-2xl mb-4 relative">
                  <span className="gradient-text">Explosive</span> Market Growth
                  <div className="absolute -top-5 -right-5 w-10 h-10">
                    <div className={`transition-all duration-500 ${activeTab === 'growth' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                      <Star className="w-6 h-6 text-yellow-400 animate-pulse filter drop-shadow-md" />
                    </div>
                  </div>
                </h2>
                <p className="text-black/70 mb-6">
                  Lumesys is projected to grow at a <span className="font-bold text-highlight">significantly faster rate</span> than 
                  the market average for energy management systems over the next five years.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between bg-accent/5 p-3 rounded-lg border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-accent"></div>
                      <span className="font-medium">Lumesys Growth</span>
                    </div>
                    <div className="font-bold text-accent relative">
                      <span className="relative z-10">+4700%</span>
                      <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm -z-10 scale-125"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                      <span className="font-medium">Market Average</span>
                    </div>
                    <span className="font-bold text-gray-600">+1950%</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between bg-accent/5 p-3 rounded-lg border border-accent/20 overflow-hidden relative group hover:border-accent/40 transition-all duration-300 hover:shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent w-0 group-hover:w-full transition-all duration-700"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      <div className="p-2 rounded-full bg-accent/10">
                        <Users className="w-4 h-4 text-accent" />
                      </div>
                      <span className="font-medium">User Growth</span>
                    </div>
                    <div className="flex items-center gap-2 relative z-10">
                      <span className="font-bold text-accent inline-flex items-center">
                        <span className="text-sm">100</span>
                        <ArrowRight className="w-3 h-3 mx-1" />
                        <span className="text-lg animate-pulse-glow">5000</span> 
                        <span className="ml-1 text-sm">users</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm">
                  <h3 className="font-medium text-lg mb-3 text-accent">Why We're Outpacing the Market</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Faster implementation (48 hours vs. industry 4-6 weeks)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Higher ROI (23% vs. industry average 10%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Adaptive AI that improves with each installation</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="relative h-80 perspective-container">
                {/* Enhanced animated growth visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`transition-all duration-1000 ease-out transform ${animateMetric ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
                    <div className="relative h-64 w-full">
                      {/* Improved Rocket Animation with smoother movement and trail effect */}
                      <div className="absolute h-full w-full flex items-center justify-center">
                        <div 
                          className={`transition-all duration-3000 ease-out transform ${rocketLaunched ? 'translate-y-[-150px]' : 'translate-y-[150px]'}`}
                          style={{ 
                            transitionTimingFunction: rocketLaunched ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-out'
                          }}
                        >
                          <div className="relative">
                            <div className="relative z-10 transform rotate-[-20deg] hover:rotate-[-15deg] transition-transform duration-300">
                              <Rocket 
                                size={64} 
                                className="text-accent filter drop-shadow-lg" 
                              />
                              
                              {/* Rocket label */}
                              <div className="absolute -right-2 top-0 transform translate-x-full bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md border border-accent/20 shadow-md">
                                <p className="text-xs font-bold text-accent whitespace-nowrap">Lumesys Growth</p>
                              </div>
                            </div>
                            
                            {/* Enhanced rocket flame */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[80%] flex flex-col items-center">
                              <div className="w-6 h-10 bg-gradient-to-t from-accent via-highlight to-transparent rounded-b-full blur-sm animate-pulse"></div>
                              <div className="w-3 h-20 bg-gradient-to-t from-transparent via-accent/40 to-transparent rounded-full blur-md animate-pulse"></div>
                              
                              {/* Particle trail */}
                              {rocketLaunched && [...Array(8)].map((_, i) => (
                                <div 
                                  key={i}
                                  className="absolute w-2 h-2 rounded-full bg-highlight animate-leaf-fall"
                                  style={{
                                    left: `${Math.random() * 20 - 10}px`,
                                    top: `${10 + Math.random() * 20}px`,
                                    animationDelay: `${i * 0.2}s`,
                                    opacity: 0.7
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Year by Year Metrics with smoother animations */}
                      <div className="absolute w-full h-full">
                        {marketGrowthData.map((data, index) => {
                          const isLast = index === marketGrowthData.length - 1;
                          const delay = 300 + (index * 150);
                          const heightPercent = (data.lumesys / 4800) * 100;
                          
                          return (
                            <div 
                              key={data.year}
                              className="absolute flex flex-col items-center" 
                              style={{
                                left: `${20 + (index * 15)}%`,
                                bottom: '10%',
                              }}
                            >
                              <div 
                                className={`transition-all duration-1200 ease-out transform flex flex-col items-center`} 
                                style={{
                                  transitionDelay: `${delay}ms`,
                                  opacity: animateMetric ? 1 : 0,
                                  transform: animateMetric ? 'translateY(0)' : 'translateY(40px)'
                                }}
                              >
                                <div className="mb-1">
                                  <span className={`font-bold ${isLast ? 'text-accent text-lg' : 'text-gray-700 text-sm'}`}>
                                    {data.lumesys}K
                                  </span>
                                </div>
                                <div 
                                  className={`w-8 relative rounded-t-md bg-gradient-to-t ${isLast ? 'from-accent to-highlight' : 'from-accent/60 to-accent/90'} transition-all duration-1500 ease-out filter drop-shadow-md`}
                                  style={{
                                    height: animateMetric ? `${heightPercent}px` : '0px',
                                    transitionDelay: `${delay + 200}ms`,
                                  }}
                                >
                                  {isLast && (
                                    <>
                                      <Star className="absolute -top-3 -right-3 w-6 h-6 text-yellow-400 animate-pulse" />
                                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                                    </>
                                  )}
                                </div>
                                <div 
                                  className={`text-xs font-medium mt-1 ${isLast ? 'text-accent' : 'text-gray-600'}`}
                                >
                                  {data.year}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Enhanced Floating Metrics Icons with staggered animations */}
                      <div className="absolute inset-0">
                        {/* Users Icon - now with growth text */}
                        <div 
                          className={`absolute top-[25%] right-[10%] transition-all duration-1000 delay-1000 transform ${animateMetric ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}
                        >
                          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 cursor-pointer border border-highlight/30 hover:border-highlight/60">
                            <CircleUserRound className="w-5 h-5 text-accent" />
                            <div className="flex flex-col">
                              <span className="font-medium text-sm leading-tight">5000+ users</span>
                              <span className="text-xs text-accent/80">+4900% growth</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Revenue Icon - now with percentage */}
                        <div 
                          className={`absolute top-[15%] left-[15%] transition-all duration-1000 delay-1200 transform ${animateMetric ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}
                        >
                          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 cursor-pointer border border-highlight/30 hover:border-highlight/60">
                            <CircleDollarSign className="w-5 h-5 text-accent" />
                            <div className="flex flex-col">
                              <span className="font-medium text-sm leading-tight">4800K revenue</span>
                              <span className="text-xs text-highlight">48× initial value</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Growth Icon - enhanced presentation */}
                        <div 
                          className={`absolute top-[50%] left-[10%] transition-all duration-1000 delay-1400 transform ${animateMetric ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}
                        >
                          <div className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 cursor-pointer border border-accent/30 hover:border-accent/60">
                            <TrendingUp className="w-5 h-5 text-accent" />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm leading-tight text-accent">+4700% growth</span>
                              <span className="text-xs">Outpacing competitors</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Particles with varied animations */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(15)].map((_, i) => {
                          const size = 2 + Math.random() * 4;
                          const left = Math.random() * 100;
                          const animDelay = Math.random() * 4;
                          const duration = 2 + Math.random() * 4;
                          const opacity = 0.4 + Math.random() * 0.4;
                          
                          return (
                            <div
                              key={i}
                              className="absolute rounded-full bg-highlight animate-float"
                              style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                left: `${left}%`,
                                bottom: '20%',
                                opacity: animateMetric ? opacity : 0,
                                transition: 'opacity 1s ease-out',
                                animationDelay: `${animDelay}s`,
                                animationDuration: `${duration}s`,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 p-6 rounded-lg shadow-inner">
                <div className="flex-1 border-l-4 border-accent pl-3 hover:bg-white transition-all duration-300 p-2 rounded-r-lg">
                  <h4 className="font-medium text-black flex items-center">
                    <span className="text-highlight mr-2 text-lg">48h</span> 
                    Quick Onboarding
                  </h4>
                  <p className="text-sm text-black/70">Users deploy Lumesys in under 48 hours with minimal setup</p>
                </div>
                <div className="flex-1 border-l-4 border-highlight pl-3 hover:bg-white transition-all duration-300 p-2 rounded-r-lg">
                  <h4 className="font-medium text-black flex items-center">
                    <span className="text-accent mr-2 text-lg">30d</span> 
                    Tangible Results
                  </h4>
                  <p className="text-sm text-black/70">First energy savings appear within 30 days of implementation</p>
                </div>
                <div className="flex-1 border-l-4 border-accent pl-3 hover:bg-white transition-all duration-300 p-2 rounded-r-lg">
                  <h4 className="font-medium text-black flex items-center">
                    <span className="text-highlight mr-2 text-lg">85%</span> 
                    Referral Growth
                  </h4>
                  <p className="text-sm text-black/70">85% of new customers come from existing client referrals</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-16 glass-card rounded-xl p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-glow-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-light mb-2 text-black">
                Discover how <span className="gradient-text font-normal">AI-driven optimization</span> is transforming high-energy industries
              </h3>
              <p className="text-black/70">
                Learn about the projected benefits of implementing our solution in manufacturing facilities.
              </p>
            </div>
            
            <Button variant="outline" className="whitespace-nowrap border-accent/20 hover:border-accent hover:bg-accent/5">
              View Projection Model
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLumesys;
