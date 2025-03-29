
import { Link } from "react-router-dom";

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
      links: ["Privacy", "Terms", "Security", "Cookies"],
    },
  ];

  return (
    <footer className="bg-darkblue py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between mb-12">
          <div className="mb-10 lg:mb-0">
            <Link to="/" className="text-2xl font-medium flex items-center mb-4">
              <span className="gradient-text mr-2">LUME</span>
              <span>SYS</span>
            </Link>
            <p className="text-white/60 max-w-xs">
              AI-powered energy management solutions for the modern enterprise.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-medium mb-4 text-white/90">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        to={`/${link.toLowerCase()}`}
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
            <Link to="#" className="text-white/60 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link to="#" className="text-white/60 hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link to="#" className="text-white/60 hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
