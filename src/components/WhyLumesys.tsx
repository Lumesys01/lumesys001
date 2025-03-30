
import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Zap, BarChart, LineChart, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const WhyLumesys: React.FC = () => {
  const [savingsPercent, setSavingsPercent] = useState(0);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('features');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSavingsPercent(prev => {
        if (prev < 23) return prev + 1;
        clearInterval(interval);
        return 23;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const comparisonData = [
    {
      feature: "Energy Analysis",
      lumesys: "AI-powered, Real-time",
      traditional: "Manual, Periodic",
      benefit: "Immediate insights to prevent waste",
      icon: <Zap className="w-5 h-5" />
    },
    {
      feature: "Anomaly Detection",
      lumesys: "Predictive, Automated",
      traditional: "Reactive, Manual",
      benefit: "Prevent issues before they occur",
      icon: <Zap className="w-5 h-5" />
    },
    {
      feature: "Optimization",
      lumesys: "Continuous, Adaptive",
      traditional: "Static, Scheduled",
      benefit: "24/7 optimization for maximum savings",
      icon: <Zap className="w-5 h-5" />
    },
    {
      feature: "Maintenance",
      lumesys: "Proactive, Preventive",
      traditional: "Reactive, Repairs",
      benefit: "Reduce downtime and extend equipment life",
      icon: <Zap className="w-5 h-5" />
    },
    {
      feature: "Data Insights",
      lumesys: "Deep Learning Patterns",
      traditional: "Basic Historical Data",
      benefit: "Discover hidden opportunities for savings",
      icon: <Zap className="w-5 h-5" />
    }
  ];

  const marketGrowthData = [
    { year: '2024', lumesys: 100, marketAverage: 50, users: 100 },
    { year: '2025', lumesys: 800, marketAverage: 200, users: 500 },
    { year: '2026', lumesys: 2000, marketAverage: 600, users: 1500 },
    { year: '2027', lumesys: 3200, marketAverage: 1200, users: 3000 },
    { year: '2028', lumesys: 4800, marketAverage: 2000, users: 5000 }
  ];

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
                <div className="text-7xl md:text-8xl font-light gradient-text">
                  {savingsPercent}
                  <span className="text-4xl md:text-5xl">%</span>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-highlight/20 rounded-full blur-[30px]"></div>
              </div>
              <p className="text-black/70">
                Potential savings based on industry benchmarks for similar AI-driven energy management solutions.
              </p>
            </div>
            
            <Card className="shadow-lg border-highlight/20 overflow-hidden">
              <div className="bg-gray-50 py-3 px-4 border-b border-gray-100">
                <h3 className="font-medium text-lg text-black">Feature Comparison</h3>
                <p className="text-sm text-black/60">See how Lumesys outperforms traditional systems</p>
              </div>
              
              <div className="p-0">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-1/3 py-2">Feature</TableHead>
                      <TableHead className="w-1/3 py-2 text-highlight font-medium">Lumesys</TableHead>
                      <TableHead className="w-1/3 py-2 text-black/70">Traditional</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((item, index) => (
                      <TableRow 
                        key={index} 
                        className={`cursor-pointer transition-colors ${activeFeature === item.feature ? 'bg-accent/5' : 'hover:bg-gray-50'}`}
                        onClick={() => setActiveFeature(activeFeature === item.feature ? null : item.feature)}
                      >
                        <TableCell className="py-2.5 font-medium">
                          <div className="flex items-center gap-1.5">
                            {item.icon}
                            {item.feature}
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-accent" />
                            <span className="text-sm">{item.lumesys}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex items-center gap-1.5">
                            <X className="w-4 h-4 text-black/40" />
                            <span className="text-sm text-black/70">{item.traditional}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {activeFeature && (
                <div className="bg-accent/10 border-t border-accent/20 p-3 text-sm transition-all animate-fade-in">
                  <div className="flex items-start gap-2">
                    <div className="bg-accent/20 p-1.5 rounded-full">
                      <Zap className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-accent">Lumesys Advantage:</p>
                      <p>{comparisonData.find(item => item.feature === activeFeature)?.benefit}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
        
        {activeTab === 'growth' && (
          <div className="glass-card rounded-xl p-8 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="font-medium text-xl mb-4">Market Growth & Adoption</h3>
                <p className="text-black/70 mb-6">
                  Lumesys is projected to grow at a significantly faster rate than the market average 
                  for energy management systems over the next five years.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-accent"></div>
                      <span className="font-medium">Lumesys Growth</span>
                    </div>
                    <span className="font-bold text-accent">+4700%</span>
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
                  <div className="flex items-center justify-between bg-accent/5 p-3 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-accent/10">
                        <Users className="w-4 h-4 text-accent" />
                      </div>
                      <span className="font-medium">User Growth</span>
                    </div>
                    <span className="font-bold text-accent">100 → 5000 users</span>
                  </div>
                </div>

                <p className="text-sm text-black/60 mt-6">
                  Early adopters are experiencing immediate benefits, with our user base expanding 
                  rapidly as word spreads about our energy optimization capabilities.
                </p>
              </div>
              
              <div className="h-80">
                <ChartContainer 
                  config={{
                    lumesys: { theme: { light: "#00bf72", dark: "#00bf72" } },
                    marketAverage: { theme: { light: "#dddddd", dark: "#dddddd" } },
                    users: { theme: { light: "#9b87f5", dark: "#9b87f5" } }
                  }}
                >
                  <AreaChart
                    data={marketGrowthData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Growth Metrics', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="lumesys" 
                      name="Revenue ($K)" 
                      stackId="1" 
                      stroke="#00bf72" 
                      fill="url(#colorLumesys)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="marketAverage" 
                      name="Market Avg ($K)" 
                      stackId="2" 
                      stroke="#bbbbbb" 
                      fill="url(#colorMarket)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      name="Users" 
                      stackId="3" 
                      stroke="#9b87f5" 
                      fill="url(#colorUsers)" 
                    />
                    <defs>
                      <linearGradient id="colorLumesys" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00bf72" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00bf72" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dddddd" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#dddddd" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ChartContainer>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex-1 border-l-4 border-accent pl-3">
                  <h4 className="font-medium">Quick Onboarding</h4>
                  <p className="text-sm text-black/60">Users can deploy Lumesys in under 48 hours with minimal setup</p>
                </div>
                <div className="flex-1 border-l-4 border-accent pl-3">
                  <h4 className="font-medium">Immediate Results</h4>
                  <p className="text-sm text-black/60">First energy savings appear within 2 weeks of implementation</p>
                </div>
                <div className="flex-1 border-l-4 border-accent pl-3">
                  <h4 className="font-medium">Referral Growth</h4>
                  <p className="text-sm text-black/60">85% of new customers come from existing client referrals</p>
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
            
            <Button className="whitespace-nowrap">
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
