
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
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200">
            {/* Mock dashboard interface */}
            <div className="p-6 md:p-8">
              {/* Dashboard header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-black">Energy Management Dashboard</h3>
                  <p className="text-black/60">Real-time insights and optimization recommendations</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <div className="text-xs md:text-sm text-black/70">Current Savings:</div>
                  <div className="text-lg md:text-xl font-semibold text-green-600">$24,586</div>
                </div>
              </div>
              
              {/* Dashboard grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main charts section */}
                <div className="md:col-span-2 space-y-6">
                  {/* Energy usage chart */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <LineChart className="w-5 h-5 text-accent" />
                        Energy Consumption Trends
                      </h4>
                      <div className="text-xs text-black/50">Last 30 days</div>
                    </div>
                    <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center relative overflow-hidden">
                      {/* Mock chart lines */}
                      <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                        <div className="w-full h-full flex items-end justify-around">
                          {[65, 40, 70, 30, 55, 25, 45, 75, 35, 60].map((height, i) => (
                            <div 
                              key={i} 
                              className="w-1/12 h-full flex items-end justify-center group"
                            >
                              <div 
                                className="w-3/4 bg-gradient-to-t from-accent/90 to-accent/40 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"
                                style={{ height: `${height}%` }}
                              ></div>
                            </div>
                          ))}
                        </div>
                        {/* Trend line */}
                        <div className="absolute bottom-0 left-0 w-full h-full">
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path 
                              d="M0,35 L10,60 L20,30 L30,70 L40,45 L50,75 L60,25 L70,55 L80,65 L90,40 L100,35" 
                              stroke="hsla(152, 100%, 37%, 0.8)"
                              strokeWidth="1"
                              fill="none"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg shadow-lg">
                          Request a demo to see real data
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Anomaly detection section */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        Anomaly Detection
                      </h4>
                      <div className="text-xs text-black/50">3 issues found</div>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Mock anomalies */}
                      {[
                        { 
                          title: "HVAC Energy Spike", 
                          location: "Building B, Floor 3", 
                          time: "2 hours ago",
                          severity: "high"
                        },
                        { 
                          title: "Unusual Lighting Pattern", 
                          location: "Building A, South Wing", 
                          time: "Yesterday",
                          severity: "medium"
                        },
                        { 
                          title: "Server Room Cooling Inefficiency", 
                          location: "Data Center", 
                          time: "Ongoing",
                          severity: "low"
                        }
                      ].map((anomaly, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-8 rounded-full ${
                              anomaly.severity === 'high' ? 'bg-red-500' : 
                              anomaly.severity === 'medium' ? 'bg-orange-400' : 'bg-yellow-400'
                            }`}></div>
                            <div>
                              <div className="font-medium">{anomaly.title}</div>
                              <div className="text-xs text-black/60">{anomaly.location}</div>
                            </div>
                          </div>
                          <div className="text-xs text-black/50">{anomaly.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Sidebar metrics */}
                <div className="space-y-6">
                  {/* Energy mix chart */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-highlight" />
                        Energy Mix
                      </h4>
                    </div>
                    <div className="aspect-square relative flex items-center justify-center">
                      {/* Mock donut chart */}
                      <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
                        <div className="absolute inset-0 border-8 border-accent rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0% 45%)' }}></div>
                        <div className="absolute inset-0 border-8 border-highlight rounded-full" style={{ clipPath: 'polygon(0 45%, 100% 45%, 100% 65%, 0% 65%)' }}></div>
                        <div className="absolute inset-0 border-8 border-secondary rounded-full" style={{ clipPath: 'polygon(0 65%, 100% 65%, 100% 85%, 0% 85%)' }}></div>
                        <div className="absolute inset-0 border-8 border-gray-400 rounded-full" style={{ clipPath: 'polygon(0 85%, 100% 85%, 100% 100%, 0% 100%)' }}></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs text-black/50">Renewable</div>
                          <div className="text-xl font-semibold">45%</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-accent"></div>
                        <div>Solar (45%)</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-highlight"></div>
                        <div>Wind (20%)</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-secondary"></div>
                        <div>Hydro (20%)</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <div>Grid (15%)</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Key metrics */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-secondary" />
                        Key Metrics
                      </h4>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: "Energy Efficiency", value: "87%", trend: "+5%" },
                        { label: "Cost Reduction", value: "12.4%", trend: "+2.1%" },
                        { label: "Carbon Footprint", value: "-158T", trend: "-7%" },
                        { label: "ROI", value: "189%", trend: "+15%" }
                      ].map((metric, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="text-sm text-black/70">{metric.label}</div>
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{metric.value}</div>
                            <div className="text-xs text-green-600">{metric.trend}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* System status */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        System Status
                      </h4>
                    </div>
                    <div className="p-3 bg-green-50 rounded-md text-center">
                      <div className="text-sm font-medium text-green-700">All Systems Operational</div>
                      <div className="text-xs text-green-600 mt-1">Last checked: Just now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dashboard overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
              <div className="text-center p-6 max-w-lg">
                <h3 className="text-white text-2xl md:text-3xl font-medium mb-4">
                  Experience the Full Dashboard
                </h3>
                <p className="text-white/80 mb-6">
                  Get a personalized demo with real-time data from your facilities and discover how our AI can optimize your energy usage.
                </p>
                <Button 
                  className="glow-button text-primary font-medium px-8 py-7 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,191,114,0.4)]"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Request a Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
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
