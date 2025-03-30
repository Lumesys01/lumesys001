
import React, { Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import DashboardPreview from "@/components/DashboardPreview";
import CustomerShowcase from "@/components/CustomerShowcase";
import ROICalculator from "@/components/ROICalculator";
import ClientContactForm from "@/components/ClientContactForm";

// Lazy load components that are not immediately visible
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const WhyLumesys = lazy(() => import("@/components/WhyLumesys"));
const CTASection = lazy(() => import("@/components/CTASection"));
const DemoCharts = lazy(() => import("@/components/DemoCharts"));
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
        
        {/* Dashboard Preview section - replacing Video showcase */}
        <section id="dashboard-preview" className="bg-white">
          <DashboardPreview />
        </section>
        
        {/* ROI Calculator - Added new section */}
        <section id="roi" className="bg-white">
          <ROICalculator />
        </section>
        
        <Suspense fallback={<LoadingFallback />}>
          {/* How it works section */}
          <section id="how-it-works" className="bg-white">
            <HowItWorksSection />
          </section>
          
          {/* Features section */}
          <section id="features" className="bg-white">
            <FeaturesSection />
          </section>
          
          {/* Customer Showcase - Added new section */}
          <section id="customers" className="bg-white">
            <CustomerShowcase />
          </section>
          
          {/* Why Lumesys section */}
          <section id="why" className="bg-white">
            <WhyLumesys />
          </section>
          
          {/* Charts demo section */}
          <section id="charts" className="bg-white py-4">
            <DemoCharts />
          </section>
          
          {/* Client Contact Form - New section */}
          <section id="contact" className="bg-white">
            <ClientContactForm />
          </section>
          
          {/* FAQ section */}
          <section id="faq" className="bg-white">
            <FAQSection />
          </section>
          
          {/* CTA section */}
          <section id="waitlist" className="bg-white">
            <CTASection />
          </section>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
