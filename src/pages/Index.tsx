
import React, { Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import VideoShowcase from "@/components/VideoShowcase";

// Lazy load components that are not immediately visible
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const WhyLumesys = lazy(() => import("@/components/WhyLumesys"));
const CTASection = lazy(() => import("@/components/CTASection"));
const DemoCharts = lazy(() => import("@/components/DemoCharts"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-pulse text-black/50">Loading...</div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      <main>
        <HeroSection />
        
        {/* Add the VideoShowcase component right after the hero section */}
        <section id="demo-video" className="bg-white">
          <VideoShowcase />
        </section>
        
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
