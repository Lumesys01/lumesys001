
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PieChart, BarChart3, LineChart, Shield, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const DashboardPreview: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const dashboardImages = [
    {
      src: "/lovable-uploads/51807d5e-b88f-41ff-a045-66b3a4af445f.png",
      alt: "Lumesys Dashboard - Energy Sources Performance",
      caption: "Energy Sources Performance Analysis"
    },
    {
      src: "/lovable-uploads/9eaa2efd-f9fc-4c99-bb4e-2f4151ed5d84.png",
      alt: "Lumesys Dashboard - System Stable",
      caption: "Real-time System Status Monitor"
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % dashboardImages.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + dashboardImages.length) % dashboardImages.length);
  };

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
          {/* Enhanced Dashboard preview with interactive carousel */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-highlight/20">
            {/* Dashboard carousel */}
            <div className="relative aspect-[16/9] bg-black">
              {dashboardImages.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${activeSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm md:text-base">{image.caption}</p>
                  </div>
                </div>
              ))}
              
              {/* Carousel controls */}
              <button 
                onClick={prevSlide} 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button 
                onClick={nextSlide} 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
            
            {/* Dashboard overlay with highlighted features */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center pointer-events-none">
              <div className="text-center p-6 max-w-lg bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="text-white text-xl md:text-2xl font-medium mb-3">
                  Unlock Your Energy Potential
                </h3>
                <p className="text-white/80 mb-4 text-sm md:text-base">
                  See real-time insights that drive efficiency, reduce costs, and accelerate your sustainability goals.
                </p>
                <Button 
                  className="glow-button text-primary font-medium px-6 py-3 rounded-full text-base hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,191,114,0.4)] pointer-events-auto"
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
          
          {/* Enhanced features indicators */}
          <div className="mt-8 grid grid-cols-3 md:flex md:justify-center gap-3 md:gap-6 text-sm text-black/80">
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-accent/5 transition-all">
              <span className="w-3 h-3 inline-block rounded-full bg-accent mb-2"></span>
              <span className="font-medium">Real-time Monitoring</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-highlight/5 transition-all">
              <span className="w-3 h-3 inline-block rounded-full bg-highlight mb-2"></span>
              <span className="font-medium">Energy Analytics</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-secondary/5 transition-all">
              <span className="w-3 h-3 inline-block rounded-full bg-secondary mb-2"></span>
              <span className="font-medium">Cost Optimization</span>
            </div>
          </div>
          
          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {dashboardImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSlide === index ? 'bg-highlight w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
