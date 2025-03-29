
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
      
      // Redirect to LinkedIn profile
      window.open("https://linkedin.com", "_blank");
    }, 1500);
  };

  return (
    <section className="section-padding relative animated-gradient-background">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Floating energy particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, index) => (
          <div 
            key={index}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-highlight opacity-70 animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light mb-6">
            Ready to <span className="gradient-text font-normal">Transform</span> Your Energy Management?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Stay ahead of the curve with Lumesys. Enter your email to join the waitlist and receive exclusive updates.
          </p>
          
          <form onSubmit={handleSubmit} className="glass-card rounded-full p-2 flex flex-col sm:flex-row gap-4 mb-8 max-w-xl mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address here"
              className="flex-1 bg-transparent border-none pl-6 py-3 text-white placeholder:text-white/50 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="glow-button text-primary font-medium px-6 py-3 rounded-full whitespace-nowrap"
            >
              {isSubmitting ? "Processing..." : "Submit"}
            </Button>
          </form>
          
          <div className="mt-12">
            <p className="text-white/70 mb-4">Connect with our Founder</p>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glow-border bg-surface/30 backdrop-blur-sm py-3 px-6 rounded-full text-white hover:bg-surface/50 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>
        
        {/* Interactive API demo teaser */}
        <div className="mt-16 glass-card rounded-xl p-8 relative overflow-hidden">
          <div className="glow-border absolute inset-0 opacity-20"></div>
          
          <div className="text-center">
            <h3 className="text-2xl font-light mb-2">
              <span className="gradient-text font-normal">API Integration</span> Preview
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Explore how Lumesys can integrate with your existing systems through our robust API.
            </p>
            <div className="bg-darkblue rounded-lg p-4 md:p-6 text-left overflow-x-auto max-w-2xl mx-auto shimmer">
              <pre className="text-white/90 text-sm">
                <code>{`// Sample Lumesys API call
const energyData = await lumesys.fetch({
  facility: "north-plant",
  metrics: ["consumption", "efficiency", "anomalies"],
  period: { start: "2023-12-01", end: "2023-12-31" }
});

// Output: Real-time optimization recommendations
console.log(energyData.recommendations);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
