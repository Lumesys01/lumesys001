
import React from 'react';
import FeatureCard from './FeatureCard';
import { Activity, AlertTriangle, BarChart3, FileSpreadsheet, Brain, Radio, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Forensic Analysis",
      description: "Lumesys acts as your forensic investigator, uncovering hidden energy inefficiencies and recovering operational costs.",
      icon: Brain,
      popupContent: "Our advanced AI algorithms conduct deep forensic analysis of your energy usage patterns to uncover hidden inefficiencies and opportunities for cost recovery."
    },
    {
      title: "Predictive Anomaly Detection",
      description: "Advanced forensic algorithms detect patterns of energy waste and inefficiency before they impact your bottom line.",
      icon: AlertTriangle,
      popupContent: "While others simply monitor, our forensic AI predicts and identifies unusual patterns that indicate potential energy waste or system inefficiencies."
    },
    {
      title: "Multi-Site Forensic Analysis",
      description: "Conduct comprehensive forensic investigations across multiple sites from a centralized intelligence dashboard.",
      icon: Radio,
      popupContent: "Compare forensic energy data across all your facilities to identify systemic issues and optimization opportunities others miss."
    },
    {
      title: "Forensic Evidence Tracking",
      description: "Generate detailed forensic reports with comprehensive evidence of energy inefficiencies and waste.",
      icon: FileSpreadsheet,
      popupContent: "Export detailed forensic analysis reports with evidence-backed recommendations for immediate cost recovery."
    },
    {
      title: "Real-Time Intelligence",
      description: "Get instant forensic insights that help you make informed decisions to eliminate energy waste.",
      icon: BarChart3,
      popupContent: "Our AI continuously analyzes your energy data to provide real-time forensic insights and actionable intelligence."
    }
  ];

  return (
    <section className="section-padding relative bg-white dark:bg-background-dark overflow-hidden">
      {/* Background subtle accent elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 dark:bg-accent/10 rounded-full blur-[100px]" style={{ animationDuration: '15s' }}></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-highlight/5 dark:bg-highlight/10 rounded-full blur-[100px]" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            Features <span className="gradient-text font-normal">Designed</span> for Intelligence
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Our AI-powered platform provides comprehensive forensic tools to transform your energy intelligence strategy.
          </p>
          
          {/* UVP Highlight Box */}
          <div className="bg-gradient-to-r from-accent/10 to-highlight/10 dark:from-accent/20 dark:to-highlight/20 p-4 md:p-6 rounded-xl max-w-3xl mx-auto mb-8 border border-accent/20 dark:border-accent/30">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">What Sets Us Apart</h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Unlike traditional energy monitoring systems that use <span className="font-semibold">basic analytics</span>, 
                  Lumesys employs <span className="text-accent font-bold">advanced forensic AI</span> that investigates and uncovers hidden energy inefficiencies. This forensic approach enables 
                  <span className="text-highlight font-bold"> 24-hour analysis</span> and <span className="text-highlight font-bold">up to 20% cost recovery</span> from previously undetected issues.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-accent font-medium dark:text-accent/90">Click on icons to learn more about each feature!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              popupContent={feature.popupContent}
            />
          ))}
        </div>
        
        {/* UVP Bottom Call-to-Action */}
        <div className="mt-12 text-center">
          <Button 
            className="bg-accent hover:bg-accent/90 text-white px-6 py-5 rounded-full group"
            onClick={() => {
              const dashboardSection = document.getElementById('why');
              if (dashboardSection) {
                dashboardSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            See How We Compare to Traditional Systems
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      
      {/* Add a subtle decoration at the bottom */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mt-16"></div>
    </section>
  );
};

export default FeaturesSection;
