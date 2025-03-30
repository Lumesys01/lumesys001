
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth scroll to dashboard preview section
  const scrollToDashboard = () => {
    const dashboardSection = document.getElementById('dashboard-preview');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center bg-white">
      {/* Background accent elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-white"></div>
      
      {/* Overlay gradient with parallax effect - removed dark overlay */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
        }}
      ></div>
      
      {/* Enhanced energy particles with more depth */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-highlight opacity-70 animate-pulse-glow"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2}px)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              transform: `translateZ(${Math.random() * 50}px)`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto z-10 px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Logo with enhanced animation */}
          <div className="mb-8 animate-float" style={{ animationDelay: "0s" }}>
            <div className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/27f5da26-b388-4950-8f4b-3cc7bbf89a05.png" 
                alt="Lumesys Logo" 
                className="h-16 w-16 mr-3 filter drop-shadow-[0_0_8px_rgba(168,235,18,0.6)]" 
              />
              <div className="text-3xl md:text-4xl font-medium flex items-center">
                <span className="gradient-text mr-2 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">LUME</span>
                <span className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">SYS</span>
              </div>
            </div>
          </div>
          
          <p className="mb-4 text-lg md:text-xl font-medium bg-clip-text text-transparent bg-button-gradient animate-float" style={{ animationDelay: "0.2s" }}>
            Do, Dare; Dominate.
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight mb-6 leading-tight animate-float" style={{ animationDelay: "0.4s" }}>
            The Brain for <span className="gradient-text font-normal filter drop-shadow-[0_0_20px_rgba(168,235,18,0.3)]">Energy Optimization</span> & Efficiency
          </h1>
          
          <p className="text-xl md:text-2xl text-black/80 max-w-3xl mb-10 animate-float" style={{ animationDelay: "0.6s" }}>
            Reduce operational costs by a minimum of <span className="text-highlight font-medium">10%</span> with our AI-powered solutions.
          </p>
          
          {/* Enhanced CTA section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-float" style={{ animationDelay: "0.8s" }}>
            <Button 
              onClick={scrollToDashboard}
              className="glow-button text-primary font-medium px-8 py-7 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,191,114,0.4)]"
            >
              View Live Dashboard
            </Button>
            
            <Button 
              variant="outline" 
              className="glow-border bg-transparent backdrop-blur-sm text-black px-8 py-7 rounded-full text-lg group hover:scale-105 transition-transform duration-300"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Request Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
          
          {/* View Dashboard button - enhanced with animation */}
          <div className="mt-16 animate-bounce">
            <button 
              onClick={scrollToDashboard}
              className="flex flex-col items-center text-black/60 hover:text-highlight transition-colors"
              aria-label="View dashboard preview"
            >
              <span className="text-sm mb-2 font-medium">Scroll to Dashboard</span>
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating decorative elements with parallax effect */}
      <div 
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float" 
        style={{ 
          animationDelay: "1.5s", 
          animationDuration: "8s",
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)` 
        }}
      ></div>
      <div 
        className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-highlight/5 blur-3xl animate-float" 
        style={{ 
          animationDelay: "2s", 
          animationDuration: "10s",
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)` 
        }}
      ></div>
      <div 
        className="absolute bottom-1/3 -left-10 w-48 h-48 rounded-full bg-secondary/10 blur-3xl animate-float" 
        style={{ 
          animationDelay: "0.5s", 
          animationDuration: "9s",
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` 
        }}
      ></div>
    </section>
  );
};

export default HeroSection;
