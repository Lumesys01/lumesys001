
import React from 'react';
import FeatureCard from './FeatureCard';
import { Activity, AlertTriangle, BarChart3, FileSpreadsheet, Brain, Radio, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Energy Optimization",
      description: "Lumesys acts as the brain for energy management, optimizing consumption and reducing operational costs by at least 10%.",
      icon: Brain,
      popupContent: "Our proprietary AI algorithms continuously learn from your energy usage patterns to provide optimizations that lead to significant cost savings - unlike competitors' static solutions."
    },
    {
      title: "Anomaly Detection & Proactive Monitoring",
      description: "Advanced anomaly detection algorithms and centralized, multi-site remote monitoring ensure proactive maintenance.",
      icon: AlertTriangle,
      popupContent: "While others react to problems, our machine learning algorithms detect unusual patterns before they become critical issues, preventing equipment damage and energy waste."
    },
    {
      title: "Centralized Multi-Site Monitoring",
      description: "Monitor and control multiple sites remotely from a single, intuitive dashboard interface with real-time updates.",
      icon: Radio,
      popupContent: "Access all your facilities from one unified platform, enabling seamless management and comparative analytics across your entire operation - a capability few competitors offer."
    },
    {
      title: "Comprehensive Compliance Tracking",
      description: "Stay ahead of industry standards with automated compliance tracking and detailed reporting in both PDF and CSV formats.",
      icon: FileSpreadsheet,
      popupContent: "Generate custom reports for regulatory compliance in seconds, with PDF and CSV export options to streamline your reporting workflow - far more flexible than traditional systems."
    },
    {
      title: "AI-Powered Real-Time Data Analytics",
      description: "Gain deep insights with real-time analytics that help you make informed decisions to enhance operational efficiency.",
      icon: BarChart3,
      popupContent: "Our advanced AI continuously analyzes your energy data to identify patterns, predict usage, and recommend optimizations in real-time - outperforming static analysis from competitors."
    }
  ];

  return (
    <section className="section-padding relative bg-white overflow-hidden">
      {/* Background subtle accent elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[100px]" style={{ animationDuration: '15s' }}></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-highlight/5 rounded-full blur-[100px]" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            Features <span className="gradient-text font-normal">Designed</span> for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Our AI-powered platform provides comprehensive tools to transform your energy management strategy.
          </p>
          
          {/* UVP Highlight Box */}
          <div className="bg-gradient-to-r from-accent/10 to-highlight/10 p-4 md:p-6 rounded-xl max-w-3xl mx-auto mb-8 border border-accent/20">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-medium text-black mb-2">What Sets Us Apart</h3>
                <p className="text-gray-700">
                  Unlike traditional energy systems that use <span className="font-semibold">static rules and schedules</span>, 
                  Lumesys employs <span className="text-accent font-bold">proprietary AI algorithms</span> that continuously 
                  learn and adapt to your building's unique energy needs. This dynamic approach delivers 
                  <span className="text-highlight font-bold"> 48-hour implementation</span> and <span className="text-highlight font-bold">30% more savings</span> than 
                  conventional solutions.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-accent font-medium">Click on icons to learn more about each feature!</p>
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
            See How We Compare to Competitors
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
