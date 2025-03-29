import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail, Github } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Security", "Updates"],
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
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "GitHub", icon: Github, url: "#" },
    { name: "Email", icon: Mail, url: "mailto:info@lumesys.ai" },
  ];

  return (
    <footer className="bg-darkblue py-16 px-6">
      <div className="max-w-7xl mx-auto">
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
                <span>SYS</span>
              </div>
            </Link>
            <p className="text-white/60 max-w-xs">
              AI-powered energy management solutions for the modern enterprise.
            </p>

            <div className="flex mt-6 space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a 
                    key={link.name}
                    href={link.url}
                    className="text-white/60 hover:text-white transition-colors"
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
                <h3 className="font-medium mb-4 text-white/90">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-white/60 hover:text-white transition-colors"
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
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 Lumesys AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="mailto:contact@lumesys.ai" className="text-white/60 hover:text-white transition-colors">
              contact@lumesys.ai
            </a>
            <Link to="/privacy-policy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/60 hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
