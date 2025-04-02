
import { Link } from "react-router-dom";
import { Linkedin, Mail, Shield, Award, CheckCircle, ThumbsUp } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Security", "Updates"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Press"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Help Center", "Contact", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Security", "Cookies"],
    },
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "Email", icon: Mail, url: "mailto:info@golumesys.com" },
  ];
  
  const trustBadges = [
    { name: "ISO 27001 Certified", icon: Shield },
    { name: "Energy Star Partner", icon: Award },
    { name: "LEED Accredited", icon: CheckCircle },
    { name: "Customer Satisfaction 98%", icon: ThumbsUp },
  ];

  return (
    <footer className="bg-white py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Tagline banner - Added at the top of footer */}
        <div className="mb-12 py-4 text-center">
          <div className="inline-block px-6 py-3 bg-green-50 rounded-full text-green-700 font-medium">
            Powering Efficiency, Leading Sustainability
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between mb-12">
          <div className="mb-10 lg:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/27f5da26-b388-4950-8f4b-3cc7bbf89a05.png" 
                alt="Lumesys Logo" 
                className="h-10 w-10 mr-2" 
              />
              <div className="text-2xl font-medium flex items-center">
                <span className="gradient-text mr-2">LUME</span>
                <span className="text-black">SYS</span>
              </div>
            </Link>
            <p className="text-black/60 max-w-xs">
              AI-powered energy management solutions for the modern enterprise.
            </p>

            <div className="flex mt-6 space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a 
                    key={link.name}
                    href={link.url}
                    className="text-black/60 hover:text-black transition-colors"
                    aria-label={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-medium mb-4 text-black">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-black/60 hover:text-black transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust badges and credibility section */}
        <div className="py-8 border-t border-black/10">
          <h4 className="text-center text-lg font-medium mb-6">Trusted by Industry Leaders</h4>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
            {trustBadges.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={badge.name} className="flex items-center gap-2">
                  <BadgeIcon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">{badge.name}</span>
                </div>
              );
            })}
          </div>
          
          {/* Industry associations */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">U.S. Green Building Council</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">Energy Management Association</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">American Society of Heating, Refrigerating and Air-Conditioning Engineers</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">Association of Energy Engineers</span>
          </div>
        </div>
        
        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black/60 text-sm text-center md:text-left w-full md:w-auto">
            © 2025 Lumesys AI. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 w-full md:w-auto">
            <a href="mailto:info@golumesys.com" className="text-black/60 hover:text-black transition-colors">
              info@golumesys.com
            </a>
            <Link to="/privacy-policy" className="text-black/60 hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-black/60 hover:text-black transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
