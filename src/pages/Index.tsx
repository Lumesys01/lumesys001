import React, { Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import DashboardPreview from "@/components/DashboardPreview";
import CustomerShowcase from "@/components/CustomerShowcase";
import ROICalculator from "@/components/ROICalculator";
import ClientContactForm from "@/components/ClientContactForm";
import DemoCharts from "@/components/DemoCharts";

// Lazy load components that are not immediately visible
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const WhyLumesys = lazy(() => import("@/components/WhyLumesys"));
const CTASection = lazy(() => import("@/components/CTASection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));

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
        
        <section id="dashboard-preview" className="bg-white py-4">
          <DashboardPreview />
        </section>
        
        <section id="how-it-works" className="bg-white py-4">
          <Suspense fallback={<LoadingFallback />}>
            <HowItWorksSection />
          </Suspense>
        </section>
        
        <section id="features" className="bg-white py-4">
          <Suspense fallback={<LoadingFallback />}>
            <FeaturesSection />
          </Suspense>
        </section>
        
        <section id="roi" className="bg-white py-4">
          <ROICalculator />
        </section>
        
        <section id="charts" className="bg-white py-4">
          <DemoCharts />
        </section>
        
        <Suspense fallback={<LoadingFallback />}>
          <section id="why" className="bg-white py-4">
            <WhyLumesys />
          </section>
          
          <section id="customers" className="bg-white py-4">
            <CustomerShowcase />
          </section>
          
          <section id="faq" className="bg-white py-4">
            <FAQSection />
          </section>
          
          <section id="contact" className="bg-white py-4">
            <ClientContactForm />
          </section>
          
          <section id="waitlist" className="bg-white py-4">
            <CTASection />
          </section>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
