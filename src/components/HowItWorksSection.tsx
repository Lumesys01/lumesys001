
import React from 'react';
import { Check } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Systems",
      description: "Our platform seamlessly integrates with your existing energy infrastructure with minimal disruption to your operations.",
      icon: "/lovable-uploads/44afb2a2-5b6d-4a11-8690-39da443709f4.png"
    },
    {
      number: "02",
      title: "AI Analysis & Learning",
      description: "Our advanced AI algorithms analyze your energy usage patterns and learn how your facilities operate over time.",
      icon: "/lovable-uploads/b9fc5626-de7f-4404-afcf-fcb031f058c0.png"
    },
    {
      number: "03",
      title: "Continuous Optimization",
      description: "The system automatically implements optimization strategies that adapt to changing conditions in real-time.",
      icon: "/lovable-uploads/9f0aac31-e231-48e8-925e-2ad8c7249407.png"
    }
  ];

  const benefits = [
    "Reduce energy costs by 10-30%",
    "Lower carbon footprint",
    "Extend equipment lifespan",
    "Improve operational reliability",
    "Real-time monitoring & alerts"
  ];

  return (
    <section className="section-padding relative bg-white">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-highlight/5 rounded-full blur-[150px] z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-4 text-black">
            How <span className="gradient-text font-normal">Lumesys</span> Works
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Our three-step process transforms your energy management with minimal disruption to your operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-8 text-center relative overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <span className="absolute -top-6 -right-6 text-8xl font-bold text-accent/5">
                {step.number}
              </span>
              
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-accent/5 rounded-full flex items-center justify-center">
                  <img src={step.icon} alt={step.title} className="w-10 h-10 object-contain" />
                </div>
              </div>
              
              <h3 className="text-xl font-medium mb-3 text-black relative z-10">
                {step.title}
              </h3>
              
              <p className="text-black/70 relative z-10">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 rotate-45 border-t-2 border-r-2 border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto glass-card rounded-xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-light mb-4 text-black">
                Benefits You'll <span className="gradient-text font-normal">Experience</span>
              </h3>
              
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-highlight/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-highlight" />
                    </div>
                    <span className="text-black">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=60" 
                alt="Lumesys in action" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
