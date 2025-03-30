
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Home, ChevronUp, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ui/ThemeToggle";
import { SearchDialog } from "./SearchDialog";

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
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
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

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Header height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navigationLinks = [
    { name: "Home", id: "", icon: <Home size={18} /> },
    { name: "Features", id: "features" },
    { name: "Charts", id: "charts" },
    { name: "Why Lumesys", id: "why" },
    { name: "Join Waitlist", id: "waitlist" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg shadow-lg' : 'bg-white dark:bg-background-dark'
      }`}>
        <div 
          className="h-0.5 bg-gradient-to-r from-accent to-highlight absolute bottom-0 left-0 transition-all" 
          style={{ width: `${scrollProgress}%` }}
        />
        
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={() => scrollToTop()}>
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
            {navigationLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => link.id ? scrollToSection(link.id) : scrollToTop()}
                className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
              >
                {link.icon}
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle variant="switch" />
            <Button 
              variant="outline" 
              className="glow-border bg-transparent backdrop-blur-sm text-black dark:text-white"
              onClick={() => scrollToSection("contact")}
            >
              Learn More
            </Button>
            <SearchDialog />
          </div>

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

        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg animate-fade-in">
            <div className="flex flex-col space-y-4 px-6 py-8">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => link.id ? scrollToSection(link.id) : scrollToTop()}
                  className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white py-2 transition-colors flex items-center gap-2 text-left"
                >
                  {link.icon}
                  {link.name}
                </button>
              ))}
              <div className="pt-4 flex items-center">
                <Button 
                  variant="outline" 
                  className="glow-border bg-transparent backdrop-blur-sm text-black dark:text-white w-full"
                  onClick={() => scrollToSection("contact")}
                >
                  Learn More
                </Button>
                <SearchDialog />
              </div>
            </div>
          </div>
        )}
      </nav>

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
