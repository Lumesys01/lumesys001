
import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Zap, BarChart, LineChart } from 'lucide-react';
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
      icon: <Zap className="w-4 h-4" />
    },
    {
      feature: "Anomaly Detection",
      lumesys: "Predictive, Automated",
      traditional: "Reactive, Manual",
      benefit: "Prevent issues before they occur",
      icon: <Zap className="w-4 h-4" />
    },
    {
      feature: "Optimization",
      lumesys: "Continuous, Adaptive",
      traditional: "Static, Scheduled",
      benefit: "24/7 optimization for maximum savings",
      icon: <Zap className="w-4 h-4" />
    },
    {
      feature: "Maintenance",
      lumesys: "Proactive, Preventive",
      traditional: "Reactive, Repairs",
      benefit: "Reduce downtime and extend equipment life",
      icon: <Zap className="w-4 h-4" />
    },
    {
      feature: "Data Insights",
      lumesys: "Deep Learning Patterns",
      traditional: "Basic Historical Data",
      benefit: "Discover hidden opportunities for savings",
      icon: <Zap className="w-4 h-4" />
    }
  ];

  // Market growth projection data
  const marketGrowthData = [
    { year: '2024', lumesys: 10, marketAverage: 5 },
    { year: '2025', lumesys: 28, marketAverage: 12 },
    { year: '2026', lumesys: 45, marketAverage: 18 },
    { year: '2027', lumesys: 72, marketAverage: 25 },
    { year: '2028', lumesys: 95, marketAverage: 32 }
  ];

  // ROI comparison data
  const roiData = [
    { month: 3, lumesys: 5, traditional: 0 },
    { month: 6, lumesys: 15, traditional: 2 },
    { month: 9, lumesys: 28, traditional: 7 },
    { month: 12, lumesys: 42, traditional: 15 },
    { month: 15, lumesys: 58, traditional: 25 },
    { month: 18, lumesys: 75, traditional: 35 }
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
          
          {/* Tab navigation */}
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
              className={`px-4 py-2 text-lg transition-colors ${activeTab === 'growth' 
                ? 'text-accent border-b-2 border-accent' 
                : 'text-black/60 hover:text-black/80'}`}
            >
              Market Growth
            </button>
            <button 
              onClick={() => setActiveTab('roi')}
              className={`px-4 py-2 text-lg transition-colors ${activeTab === 'roi' 
                ? 'text-accent border-b-2 border-accent' 
                : 'text-black/60 hover:text-black/80'}`}
            >
              ROI Timeframe
            </button>
          </div>
        </div>
        
        {/* Features comparison tab */}
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
              <div className="mt-6">
                <Button className="glow-border bg-surface backdrop-blur-sm px-6 py-5 rounded-full text-black group">
                  <span>Learn About Our Approach</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
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
        
        {/* Market growth tab */}
        {activeTab === 'growth' && (
          <div className="glass-card rounded-xl p-8 shadow-lg overflow-hidden">
            <h3 className="font-medium text-xl mb-4">Projected Market Share Growth</h3>
            <p className="text-black/70 mb-6">
              Lumesys is projected to grow at a significantly faster rate than the market average 
              for energy management systems over the next five years.
            </p>
            
            <div className="h-80 w-full">
              <ChartContainer 
                config={{
                  lumesys: { theme: { light: "#00bf72" } },
                  marketAverage: { theme: { light: "#dddddd" } }
                }}
              >
                <AreaChart
                  data={marketGrowthData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: '% Market Share', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="lumesys" 
                    name="Lumesys" 
                    stackId="1" 
                    stroke="#00bf72" 
                    fill="url(#colorLumesys)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="marketAverage" 
                    name="Market Average" 
                    stackId="2" 
                    stroke="#bbbbbb" 
                    fill="url(#colorMarket)" 
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
                  </defs>
                </AreaChart>
              </ChartContainer>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-accent"></div>
                  <span className="font-medium">Lumesys Growth Rate</span>
                </div>
                <span className="font-bold text-accent">+85% over 5 years</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                  <span className="font-medium">Market Average Growth Rate</span>
                </div>
                <span className="font-bold text-gray-600">+27% over 5 years</span>
              </div>
            </div>
          </div>
        )}
        
        {/* ROI comparison tab */}
        {activeTab === 'roi' && (
          <div className="glass-card rounded-xl p-8 shadow-lg overflow-hidden">
            <h3 className="font-medium text-xl mb-4">ROI Comparison Over Time</h3>
            <p className="text-black/70 mb-6">
              Lumesys delivers faster returns on investment compared to traditional energy management systems.
            </p>
            
            <div className="h-80 w-full">
              <ChartContainer 
                config={{
                  lumesys: { theme: { light: "#00bf72" } },
                  traditional: { theme: { light: "#bbbbbb" } }
                }}
              >
                <AreaChart
                  data={roiData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    label={{ value: 'Months After Implementation', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="lumesys" 
                    name="Lumesys" 
                    stroke="#00bf72" 
                    fill="url(#colorLumesysROI)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="traditional" 
                    name="Traditional Systems" 
                    stroke="#bbbbbb" 
                    fill="url(#colorTraditionalROI)" 
                  />
                  <defs>
                    <linearGradient id="colorLumesysROI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00bf72" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00bf72" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorTraditionalROI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#bbbbbb" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#bbbbbb" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ChartContainer>
            </div>
            
            <div className="mt-6 p-4 bg-accent/10 rounded-lg">
              <h4 className="font-medium text-lg mb-2">Key Takeaway</h4>
              <p>Lumesys clients typically see positive ROI within the first 6 months of implementation, compared to 12+ months for traditional systems.</p>
              <div className="mt-4 flex justify-end">
                <Button className="bg-accent text-white hover:bg-accent/90">
                  Calculate Your Potential ROI
                </Button>
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
            
            <Button className="glow-border bg-surface backdrop-blur-sm px-6 py-5 rounded-full text-black group">
              <span>View Projection Model</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLumesys;
