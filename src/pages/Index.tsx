
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyLumesys from "@/components/WhyLumesys";
import CTASection from "@/components/CTASection";
import DemoCharts from "@/components/DemoCharts";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navigation />
      
      <main>
        <HeroSection />
        
        <section id="features" className="bg-white">
          <FeaturesSection />
        </section>
        
        <section id="waitlist" className="bg-white">
          <CTASection />
        </section>
        
        <section id="testimonials" className="bg-white">
          <TestimonialsSection />
        </section>
        
        <section id="charts" className="bg-white py-4">
          <DemoCharts />
        </section>
        
        <section id="why" className="bg-white">
          <WhyLumesys />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
