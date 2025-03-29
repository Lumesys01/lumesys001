import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyLumesys from "@/components/WhyLumesys";
import CTASection from "@/components/CTASection";
import DemoCharts from "@/components/DemoCharts";
import GiftBox3D from "@/components/GiftBox3D";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Main content */}
      <main>
        {/* Hero Section with 3D Gift Box */}
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
                    <span className="gradient-text mr-2">Lumesys</span>
                  </div>
                </div>
              </div>
              
              {/* 3D Gift Box */}
              <div className="mb-12">
                <GiftBox3D />
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
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-float" style={{ animationDelay: "0.8s" }}>
                
                
              </div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "1.5s", animationDuration: "8s" }}></div>
          <div className="absolute top-1/4 -right-20 w-60 h-60 rounded-full bg-highlight/5 blur-3xl animate-float" style={{ animationDelay: "2s", animationDuration: "10s" }}></div>
          <div className="absolute bottom-1/3 -left-10 w-32 h-32 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: "0.5s", animationDuration: "9s" }}></div>
          
        </section>
        
        {/* Features Section */}
        <section id="features">
          <FeaturesSection />
        </section>
        
        {/* Charts Demo Section */}
        <section id="charts" className="bg-surface/50">
          <DemoCharts />
        </section>
        
        {/* Why Lumesys Section */}
        <section id="why">
          <WhyLumesys />
        </section>
        
        {/* CTA Section with Email Capture */}
        <section id="waitlist">
          <CTASection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
