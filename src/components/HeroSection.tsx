
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
          <p className="mb-4 text-lg md:text-xl font-medium bg-clip-text text-transparent bg-button-gradient">
            Do, Dare; Dominate.
          </p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
            The Brain for <span className="gradient-text font-normal">Energy Optimization</span> & Efficiency
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-10">
            Reduce operational costs by a minimum of 10% with AI-driven energy intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Button className="glow-button text-primary font-medium px-8 py-6 rounded-full text-lg">
              Join the Waitlist
            </Button>
            
            <Button variant="outline" className="glow-border bg-transparent backdrop-blur-sm text-white px-8 py-6 rounded-full text-lg group">
              Learn More 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative glowing circle */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neonpurple/20 blur-[100px] -z-0"></div>
    </section>
  );
};

export default HeroSection;
