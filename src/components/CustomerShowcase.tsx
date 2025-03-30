
import React, { useState } from 'react';
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
      name: "GlobalTech Manufacturing", 
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
      name: "RetailMax Group", 
      logo: "https://images.unsplash.com/photo-1612103198005-b238154f4590?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Retail Chains",
      icon: <Store className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "EnergySphere", 
      logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "High Energy Industry",
      icon: <Gauge className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "ProcessTech Industries", 
      logo: "https://images.unsplash.com/photo-1581092160607-ee22731c9c2c?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "C&I Industries",
      icon: <Factory className="h-4 w-4 text-accent/80" />
    },
  ];

  const successMetrics: SuccessMetric[] = [
    { 
      customer: "Mines", 
      savingsPercentage: 24, 
      annualSavings: "$920,000", 
      paybackPeriod: "8 months", 
      co2Reduction: "580 tons" 
    },
    { 
      customer: "GovInfra Systems", 
      savingsPercentage: 19, 
      annualSavings: "$650,000", 
      paybackPeriod: "10 months", 
      co2Reduction: "420 tons" 
    },
    { 
      customer: "EnergySphere", 
      savingsPercentage: 27, 
      annualSavings: "$1,200,000", 
      paybackPeriod: "6 months", 
      co2Reduction: "750 tons" 
    }
  ];

  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  return (
    <section id="customer-showcase" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-accent/10 text-accent/90 text-sm font-medium">
            Target Markets
          </span>
          <h2 className="text-3xl md:text-5xl font-light mb-4 text-black">
            Transforming <span className="gradient-text font-normal">Energy Management</span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            See how high-energy-consuming industries are achieving significant cost savings and sustainability goals with Lumesys.
          </p>
        </div>
        
        {/* Customer Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {customerLogos.map((customer, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-4 bg-white shadow-sm border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-full flex items-center justify-center mb-2">
                <img 
                  src={customer.logo} 
                  alt={`${customer.name} logo`} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {customer.icon}
                  <p className="font-medium text-sm">{customer.name}</p>
                </div>
                <p className="text-xs text-black/60">{customer.industry}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Success Metrics - Redesigned for more responsiveness and visual appeal */}
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h3 className="text-2xl md:text-3xl font-medium mb-4 relative inline-block">
              <span className="gradient-text font-bold">Real Results</span>, Measurable Impact
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-button-gradient rounded-full"></div>
            </h3>
            <p className="text-lg text-black/70 max-w-2xl mx-auto mt-4">
              Our clients achieve remarkable energy savings and sustainability outcomes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
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
                  {/* Top accent band with percentage */}
                  <div className={`
                    h-2 w-full bg-button-gradient transition-all duration-300
                    ${activeMetric === index ? 'h-3' : ''}
                  `}></div>
                  
                  {/* Percentage badge */}
                  <div className={`
                    absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    flex items-center justify-center rounded-full p-1
                    transition-all duration-300 z-20
                    ${activeMetric === index 
                      ? 'bg-gradient-to-r from-accent to-highlight shadow-[0_0_20px_rgba(168,235,18,0.5)] scale-110' 
                      : 'bg-gradient-to-r from-accent/90 to-highlight/90'
                    }
                  `}>
                    <div className="bg-white rounded-full h-14 w-14 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className={`
                          text-xl font-bold leading-none bg-clip-text text-transparent bg-button-gradient transition-all duration-300
                          ${activeMetric === index ? 'text-2xl' : ''}
                        `}>
                          {metric.savingsPercentage}%
                        </span>
                        <span className="text-[10px] text-black/60 leading-tight">SAVINGS</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card content */}
                  <div className="pt-10 pb-6 px-6 bg-white">
                    <h4 className={`
                      text-center text-xl font-medium mb-6 transition-all duration-300
                      ${activeMetric === index ? 'text-accent' : 'text-black'}
                    `}>
                      {metric.customer}
                    </h4>
                    
                    <div className="space-y-4">
                      <div className={`
                        flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                        ${activeMetric === index ? 'bg-accent/5' : 'bg-gray-50'}
                      `}>
                        <CheckCircle className={`
                          h-5 w-5 flex-shrink-0 transition-colors duration-300
                          ${activeMetric === index ? 'text-accent' : 'text-green-500'}
                        `} />
                        <div>
                          <p className="text-sm text-black/60">Annual Savings</p>
                          <p className="font-bold text-black">{metric.annualSavings}</p>
                        </div>
                      </div>
                      
                      <div className={`
                        flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                        ${activeMetric === index ? 'bg-accent/5' : 'bg-gray-50'}
                      `}>
                        <CheckCircle className={`
                          h-5 w-5 flex-shrink-0 transition-colors duration-300
                          ${activeMetric === index ? 'text-accent' : 'text-green-500'}
                        `} />
                        <div>
                          <p className="text-sm text-black/60">Payback Period</p>
                          <p className="font-bold text-black">{metric.paybackPeriod}</p>
                        </div>
                      </div>
                      
                      <div className={`
                        flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                        ${activeMetric === index ? 'bg-accent/5' : 'bg-gray-50'}
                      `}>
                        <CheckCircle className={`
                          h-5 w-5 flex-shrink-0 transition-colors duration-300
                          ${activeMetric === index ? 'text-accent' : 'text-green-500'}
                        `} />
                        <div>
                          <p className="text-sm text-black/60">CO₂ Reduction</p>
                          <p className="font-bold text-black">{metric.co2Reduction}/year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom glow effect */}
                <div className={`
                  absolute -bottom-4 left-1/2 -translate-x-1/2 h-4 w-3/4 
                  bg-accent blur-xl opacity-0 transition-opacity duration-300
                  ${activeMetric === index ? 'opacity-30' : ''}
                `}></div>
              </div>
            ))}
          </div>
          
          <div className="mt-14 text-center">
            <p className="text-lg font-medium mb-6 text-black/80">
              Ready to achieve similar results for your industry?
            </p>
            <a 
              href="#roi" 
              className="glow-button inline-block px-8 py-3 rounded-full text-primary font-medium shadow-[0_4px_20px_rgba(0,191,114,0.3)] hover:shadow-[0_4px_25px_rgba(0,191,114,0.5)] transition-all duration-300"
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
