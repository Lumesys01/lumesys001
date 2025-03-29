
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/27f5da26-b388-4950-8f4b-3cc7bbf89a05.png" 
            alt="Lumesys Logo" 
            className="h-12 w-12 mr-2" 
          />
          <div className="text-2xl font-medium flex items-center">
            <span className="gradient-text">Lumesys</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="#features" className="text-black/80 hover:text-black transition-colors">
            Features
          </Link>
          <Link to="#charts" className="text-black/80 hover:text-black transition-colors">
            Charts
          </Link>
          <Link to="#why" className="text-black/80 hover:text-black transition-colors">
            Why Lumesys
          </Link>
          <Link to="#waitlist" className="text-black/80 hover:text-black transition-colors">
            Join Waitlist
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="glow-border bg-transparent backdrop-blur-sm text-black">
            Learn More
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg">
          <div className="flex flex-col space-y-4 px-6 py-8">
            <Link 
              to="#features" 
              className="text-black/80 hover:text-black py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="#charts" 
              className="text-black/80 hover:text-black py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Charts
            </Link>
            <Link 
              to="#why" 
              className="text-black/80 hover:text-black py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Why Lumesys
            </Link>
            <Link 
              to="#waitlist" 
              className="text-black/80 hover:text-black py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Waitlist
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" className="glow-border bg-transparent backdrop-blur-sm text-black w-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
