import React, { useState } from 'react';
import { Button } from './ui/button';
import { Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      
      toast({
        title: "You've joined the waitlist!",
        description: "We'll be in touch soon with exclusive updates.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Enhanced glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-white to-highlight/10 animate-gradient-flow bg-[length:200%_200%]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-accent/20 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-highlight/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating energy particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-highlight opacity-70 animate-pulse-glow"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2}px)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium animate-float">
              <span className="mr-2">🚀</span>
              Be the first to experience Lumesys
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
              Join Our <span className="gradient-text font-normal">Exclusive</span> Pilot Program
            </h2>
            <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
              Get priority access to the future of energy optimization and receive exclusive updates as we prepare for launch.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 shadow-xl relative overflow-hidden mb-10">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
            <div className="absolute inset-0 border border-highlight/20 rounded-2xl glow-border"></div>
            
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="glow-button text-primary font-medium px-8 py-4 rounded-full text-lg shadow-[0_0_15px_rgba(0,191,114,0.5)] hover:shadow-[0_0_25px_rgba(0,191,114,0.7)] transition-all duration-300"
                >
                  {isSubmitting ? "Processing..." : "Join the Waitlist"}
                </Button>
              </div>
              
              <p className="text-sm text-center text-gray-700">By joining, you agree to receive updates about Lumesys. We respect your privacy.</p>
            </form>
          </div>
          
          <div className="text-center">
            <p className="text-gray-800 mb-4 font-medium">Want to learn more about our mission?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-accent py-3 px-6 rounded-full text-gray-700 hover:text-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect with our Founder</span>
              </a>
              
              <Button variant="outline" className="rounded-full bg-white text-gray-800">
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
