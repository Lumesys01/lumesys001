import React, { useState, useEffect } from "react";
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
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PageTransition from "@/components/ui/PageTransition";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize scroll position on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Register the site with search engines
    if (typeof window !== 'undefined') {
      const linkElement = document.createElement('link');
      linkElement.rel = 'canonical';
      linkElement.href = window.location.href;
      document.head.appendChild(linkElement);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
    <>
      <Helmet>
        <title>Lumesys - AI-Powered Energy Optimization Solutions | Reduce Operational Costs</title>
        <meta name="description" content="Lumesys provides AI-powered energy optimization solutions that reduce operational costs by a minimum of 10%. Transform your building's energy efficiency with our intelligent platform." />
        <link rel="canonical" href="https://www.golumesys.com" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Lumesys",
              "url": "https://www.golumesys.com",
              "logo": "https://www.golumesys.com/lovable-uploads/27f5da26-b388-4950-8f4b-3cc7bbf89a05.png",
              "description": "AI-powered energy optimization solutions that reduce operational costs by a minimum of 10%.",
              "sameAs": [
                "https://twitter.com/lumesys",
                "https://www.linkedin.com/company/lumesys",
                "https://www.facebook.com/lumesys"
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-background-dark text-black dark:text-foreground-dark">
        <Navigation />
        
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white dark:bg-background-dark">
          <div 
            className="bg-gradient-to-r from-accent to-highlight h-full transition-all duration-300 ease-out"
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
              <HowItWorksSection />
            </section>
          </PageTransition>
          
          <SectionDivider />
          
          <PageTransition direction="left" delay={100}>
            <section id="features" className="bg-white dark:bg-background-dark py-16">
              <FeaturesSection />
            </section>
          </PageTransition>
          
          <SectionDivider label="OUR WHY" />
          
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
          
          <PageTransition direction="up" delay={100}>
            <section id="waitlist" className="bg-white dark:bg-background-dark py-16">
              <CTASection />
            </section>
          </PageTransition>
        </main>

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
    </>
  );
};

export default Index;
