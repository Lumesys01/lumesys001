
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Home, ChevronUp, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ui/ThemeToggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      setShowScrollTop(scrollY > 300);
      
      // Calculate scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg shadow-lg' : 'bg-white dark:bg-background-dark'
      }`}>
        {/* Scroll progress indicator */}
        <div 
          className="h-0.5 bg-gradient-to-r from-accent to-highlight absolute bottom-0 left-0 transition-all" 
          style={{ width: `${scrollProgress}%` }}
        />
        
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
            <Link to="/" className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
              <Home size={18} />
              Home
            </Link>
            <Link to="#features" className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors">
              Features
            </Link>
            <Link to="#charts" className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors">
              Charts
            </Link>
            <Link to="#why" className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors">
              Why Lumesys
            </Link>
            <Link to="#waitlist" className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors">
              Join Waitlist
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle variant="switch" />
            <Button variant="outline" className="glow-border bg-transparent backdrop-blur-sm text-black dark:text-white">
              Learn More
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
              aria-label="Search"
            >
              <Search size={20} />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-black dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu with improved animation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg animate-fade-in">
            <div className="flex flex-col space-y-4 px-6 py-8">
              <Link 
                to="/" 
                className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white py-2 transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                Home
              </Link>
              <Link 
                to="#features" 
                className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="#charts" 
                className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Charts
              </Link>
              <Link 
                to="#why" 
                className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Lumesys
              </Link>
              <Link 
                to="#waitlist" 
                className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Waitlist
              </Link>
              <div className="pt-4 flex items-center">
                <Button variant="outline" className="glow-border bg-transparent backdrop-blur-sm text-black dark:text-white w-full">
                  Learn More
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full ml-2"
                  aria-label="Search"
                >
                  <Search size={20} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Back to top button */}
      <Button
        variant="outline"
        size="icon"
        className={`fixed bottom-6 right-6 z-40 rounded-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        } transition-all duration-300`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ChevronUp size={24} />
      </Button>
    </>
  );
};

export default Navigation;
