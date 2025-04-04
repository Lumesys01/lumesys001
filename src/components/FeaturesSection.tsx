
import React from 'react';
import FeatureCard from './FeatureCard';
import { Activity, AlertTriangle, BarChart3, FileSpreadsheet, Brain, Radio } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Energy Optimization",
      description: "Lumesys acts as the brain for energy management, optimizing consumption and reducing operational costs by at least 10%.",
      icon: Brain,
      popupContent: "Our AI continuously learns from your energy usage patterns to provide optimizations that lead to significant cost savings."
    },
    {
      title: "Anomaly Detection & Proactive Monitoring",
      description: "Advanced anomaly detection algorithms and centralized, multi-site remote monitoring ensure proactive maintenance.",
      icon: AlertTriangle,
      popupContent: "Machine learning algorithms detect unusual patterns before they become critical issues, preventing equipment damage and energy waste."
    },
    {
      title: "Centralized Multi-Site Monitoring",
      description: "Monitor and control multiple sites remotely from a single, intuitive dashboard interface with real-time updates.",
      icon: Radio,
      popupContent: "Access all your facilities from one unified platform, enabling seamless management and comparative analytics across your entire operation."
    },
    {
      title: "Comprehensive Compliance Tracking",
      description: "Stay ahead of industry standards with automated compliance tracking and detailed reporting in both PDF and CSV formats.",
      icon: FileSpreadsheet,
      popupContent: "Generate custom reports for regulatory compliance in seconds, with PDF and CSV export options to streamline your reporting workflow."
    },
    {
      title: "AI-Powered Real-Time Data Analytics",
      description: "Gain deep insights with real-time analytics that help you make informed decisions to enhance operational efficiency.",
      icon: BarChart3,
      popupContent: "Our advanced AI continuously analyzes your energy data to identify patterns, predict usage, and recommend optimizations in real-time."
    }
  ];

  return (
    <section className="section-padding relative bg-white overflow-hidden">
      {/* Background subtle accent elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[100px]" style={{ animationDuration: '15s' }}></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-highlight/5 rounded-full blur-[100px]" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            Features <span className="gradient-text font-normal">Designed</span> for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive tools to transform your energy management strategy.
            <span className="block mt-2 text-sm text-accent font-medium">Click on icons to learn more!</span>
          </p>
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
      </div>
      
      {/* Add a subtle decoration at the bottom */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mt-16"></div>
    </section>
  );
};

export default FeaturesSection;
