import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const WhyLumesys: React.FC = () => {
  const [savingsPercent, setSavingsPercent] = useState(0);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
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
            Our AI-driven approach delivers superior results compared to traditional energy management systems.
          </p>
        </div>
        
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
