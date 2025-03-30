
import React, { Suspense, lazy, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import DashboardPreview from "@/components/DashboardPreview";
import CustomerShowcase from "@/components/CustomerShowcase";
import ROICalculator from "@/components/ROICalculator";
import ClientContactForm from "@/components/ClientContactForm";
import DemoCharts from "@/components/DemoCharts";
import WhyLumesys from "@/components/WhyLumesys";
import PageTransition from "@/components/ui/PageTransition";
import ScrollIndicator from "@/components/ScrollIndicator";

// Lazy load components that are not immediately visible
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));

// Loading fallback component with improved UI
const LoadingFallback = () => (
  <div className="w-full h-64 flex flex-col items-center justify-center">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-t-4 border-accent rounded-full animate-spin"></div>
      <div className="absolute inset-3 border-t-4 border-highlight rounded-full animate-spin-slow"></div>
    </div>
    <div className="mt-4 animate-pulse text-black/70">Loading content...</div>
  </div>
);

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      <main className="pt-20">
        <section className="relative">
          <HeroSection />
          <ScrollIndicator targetId="dashboard-preview" />
        </section>
        
        <PageTransition>
          <section id="dashboard-preview" className="bg-white py-16">
            <DashboardPreview />
          </section>
        </PageTransition>
        
        <PageTransition>
          <section id="how-it-works" className="bg-white py-16">
            <Suspense fallback={<LoadingFallback />}>
              <HowItWorksSection />
            </Suspense>
          </section>
        </PageTransition>
        
        <PageTransition>
          <section id="features" className="bg-white py-16">
            <Suspense fallback={<LoadingFallback />}>
              <FeaturesSection />
            </Suspense>
          </section>
        </PageTransition>
        
        <PageTransition>
          <section id="roi" className="bg-white py-16">
            <ROICalculator />
          </section>
        </PageTransition>
        
        <PageTransition>
          <section id="charts" className="bg-white py-16">
            <DemoCharts />
          </section>
        </PageTransition>
        
        <PageTransition>
          <section id="why" className="bg-white py-16">
            <WhyLumesys />
          </section>
        </PageTransition>
        
        <Suspense fallback={<LoadingFallback />}>
          <PageTransition>
            <section id="customers" className="bg-white py-16">
              <CustomerShowcase />
            </section>
          </PageTransition>
          
          <PageTransition>
            <section id="faq" className="bg-white py-16">
              <FAQSection />
            </section>
          </PageTransition>
          
          <PageTransition>
            <section id="contact" className="bg-white py-16">
              <ClientContactForm />
            </section>
          </PageTransition>
          
          <PageTransition>
            <section id="waitlist" className="bg-white py-16">
              <CTASection />
            </section>
          </PageTransition>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
