
import React from 'react';
import { Card } from '@/components/ui/card';
import DashboardCarousel from './dashboard/DashboardCarousel';
import FeatureIndicators from './dashboard/FeatureIndicators';
import { ChevronRight, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DashboardPreview: React.FC = () => {
  // Dashboard slide data
  const dashboardImages = [
    {
      src: "/lovable-uploads/51807d5e-b88f-41ff-a045-66b3a4af445f.png",
      alt: "Lumesys Dashboard - Energy Sources Performance",
      caption: "Energy Sources Performance Analysis"
    },
    {
      isInteractive: true,
      caption: "Interactive Building Management System"
    }
  ];

  // Building data for interactive dashboard with enhanced HVAC and carbon emissions data
  const buildingData = {
    "Building A": {
      hvac: { 
        status: "Running", 
        efficiency: 87, 
        temperature: 72.4,
        carbonImpact: "Low",
        maintenanceStatus: "Optimal",
        energyConsumption: 128.5
      },
      lighting: { 
        status: "Optimal", 
        efficiency: 92, 
        savings: "18%",
        carbonReduction: "14%" 
      },
      occupancy: { 
        current: 87, 
        capacity: 120, 
        peakHours: "9AM-2PM",
        energyImpact: "Medium"
      },
      energy: { 
        current: 128.5, 
        target: 140, 
        savings: "8.2%",
        co2Reduction: "7.5 tons" 
      },
      carbon: {
        current: 42.8,
        target: 50,
        reduction: "14.4%",
        trend: "Decreasing"
      }
    },
    "Building B": {
      hvac: { 
        status: "Maintenance", 
        efficiency: 64, 
        temperature: 75.8,
        carbonImpact: "High",
        maintenanceStatus: "Needs Service",
        energyConsumption: 156.2
      },
      lighting: { 
        status: "Reduced", 
        efficiency: 88, 
        savings: "12%",
        carbonReduction: "9%" 
      },
      occupancy: { 
        current: 42, 
        capacity: 80, 
        peakHours: "10AM-12PM",
        energyImpact: "Low"
      },
      energy: { 
        current: 78.2, 
        target: 95, 
        savings: "17.7%",
        co2Reduction: "5.2 tons"
      },
      carbon: {
        current: 28.5,
        target: 30,
        reduction: "5.0%",
        trend: "Stable"
      }
    },
    "Building C": {
      hvac: { 
        status: "Eco Mode", 
        efficiency: 94, 
        temperature: 73.1,
        carbonImpact: "Minimal",
        maintenanceStatus: "Recently Serviced",
        energyConsumption: 102.3
      },
      lighting: { 
        status: "Optimal", 
        efficiency: 96, 
        savings: "24%",
        carbonReduction: "21%" 
      },
      occupancy: { 
        current: 114, 
        capacity: 150, 
        peakHours: "11AM-4PM",
        energyImpact: "High"
      },
      energy: { 
        current: 156.3, 
        target: 165, 
        savings: "5.3%",
        co2Reduction: "9.8 tons"
      },
      carbon: {
        current: 52.1,
        target: 60,
        reduction: "13.2%",
        trend: "Decreasing"
      }
    }
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
          
          <div className="flex items-center justify-center mt-4 mb-8 text-sm">
            <div className="flex items-center bg-accent/5 rounded-full px-4 py-1.5">
              <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-accent mr-2"></span>
              <span>Browse through the slides to see different dashboard views</span>
              <ChevronRight className="w-4 h-4 ml-1 text-accent" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-highlight/20">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute top-4 right-4 z-20 bg-black/20 backdrop-blur-sm p-1.5 rounded-full cursor-help">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-black/90 text-white border-highlight/30 max-w-xs">
                  <p className="text-sm">
                    The second slide features an interactive dashboard where you can select different buildings to view their real-time metrics.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DashboardCarousel slides={dashboardImages} buildingData={buildingData} />
          </div>
          
          <FeatureIndicators />
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
