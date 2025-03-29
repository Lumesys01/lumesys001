
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyLumesys from "@/components/WhyLumesys";
import CTASection from "@/components/CTASection";
import DemoCharts from "@/components/DemoCharts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Main content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
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

