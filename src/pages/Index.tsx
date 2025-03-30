
import React, { Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import DashboardPreview from "@/components/DashboardPreview";
import CustomerShowcase from "@/components/CustomerShowcase";
import ROICalculator from "@/components/ROICalculator";
import ClientContactForm from "@/components/ClientContactForm";
import DemoCharts from "@/components/DemoCharts"; // Import DemoCharts directly instead of lazy loading

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
        
        {/* Dashboard Preview section - moved to top priority and not lazy loaded */}
        <section id="dashboard-preview" className="bg-white py-4">
          <DashboardPreview />
        </section>
        
        {/* Reorganized content flow for better user experience */}
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
        
        {/* ROI Calculator - highlighting business value */}
        <section id="roi" className="bg-white py-4">
          <ROICalculator />
        </section>
        
        {/* Charts demo section - now directly imported, not lazy loaded */}
        <section id="charts" className="bg-white py-4">
          <DemoCharts />
        </section>
        
        <Suspense fallback={<LoadingFallback />}>
          {/* Why Lumesys section - enhanced competitive advantage */}
          <section id="why" className="bg-white py-4">
            <WhyLumesys />
          </section>
          
          {/* Customer Showcase - social proof */}
          <section id="customers" className="bg-white py-4">
            <CustomerShowcase />
          </section>
          
          {/* FAQ section */}
          <section id="faq" className="bg-white py-4">
            <FAQSection />
          </section>
          
          {/* Client Contact Form - conversion point */}
          <section id="contact" className="bg-white py-4">
            <ClientContactForm />
          </section>
          
          {/* CTA section - final conversion opportunity */}
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
