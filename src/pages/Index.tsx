
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
import OurWhy from "@/components/OurWhy";
import TeamSection from "@/components/TeamSection";
import PageTransition from "@/components/ui/PageTransition";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Separator } from "@/components/ui/separator";

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
    <div className="mt-4 animate-pulse text-black/70 dark:text-white/70">Loading content...</div>
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

  // Custom section divider component
  const SectionDivider = ({ label, className = "" }: { label?: string, className?: string }) => (
    <div className={`relative py-8 ${className}`}>
      <Separator className="absolute left-0 right-0 bg-gradient-to-r from-transparent via-accent/30 dark:via-accent/50 to-transparent h-[2px]" />
      {label && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-background-dark px-4 text-sm text-accent/80 dark:text-accent/90 font-medium">
          {label}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark text-black dark:text-foreground-dark">
      <Navigation />
      
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white dark:bg-background-dark">
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
          <section id="dashboard-preview" className="bg-white dark:bg-background-dark py-16">
            <DashboardPreview />
          </section>
        </PageTransition>
        
        <SectionDivider label="HOW IT WORKS" />
        
        <PageTransition direction="right" delay={100}>
          <section id="how-it-works" className="bg-white dark:bg-background-dark py-16">
            <Suspense fallback={<LoadingFallback />}>
              <HowItWorksSection />
            </Suspense>
          </section>
        </PageTransition>
        
        <SectionDivider />
        
        <PageTransition direction="left" delay={100}>
          <section id="why" className="bg-white dark:bg-background-dark py-16">
            <WhyLumesys />
          </section>
        </PageTransition>
        
        <SectionDivider label="FEATURES" />
        
        <PageTransition direction="left" delay={200}>
          <section id="features" className="bg-white dark:bg-background-dark py-16">
            <Suspense fallback={<LoadingFallback />}>
              <FeaturesSection />
            </Suspense>
          </section>
        </PageTransition>
        
        <SectionDivider />
        
        <PageTransition direction="right" delay={150}>
          <section id="our-why" className="bg-white dark:bg-background-dark py-16">
            <OurWhy />
          </section>
        </PageTransition>
        
        <SectionDivider label="ROI & DATA" />
        
        <PageTransition direction="up">
          <section id="roi" className="bg-white dark:bg-background-dark py-16">
            <ROICalculator />
          </section>
        </PageTransition>
        
        <SectionDivider />
        
        <PageTransition direction="right" delay={100}>
          <section id="charts" className="bg-white dark:bg-background-dark py-16">
            <DemoCharts />
          </section>
        </PageTransition>
        
        <SectionDivider label="ABOUT US" />
        
        <PageTransition direction="left" delay={150}>
          <section id="team" className="bg-white dark:bg-background-dark py-16">
            <TeamSection />
          </section>
        </PageTransition>
        
        <Suspense fallback={<LoadingFallback />}>
          <SectionDivider />
          
          <PageTransition direction="up">
            <section id="customers" className="bg-white dark:bg-background-dark py-16">
              <CustomerShowcase />
            </section>
          </PageTransition>
          
          <SectionDivider label="SUPPORT" />
          
          <PageTransition direction="right" delay={150}>
            <section id="faq" className="bg-white dark:bg-background-dark py-16">
              <FAQSection />
            </section>
          </PageTransition>
          
          <SectionDivider />
          
          <PageTransition direction="left" delay={150}>
            <section id="contact" className="bg-white dark:bg-background-dark py-16">
              <ClientContactForm />
            </section>
          </PageTransition>
          
          <SectionDivider label="JOIN US" />
          
          <PageTransition direction="up" delay={200}>
            <section id="waitlist" className="bg-white dark:bg-background-dark py-16">
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
