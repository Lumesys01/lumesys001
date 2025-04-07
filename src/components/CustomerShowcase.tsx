
import React, { useState, useEffect } from 'react';
import { CheckCircle, HardHat, Factory, Building, Store, Gauge } from 'lucide-react';

interface CustomerLogo {
  name: string;
  logo: string;
  industry: string;
  icon: React.ReactNode;
}

interface SuccessMetric {
  customer: string;
  savingsPercentage: number;
  annualSavings: string;
  paybackPeriod: string;
  co2Reduction: string;
}

const CustomerShowcase: React.FC = () => {
  const customerLogos: CustomerLogo[] = [
    { 
      name: "Mines", 
      logo: "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Mining",
      icon: <HardHat className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "Manufacturing", 
      logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Manufacturing",
      icon: <Factory className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "GovInfra Systems", 
      logo: "https://images.unsplash.com/photo-1523294587484-bae6cc870010?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Government Infrastructure",
      icon: <Building className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "Retail Chains", 
      logo: "https://images.unsplash.com/photo-1612103198005-b238154f4590?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Retail Chains",
      icon: <Store className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "IPP & BESS", 
      logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Energy Industry",
      icon: <Gauge className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "Commercial and Industrial", 
      logo: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "C&I Sector",
      icon: <Factory className="h-4 w-4 text-accent/80" />
    },
  ];

  const successMetrics: SuccessMetric[] = [
    { 
      customer: "Projected: Mining Sector", 
      savingsPercentage: 24, 
      annualSavings: "Up to $920,000", 
      paybackPeriod: "Estimated 8-10 months", 
      co2Reduction: "Potential 580 tons" 
    },
    { 
      customer: "Projected: Government Infrastructure", 
      savingsPercentage: 19, 
      annualSavings: "Up to $650,000", 
      paybackPeriod: "Estimated 9-12 months", 
      co2Reduction: "Potential 420 tons" 
    },
    { 
      customer: "Projected: High Energy Industry", 
      savingsPercentage: 27, 
      annualSavings: "Up to $1,200,000", 
      paybackPeriod: "Estimated 6-9 months", 
      co2Reduction: "Potential 750 tons" 
    }
  ];

  const [activeMetric, setActiveMetric] = useState<number | null>(null);
  const [countUpValue, setCountUpValue] = useState(0);

  // Animation for counting up to 23%
  useEffect(() => {
    const targetValue = 23;
    const duration = 2000; // 2 seconds
    const frameDuration = 16; // ~60fps
    const totalFrames = Math.round(duration / frameDuration);
    const valueIncrement = targetValue / totalFrames;
    
    let currentFrame = 0;
    
    const timer = setInterval(() => {
      currentFrame++;
      setCountUpValue(prevValue => {
        const newValue = prevValue + valueIncrement;
        if (currentFrame === totalFrames || newValue >= targetValue) {
          clearInterval(timer);
          return targetValue;
        }
        return newValue;
      });
    }, frameDuration);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="customer-showcase" className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-accent/10 text-accent/90 text-sm font-medium">
            Projected Market Impact
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light mb-4 text-black">
            Potential <span className="gradient-text font-normal">Energy Management</span> Outcomes
          </h2>
          <p className="text-base md:text-lg text-black/70 max-w-2xl mx-auto">
            Explore our data-driven assumptions about potential energy optimization across high-consumption industries.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-16">
          {customerLogos.map((customer, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-2 sm:p-4 bg-white shadow-sm border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="h-10 sm:h-16 w-full flex items-center justify-center mb-2">
                <img 
                  src={customer.logo} 
                  alt={`${customer.name} logo`} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center">
                <div className="flex flex-wrap items-center justify-center gap-1 mb-1">
                  {customer.icon}
                  <p className="font-medium text-xs sm:text-sm">{customer.name}</p>
                </div>
                <p className="text-[10px] sm:text-xs text-black/60">{customer.industry}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Industry Benchmark Card with Count Up Animation */}
          <div className="mb-10 md:mb-16">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-medium mb-2 text-black">Industry Benchmark</h3>
                  <p className="text-sm md:text-base text-black/70 mb-4">Average potential energy savings across sectors</p>
                </div>
                <div className="w-full md:w-2/3 flex justify-center md:justify-end">
                  <div className="relative flex flex-col items-center">
                    <div className="text-5xl sm:text-6xl md:text-7xl font-light">
                      <span className="gradient-text font-normal">{countUpValue.toFixed(1)}</span>
                      <span className="text-2xl sm:text-3xl md:text-4xl">%</span>
                    </div>
                    <div className="mt-2 w-full max-w-xs">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-accent to-highlight transition-all duration-1000 ease-out"
                          style={{ width: `${(countUpValue / 23) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-center mt-1 text-black/60">Industry average potential savings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-12 text-center">
            <h3 className="text-2xl md:text-3xl font-medium mb-4 relative inline-block">
              <span className="gradient-text font-bold">Potential Results</span>, Backed by Assumptions
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-button-gradient rounded-full"></div>
            </h3>
            <p className="text-base md:text-lg text-black/70 max-w-2xl mx-auto mt-4">
              Our projections demonstrate the potential savings and sustainability improvements across different sectors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {successMetrics.map((metric, index) => (
              <div 
                key={index} 
                className={`relative perspective-container transition-all duration-300 cursor-pointer
                  ${activeMetric === index ? 'scale-[1.03]' : 'hover:scale-[1.02]'}`}
                onMouseEnter={() => setActiveMetric(index)}
                onMouseLeave={() => setActiveMetric(null)}
              >
                <div className={`
                  relative z-10 rounded-xl overflow-hidden transition-all duration-500
                  ${activeMetric === index 
                    ? 'shadow-[0_10px_40px_-10px_rgba(0,191,114,0.5)]' 
                    : 'shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(0,191,114,0.3)]'
                  }
                `}>
                  <div className={`
                    h-2 w-full bg-button-gradient transition-all duration-300
                    ${activeMetric === index ? 'h-3' : ''}
                  `}></div>
                  
                  <div className={`
                    absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    flex items-center justify-center rounded-full p-1
                    transition-all duration-300 z-20
                    ${activeMetric === index 
                      ? 'bg-gradient-to-r from-accent to-highlight shadow-[0_0_20px_rgba(168,235,18,0.5)] scale-110' 
                      : 'bg-gradient-to-r from-accent/90 to-highlight/90'
                    }
                  `}>
                    <div className="bg-white rounded-full h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className={`
                          text-xl font-bold leading-none bg-clip-text text-transparent bg-button-gradient transition-all duration-300
                          ${activeMetric === index ? 'text-2xl' : ''}
                        `}>
                          {metric.savingsPercentage}%
                        </span>
                        <span className="text-[8px] sm:text-[10px] text-black/60 leading-tight">SAVINGS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-10 pb-6 px-4 sm:px-6 bg-white">
                    <h4 className={`
                      text-center text-base sm:text-lg md:text-xl font-medium mb-4 sm:mb-6 transition-all duration-300
                      ${activeMetric === index ? 'text-accent' : 'text-black'}
                    `}>
                      {metric.customer}
                    </h4>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className={`
                        flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-300
                        ${activeMetric === index ? 'bg-accent/5' : 'bg-gray-50'}
                      `}>
                        <CheckCircle className={`
                          h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-colors duration-300
                          ${activeMetric === index ? 'text-accent' : 'text-green-500'}
                        `} />
                        <div>
                          <p className="text-xs sm:text-sm text-black/60">Annual Savings</p>
                          <p className="font-bold text-sm sm:text-base text-black">{metric.annualSavings}</p>
                        </div>
                      </div>
                      
                      <div className={`
                        flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-300
                        ${activeMetric === index ? 'bg-accent/5' : 'bg-gray-50'}
                      `}>
                        <CheckCircle className={`
                          h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-colors duration-300
                          ${activeMetric === index ? 'text-accent' : 'text-green-500'}
                        `} />
                        <div>
                          <p className="text-xs sm:text-sm text-black/60">Payback Period</p>
                          <p className="font-bold text-sm sm:text-base text-black">{metric.paybackPeriod}</p>
                        </div>
                      </div>
                      
                      <div className={`
                        flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-300
                        ${activeMetric === index ? 'bg-accent/5' : 'bg-gray-50'}
                      `}>
                        <CheckCircle className={`
                          h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-colors duration-300
                          ${activeMetric === index ? 'text-accent' : 'text-green-500'}
                        `} />
                        <div>
                          <p className="text-xs sm:text-sm text-black/60">CO₂ Reduction</p>
                          <p className="font-bold text-sm sm:text-base text-black">{metric.co2Reduction}/year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`
                  absolute -bottom-4 left-1/2 -translate-x-1/2 h-4 w-3/4 
                  bg-accent blur-xl opacity-0 transition-opacity duration-300
                  ${activeMetric === index ? 'opacity-30' : ''}
                `}></div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 md:mt-14 text-center">
            <p className="text-base md:text-lg font-medium mb-4 md:mb-6 text-black/80">
              Ready to achieve similar results for your industry?
            </p>
            <a 
              href="#roi" 
              className="glow-button inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-full text-primary font-medium shadow-[0_4px_20px_rgba(0,191,114,0.3)] hover:shadow-[0_4px_25px_rgba(0,191,114,0.5)] transition-all duration-300"
            >
              Calculate Your Potential Savings
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerShowcase;
