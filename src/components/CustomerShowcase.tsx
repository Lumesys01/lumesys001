
import React from 'react';
import { CheckCircle, Building, Hospital, Computer, Briefcase, ShoppingBag, Building2 } from 'lucide-react';

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
      name: "TechGlobal", 
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Data Centers",
      icon: <Computer className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "HealthCare Partners", 
      logo: "https://images.unsplash.com/photo-1516549655669-8f13e61b09fa?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Healthcare",
      icon: <Hospital className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "Manufacturing Plus", 
      logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Manufacturing",
      icon: <Building className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "Edu Connect", 
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Education",
      icon: <Briefcase className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "CommMart Group", 
      logo: "https://images.unsplash.com/photo-1612103198005-b238154f4590?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Retail",
      icon: <ShoppingBag className="h-4 w-4 text-accent/80" />
    },
    { 
      name: "Real Estate One", 
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=120&h=60&crop=entropy", 
      industry: "Commercial Real Estate",
      icon: <Building2 className="h-4 w-4 text-accent/80" />
    },
  ];

  const successMetrics: SuccessMetric[] = [
    { 
      customer: "TechGlobal", 
      savingsPercentage: 22, 
      annualSavings: "$680,000", 
      paybackPeriod: "9 months", 
      co2Reduction: "450 tons" 
    },
    { 
      customer: "HealthCare Partners", 
      savingsPercentage: 18, 
      annualSavings: "$420,000", 
      paybackPeriod: "11 months", 
      co2Reduction: "280 tons" 
    },
    { 
      customer: "Manufacturing Plus", 
      savingsPercentage: 25, 
      annualSavings: "$950,000", 
      paybackPeriod: "7 months", 
      co2Reduction: "620 tons" 
    }
  ];

  return (
    <section id="customer-showcase" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-accent/10 text-accent/90 text-sm font-medium">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-light mb-4 text-black">
            Trusted by <span className="gradient-text font-normal">Industry Leaders</span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            See how companies across various industries are achieving significant energy savings with Lumesys.
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
        
        {/* Success Metrics */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-medium mb-8 text-center">
            Real Results, Measurable Impact
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {successMetrics.map((metric, index) => (
              <div 
                key={index} 
                className="neo-card p-6 relative border-t-4 border-accent hover:shadow-lg transition-shadow"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                  {metric.savingsPercentage}% Energy Savings
                </div>
                
                <h4 className="text-xl font-medium mb-4 mt-2 text-center">{metric.customer}</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span><strong>Annual Savings:</strong> {metric.annualSavings}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span><strong>Payback Period:</strong> {metric.paybackPeriod}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span><strong>CO2 Reduction:</strong> {metric.co2Reduction}/year</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-lg font-medium mb-4">Ready to achieve similar results?</p>
            <a 
              href="#roi-calculator" 
              className="glow-button inline-block px-8 py-3 rounded-full text-primary font-medium shadow-lg"
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
