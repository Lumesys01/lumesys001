import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  ArrowRight,
  PieChart,
  Building2,
  Thermometer,
  Fan,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const DashboardPreview: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeBuilding, setActiveBuilding] = useState("Building A");
  
  const dashboardImages = [
    {
      src: "/lovable-uploads/51807d5e-b88f-41ff-a045-66b3a4af445f.png",
      alt: "Lumesys Dashboard - Energy Sources Performance",
      caption: "Energy Sources Performance Analysis"
    },
    {
      isInteractive: true,
      caption: "Real-time Building Management System"
    },
    {
      src: "/lovable-uploads/9f0aac31-e231-48e8-925e-2ad8c7249407.png",
      alt: "Lumesys Dashboard - Management Overview",
      caption: "Energy Management Overview",
    }
  ];

  // Building data for interactive dashboard
  const buildingData = {
    "Building A": {
      hvac: { status: "Running", efficiency: 87, temperature: 72.4 },
      lighting: { status: "Optimal", efficiency: 92, savings: "18%" },
      occupancy: { current: 87, capacity: 120, peakHours: "9AM-2PM" },
      energy: { current: 128.5, target: 140, savings: "8.2%" }
    },
    "Building B": {
      hvac: { status: "Maintenance", efficiency: 64, temperature: 75.8 },
      lighting: { status: "Reduced", efficiency: 88, savings: "12%" },
      occupancy: { current: 42, capacity: 80, peakHours: "10AM-12PM" },
      energy: { current: 78.2, target: 95, savings: "17.7%" }
    },
    "Building C": {
      hvac: { status: "Eco Mode", efficiency: 94, temperature: 73.1 },
      lighting: { status: "Optimal", efficiency: 96, savings: "24%" },
      occupancy: { current: 114, capacity: 150, peakHours: "11AM-4PM" },
      energy: { current: 156.3, target: 165, savings: "5.3%" }
    }
  };

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
              {dashboardImages.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${activeSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  {slide.isInteractive ? (
                    // Interactive Building Management Dashboard
                    <div className="w-full h-full bg-black/90 text-white p-5 overflow-y-auto">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Building Management System</h3>
                        <div className="text-sm text-white/70">Live Data • Last updated: Just now</div>
                      </div>
                      
                      {/* Building selector */}
                      <div className="flex space-x-2 mb-6">
                        {Object.keys(buildingData).map((building) => (
                          <button
                            key={building}
                            onClick={() => setActiveBuilding(building)}
                            className={`px-4 py-2 rounded-md transition-all ${
                              activeBuilding === building
                                ? "bg-highlight text-white"
                                : "bg-white/10 hover:bg-white/20 text-white/80"
                            }`}
                          >
                            {building}
                          </button>
                        ))}
                      </div>
                      
                      {/* Building stats dashboard */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* HVAC Status */}
                        <Card className="bg-black/50 border-white/20 backdrop-blur-sm overflow-hidden relative">
                          <CardHeader className="pb-2">
                            <div className="flex items-center text-sm font-medium text-white">
                              <Thermometer className="w-4 h-4 mr-2 text-highlight" />
                              HVAC Systems
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-semibold">
                              {buildingData[activeBuilding as keyof typeof buildingData].hvac.temperature}°F
                            </div>
                            <div className="flex justify-between mt-2">
                              <div className={`text-xs px-2 py-1 rounded ${
                                buildingData[activeBuilding as keyof typeof buildingData].hvac.status === "Running" 
                                  ? "bg-green-500/20 text-green-400"
                                  : buildingData[activeBuilding as keyof typeof buildingData].hvac.status === "Maintenance"
                                  ? "bg-amber-500/20 text-amber-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}>
                                {buildingData[activeBuilding as keyof typeof buildingData].hvac.status}
                              </div>
                              <div className="text-xs text-white/70">
                                {buildingData[activeBuilding as keyof typeof buildingData].hvac.efficiency}% efficient
                              </div>
                            </div>
                            <div className="absolute top-1 right-1">
                              <Fan className="w-4 h-4 text-white/30" />
                            </div>
                          </CardContent>
                        </Card>

                        {/* Lighting */}
                        <Card className="bg-black/50 border-white/20 backdrop-blur-sm">
                          <CardHeader className="pb-2">
                            <div className="flex items-center text-sm font-medium text-white">
                              <PieChart className="w-4 h-4 mr-2 text-highlight" />
                              Lighting
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-end gap-1">
                              <span className="text-3xl font-semibold">
                                {buildingData[activeBuilding as keyof typeof buildingData].lighting.efficiency}%
                              </span>
                              <span className="text-green-400 text-sm mb-1">
                                ({buildingData[activeBuilding as keyof typeof buildingData].lighting.savings} saved)
                              </span>
                            </div>
                            <div className="flex justify-between mt-2">
                              <div className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                                {buildingData[activeBuilding as keyof typeof buildingData].lighting.status}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Occupancy */}
                        <Card className="bg-black/50 border-white/20 backdrop-blur-sm">
                          <CardHeader className="pb-2">
                            <div className="flex items-center text-sm font-medium text-white">
                              <Building2 className="w-4 h-4 mr-2 text-highlight" />
                              Occupancy
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-semibold">
                              {buildingData[activeBuilding as keyof typeof buildingData].occupancy.current} <span className="text-white/50 text-base">/ {buildingData[activeBuilding as keyof typeof buildingData].occupancy.capacity}</span>
                            </div>
                            <div className="mt-2 text-xs text-white/70">
                              Peak hours: {buildingData[activeBuilding as keyof typeof buildingData].occupancy.peakHours}
                            </div>
                            {/* Occupancy bar */}
                            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
                              <div 
                                className="h-full bg-highlight rounded-full"
                                style={{ width: `${(buildingData[activeBuilding as keyof typeof buildingData].occupancy.current / buildingData[activeBuilding as keyof typeof buildingData].occupancy.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Energy Usage */}
                        <Card className="bg-black/50 border-white/20 backdrop-blur-sm">
                          <CardHeader className="pb-2">
                            <div className="flex items-center text-sm font-medium text-white">
                              <PieChart className="w-4 h-4 mr-2 text-highlight" />
                              Energy Usage
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-semibold">
                              {buildingData[activeBuilding as keyof typeof buildingData].energy.current} <span className="text-sm text-white/50">kWh</span>
                            </div>
                            <div className="flex justify-between mt-2">
                              <div className="text-xs text-green-400">
                                {buildingData[activeBuilding as keyof typeof buildingData].energy.savings} below target
                              </div>
                              <div className="text-xs text-white/70">
                                Target: {buildingData[activeBuilding as keyof typeof buildingData].energy.target} kWh
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="text-center mt-6 text-white/60 text-sm">
                        Real-time monitoring helps identify optimization opportunities and reduce energy waste.
                      </div>
                    </div>
                  ) : (
                    // Static dashboard images
                    <>
                      <img 
                        src={slide.src} 
                        alt={slide.alt} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-sm md:text-base">{slide.caption}</p>
                      </div>
                    </>
                  )}
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
