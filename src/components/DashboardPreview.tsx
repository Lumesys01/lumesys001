import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PieChart, BarChart3, LineChart, Shield, AlertCircle } from 'lucide-react';

const DashboardPreview: React.FC = () => {
  return (
    <div className="relative py-16 md:py-24 bg-white">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[150px] z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-highlight/5 rounded-full blur-[150px] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light mb-4 text-black">
            Our <span className="gradient-text font-normal">Dashboard</span> in Action
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Get a glimpse into our powerful energy management platform and discover how it can transform your operations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Dashboard preview */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            {/* Dashboard images in a carousel-like display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First dashboard image */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/51807d5e-b88f-41ff-a045-66b3a4af445f.png" 
                  alt="Lumesys Dashboard - Energy Sources Performance" 
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              </div>
              
              {/* Second dashboard image */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/9eaa2efd-f9fc-4c99-bb4e-2f4151ed5d84.png" 
                  alt="Lumesys Dashboard - System Stable" 
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              </div>
            </div>
            
            {/* Dashboard overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center">
              <div className="text-center p-6 max-w-lg bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="text-white text-xl md:text-2xl font-medium mb-3">
                  Unlock Your Energy Potential
                </h3>
                <p className="text-white/80 mb-4 text-sm md:text-base">
                  See real-time insights that drive efficiency, reduce costs, and accelerate your sustainability goals.
                </p>
                <Button 
                  className="glow-button text-primary font-medium px-6 py-3 rounded-full text-base hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,191,114,0.4)]"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get Personalized Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-black/60">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 inline-block rounded-full bg-accent"></span>
              Real-time Monitoring
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 inline-block rounded-full bg-highlight"></span>
              Energy Analytics 
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 inline-block rounded-full bg-secondary"></span>
              Cost Optimization
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
