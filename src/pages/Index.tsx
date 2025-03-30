
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white">
        <div 
          className="bg-gradient-to-r from-accent to-highlight h-full"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      
      <main className="pt-20">
        <section className="relative">
          <HeroSection />
          <ScrollIndicator targetId="dashboard-preview" />
        </section>
        
        <PageTransition direction="up">
          <section id="dashboard-preview" className="bg-white py-16">
            <DashboardPreview />
          </section>
        </PageTransition>
        
        <PageTransition direction="right" delay={200}>
          <section id="how-it-works" className="bg-white py-16">
            <Suspense fallback={<LoadingFallback />}>
              <HowItWorksSection />
            </Suspense>
          </section>
        </PageTransition>
        
        <PageTransition direction="left" delay={200}>
          <section id="features" className="bg-white py-16">
            <Suspense fallback={<LoadingFallback />}>
              <FeaturesSection />
            </Suspense>
          </section>
        </PageTransition>
        
        <PageTransition direction="up">
          <section id="roi" className="bg-white py-16">
            <ROICalculator />
          </section>
        </PageTransition>
        
        <PageTransition direction="right" delay={100}>
          <section id="charts" className="bg-white py-16">
            <DemoCharts />
          </section>
        </PageTransition>
        
        <PageTransition direction="left" delay={100}>
          <section id="why" className="bg-white py-16">
            <WhyLumesys />
          </section>
        </PageTransition>
        
        <Suspense fallback={<LoadingFallback />}>
          <PageTransition direction="up">
            <section id="customers" className="bg-white py-16">
              <CustomerShowcase />
            </section>
          </PageTransition>
          
          <PageTransition direction="right" delay={150}>
            <section id="faq" className="bg-white py-16">
              <FAQSection />
            </section>
          </PageTransition>
          
          <PageTransition direction="left" delay={150}>
            <section id="contact" className="bg-white py-16">
              <ClientContactForm />
            </section>
          </PageTransition>
          
          <PageTransition direction="up" delay={200}>
            <section id="waitlist" className="bg-white py-16">
              <CTASection />
            </section>
          </PageTransition>
        </Suspense>
      </main>

      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 bg-accent/90 hover:bg-accent text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 ${
          scrollProgress > 20 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      <Footer />
    </div>
  );
};

export default Index;
