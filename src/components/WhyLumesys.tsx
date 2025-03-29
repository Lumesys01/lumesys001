
import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from './ui/button';

const WhyLumesys: React.FC = () => {
  const [savingsPercent, setSavingsPercent] = useState(0);
  
  useEffect(() => {
    // Animate counter from 0 to 23 over 2 seconds
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
      lumesys: "Real-time, AI-powered",
      traditional: "Periodic manual reviews"
    },
    {
      feature: "Anomaly Detection",
      lumesys: "Automatic, predictive",
      traditional: "Manual identification"
    },
    {
      feature: "Optimization",
      lumesys: "Continuous, adaptive",
      traditional: "Static, scheduled"
    },
    {
      feature: "Maintenance",
      lumesys: "Predictive, proactive",
      traditional: "Reactive, scheduled"
    },
    {
      feature: "Data Insights",
      lumesys: "Deep learning patterns",
      traditional: "Basic historical data"
    }
  ];

  return (
    <section className="section-padding relative bg-white">
      {/* Background gradient accents */}
      <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-neonpurple/5 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-4 text-black">
            Why <span className="gradient-text font-normal">Lumesys</span>?
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Our AI-driven approach delivers superior results compared to traditional energy management systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Energy savings counter */}
          <div className="glass-card rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-xl font-medium mb-2 text-black">Average Energy Savings</h3>
            <div className="relative mb-6">
              <div className="text-7xl md:text-9xl font-light gradient-text">
                {savingsPercent}
                <span className="text-4xl md:text-6xl">%</span>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-highlight/20 rounded-full blur-[30px]"></div>
            </div>
            <p className="text-black/70">
              Real-time savings across our client facilities, constantly optimized by our AI engine.
            </p>
          </div>
          
          {/* Comparison table */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 text-center p-4 bg-white">
              <div className="font-medium text-black">Feature</div>
              <div className="font-medium text-highlight">Lumesys</div>
              <div className="font-medium text-black/70">Traditional</div>
            </div>
            
            {comparisonData.map((item, index) => (
              <div key={index} className="grid grid-cols-3 text-center p-4 border-t border-border">
                <div className="text-black">{item.feature}</div>
                <div className="flex items-center justify-center">
                  <Check className="w-5 h-5 text-highlight mr-1" />
                  <span className="text-sm text-black">{item.lumesys}</span>
                </div>
                <div className="flex items-center justify-center text-black/70">
                  <X className="w-5 h-5 text-black/40 mr-1" />
                  <span className="text-sm">{item.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Case study teaser */}
        <div className="mt-16 glass-card rounded-xl p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-glow-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-light mb-2 text-black">
                Discover how <span className="gradient-text font-normal">AI-driven optimization</span> is transforming high-energy industries
              </h3>
              <p className="text-black/70">
                Read our latest case study on how a manufacturing facility reduced energy costs by 31%.
              </p>
            </div>
            
            <Button className="glow-border bg-surface backdrop-blur-sm px-6 py-5 rounded-full text-black group">
              <span>View Case Study</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLumesys;
