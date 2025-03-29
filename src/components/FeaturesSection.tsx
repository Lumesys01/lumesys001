
import React from 'react';
import FeatureCard from './FeatureCard';
import { Activity, AlertTriangle, BarChart3, FileSpreadsheet, Radio } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Real-time Data Analytics",
      description: "AI-powered analytics for immediate insights into energy consumption patterns and optimization opportunities.",
      icon: BarChart3,
      popupContent: "Our advanced AI continuously analyzes your energy data to identify patterns, predict usage, and recommend optimizations in real-time."
    },
    {
      title: "Anomaly Detection",
      description: "Identify unusual energy consumption patterns and potential equipment failures before they become critical.",
      icon: AlertTriangle,
      popupContent: "Machine learning algorithms detect deviations from normal energy usage, alerting you to potential issues before they lead to equipment damage or energy waste."
    },
    {
      title: "Centralized Monitoring",
      description: "Monitor and control multiple sites remotely from a single, intuitive dashboard interface.",
      icon: Radio,
      popupContent: "Access all your facilities from one unified platform, enabling seamless management and comparative analytics across your entire operation."
    },
    {
      title: "Proactive Maintenance",
      description: "Predictive insights for maintenance scheduling to prevent downtime and extend equipment life.",
      icon: Activity,
      popupContent: "AI predicts when equipment needs maintenance based on performance data, helping you schedule maintenance before failures occur and optimize resource allocation."
    },
    {
      title: "Compliance Tracking",
      description: "Comprehensive reporting tools for regulatory compliance with exportable formats.",
      icon: FileSpreadsheet,
      popupContent: "Generate custom reports for regulatory compliance in seconds, with PDF and CSV export options to streamline your reporting workflow."
    }
  ];

  return (
    <section className="section-padding relative bg-darkblue">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-neonpurple/10 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            Features <span className="gradient-text font-normal">Designed</span> for You
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive tools to transform your energy management strategy.
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
    </section>
  );
};

export default FeaturesSection;
