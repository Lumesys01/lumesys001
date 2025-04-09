import React, { useState, useEffect } from 'react';
import { Check, X, Zap, Users, Award, Shield, LineChart, BatteryCharging, Lightbulb, Rocket, TrendingUp, Star, CircleDollarSign, CircleUserRound, ArrowRight } from 'lucide-react';
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
    const targetValue = 10;
    const duration = 2000;
    const step = 10;
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

  const comparisonData = [
    {
      feature: "Energy Analysis",
      lumesys: "AI-powered, Real-time",
      traditional: "Manual, Periodic",
      benefit: "Faster insights to reduce waste",
      icon: <LineChart className="w-5 h-5 text-accent" />,
      lumesysRating: 85,
      traditionalRating: 55,
    },
    {
      feature: "Anomaly Detection",
      lumesys: "Early Detection, Automated",
      traditional: "Reactive, Manual",
      benefit: "Identify issues earlier",
      icon: <Shield className="w-5 h-5 text-accent" />,
      lumesysRating: 80,
      traditionalRating: 45,
    },
    {
      feature: "Optimization",
      lumesys: "Continuous, Adaptive",
      traditional: "Static, Scheduled",
      benefit: "More consistent optimization",
      icon: <BatteryCharging className="w-5 h-5 text-accent" />,
      lumesysRating: 88,
      traditionalRating: 60,
    },
    {
      feature: "Maintenance",
      lumesys: "Proactive, Preventive",
      traditional: "Reactive, Repairs",
      benefit: "Reduced maintenance costs",
      icon: <Award className="w-5 h-5 text-accent" />,
      lumesysRating: 82,
      traditionalRating: 58,
    },
    {
      feature: "Data Insights",
      lumesys: "Machine Learning",
      traditional: "Historical Data",
      benefit: "Identify new saving opportunities",
      icon: <Lightbulb className="w-5 h-5 text-accent" />,
      lumesysRating: 86,
      traditionalRating: 50,
    }
  ];

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
    <section className="section-padding relative bg-white dark:bg-background-dark">
      <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-accent/5 dark:bg-accent/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-neonpurple/5 dark:bg-neonpurple/10 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light mb-4 text-black dark:text-white">
            Why <span className="gradient-text font-normal">Lumesys</span>?
          </h2>
          <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            See how our AI-driven approach delivers better results compared to traditional energy management systems.
          </p>
          
          <div className="flex justify-center gap-4 mt-8 mb-8 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg text-accent border-b-2 border-accent px-4 py-2">
              Feature Comparison
            </h3>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/30 text-sm text-black/70 dark:text-white/70 p-3 rounded-lg mb-6 max-w-2xl mx-auto border border-gray-100 dark:border-gray-700">
            <p className="italic">
              <strong>Disclaimer:</strong> This comparison is based on predictions from our AI models using industry data and benchmarks. Actual results may vary as more real-world data is collected.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass-card rounded-xl p-8 md:p-10 text-center bg-white dark:bg-gray-800/40 dark:text-white border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-medium mb-2 text-black dark:text-white">Average Energy Savings</h3>
            <div className="relative mb-6">
              <div className="text-7xl md:text-8xl font-light gradient-text transition-all duration-300">
                {savingsPercent.toFixed(1)}
                <span className="text-4xl md:text-5xl">%</span>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-highlight/20 rounded-full blur-[30px]"></div>
            </div>
            <div className="w-full mb-4">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-highlight transition-all duration-1000 ease-out"
                  style={{ width: `${(savingsPercent / 10) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-black/70 dark:text-white/70">
              Average savings based on data from similar AI-driven energy management deployments.
            </p>
          </div>
          
          <Card className="shadow-lg border-highlight/20 overflow-hidden transition-all relative dark:bg-gray-800/40 dark:text-white dark:border-gray-700">
            <div className="absolute top-4 right-4 z-10">
              <div className="relative">
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-accent block"></span>
              </div>
              <span className="text-xs text-accent mt-1 block">Tap to explore</span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 py-3 px-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-medium text-lg text-black dark:text-white">Feature Comparison</h3>
              <p className="text-sm text-black/60 dark:text-white/60">How Lumesys compares to traditional systems</p>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {comparisonData.map((item, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer group transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50
                    ${activeFeature === item.feature ? 'bg-accent/5 dark:bg-accent/10' : ''}`}
                  onClick={() => setActiveFeature(activeFeature === item.feature ? null : item.feature)}
                >
                  <div className="p-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <div className="flex items-center justify-between mb-2 relative z-10">
                      <div className="flex items-center gap-2">
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
                      <div className="bg-accent/5 dark:bg-accent/10 p-2 rounded-md">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Check className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium">Lumesys</span>
                        </div>
                        <p className="text-xs mb-2">{item.lumesys}</p>
                        {renderRatingDots(item.lumesysRating)}
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded-md">
                        <div className="flex items-center gap-1.5 mb-1">
                          <X className="w-4 h-4 text-black/40 dark:text-white/40" />
                          <span className="text-sm font-medium text-black/70 dark:text-white/70">Traditional</span>
                        </div>
                        <p className="text-xs mb-2">{item.traditional}</p>
                        {renderRatingDots(item.traditionalRating)}
                      </div>
                    </div>
                  </div>

                  {activeFeature === item.feature && (
                    <div className="bg-accent/10 dark:bg-accent/20 p-4 border-t border-accent/20 dark:border-accent/30 animate-fade-in">
                      <div className="flex items-start gap-3">
                        <div className="bg-accent/20 dark:bg-accent/30 p-1.5 rounded-full mt-0.5">
                          <Zap className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-accent mb-1">Lumesys Advantage:</p>
                          <p className="text-sm">{item.benefit}</p>
                          
                          <div className="mt-3 bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 border border-accent/20 dark:border-accent/30">
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
                              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                                <div 
                                  style={{ width: `${item.lumesysRating}%` }} 
                                  className="animate-slide-in shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-accent"
                                />
                              </div>
                            </div>
                            <div className="relative pt-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                                  Traditional
                                </span>
                                <span className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                                  {item.traditionalRating}%
                                </span>
                              </div>
                              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                                <div 
                                  style={{ width: `${item.traditionalRating}%` }} 
                                  className="animate-slide-in shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-gray-400 dark:bg-gray-500"
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
      </div>

      <div className="mb-12 bg-gradient-to-r from-accent/5 to-highlight/5 p-6 rounded-xl border border-accent/20">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div>
            <h3 className="text-2xl font-medium mb-2 text-center md:text-left">Our Competitive Edge</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">48-Hour Deployment</p>
                  <p className="text-sm text-gray-600">vs. industry standard 4-6 weeks</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <LineChart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">>10% Savings Guarantee</p>
                  <p className="text-sm text-gray-600">vs. industry average</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <Rocket className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">24/7 Support</p>
                  <p className="text-sm text-gray-600">vs. limited hours</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Real-time Analytics</p>
                  <p className="text-sm text-gray-600">vs. historical data</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Customer Support</p>
                  <p className="text-sm text-gray-600">vs. limited options</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLumesys;
