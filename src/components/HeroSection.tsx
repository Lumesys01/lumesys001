
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center animated-gradient-background">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      {/* Animated energy particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, index) => (
          <div 
            key={index}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-highlight opacity-70 animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto z-10 px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Logo */}
          <div className="mb-8 animate-float" style={{ animationDelay: "0s" }}>
            <div className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/27f5da26-b388-4950-8f4b-3cc7bbf89a05.png" 
                alt="Lumesys Logo" 
                className="h-16 w-16 mr-3" 
              />
              <div className="text-3xl md:text-4xl font-medium flex items-center">
                <span className="gradient-text mr-2">LUME</span>
                <span>SYS</span>
              </div>
            </div>
          </div>
          
          <p className="mb-4 text-lg md:text-xl font-medium bg-clip-text text-transparent bg-button-gradient animate-float" style={{ animationDelay: "0.2s" }}>
            Do, Dare; Dominate.
          </p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight animate-float" style={{ animationDelay: "0.4s" }}>
            The Brain for <span className="gradient-text font-normal">Energy Optimization</span> & Efficiency
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-10 animate-float" style={{ animationDelay: "0.6s" }}>
            Reduce operational costs by a minimum of 10% with AI-powered solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-float" style={{ animationDelay: "0.8s" }}>
            <Button className="glow-button text-primary font-medium px-8 py-6 rounded-full text-lg hover:scale-105 transition-transform">
              Join the Waitlist
            </Button>
            
            <Button variant="outline" className="glow-border bg-transparent backdrop-blur-sm text-white px-8 py-6 rounded-full text-lg group hover:scale-105 transition-transform">
              Learn More 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "1.5s", animationDuration: "8s" }}></div>
      <div className="absolute top-1/4 -right-20 w-60 h-60 rounded-full bg-highlight/5 blur-3xl animate-float" style={{ animationDelay: "2s", animationDuration: "10s" }}></div>
      <div className="absolute bottom-1/3 -left-10 w-32 h-32 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: "0.5s", animationDuration: "9s" }}></div>
      
      {/* Decorative glowing circle */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neonpurple/20 blur-[100px] -z-0"></div>
    </section>
  );
};

export default HeroSection;
