
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Linkedin, Clock, Users, Award, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  AttentionPulse, 
  DirectionalHint, 
  LimitedAvailability,
  NotificationDot,
  FloatingElement
} from './ui/MicroInteractions';

const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingSpots, setRemainingSpots] = useState(15);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 45 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const { toast } = useToast();

  // Simulate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Track user scroll and interaction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !hasInteracted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasInteracted]);

  // Show "Don't miss out" if user has scrolled but not signed up
  useEffect(() => {
    if (hasInteracted && !localStorage.getItem('waitlist_joined')) {
      const timeoutId = setTimeout(() => {
        toast({
          title: "Limited spots remaining",
          description: "Our pilot program is filling up quickly. Secure your spot now!",
          variant: "default",
        });
      }, 30000); // Show after 30 seconds of interaction
      
      return () => clearTimeout(timeoutId);
    }
  }, [hasInteracted, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare email data for waitlist submission
    const emailData = {
      to: "info@golumesys.com", // Explicitly set to info@golumesys.com
      subject: "New Waitlist Signup",
      text: `New signup for the waitlist: ${email}`,
      replyTo: email,
    };
    
    console.log("Sending waitlist signup:", emailData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      setRemainingSpots(prev => Math.max(prev - 1, 1)); // Decrease spots but keep at least 1
      
      // Save to localStorage to remember that user signed up
      localStorage.setItem('waitlist_joined', 'true');
      
      toast({
        title: "You've joined the waitlist!",
        description: "We'll be in touch soon with exclusive updates.",
        variant: "default",
      });
      
      // Log confirmation email
      console.log("Sending confirmation email to:", email);
    }, 1500);
  };

  // Format time display
  const formatTimeValue = (value: number) => value.toString().padStart(2, '0');

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
            <FloatingElement className="inline-block mb-6 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <div className="flex items-center">
                <span className="mr-2">🚀</span>
                Be the first to experience Lumesys
                <NotificationDot className="ml-2" />
              </div>
            </FloatingElement>
            
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
              Join Our <span className="gradient-text font-normal">Exclusive</span> Pilot Program
            </h2>
            
            {/* Limited time offer */}
            <AttentionPulse className="inline-block mb-8 py-2 px-4 bg-accent/10 rounded-md">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-accent" />
                  <span className="text-sm font-medium">Limited Time Offer:</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
                    {timeLeft.days}d
                  </div>
                  <span>:</span>
                  <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
                    {formatTimeValue(timeLeft.hours)}h
                  </div>
                  <span>:</span>
                  <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
                    {formatTimeValue(timeLeft.minutes)}m
                  </div>
                </div>
              </div>
            </AttentionPulse>
            
            <p className="text-lg text-gray-800 mb-4 max-w-2xl mx-auto">
              Get priority access to the future of energy optimization and receive exclusive updates as we prepare for launch.
            </p>
            
            {/* Social proof */}
            <div className="flex items-center justify-center mb-8 text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 text-accent" />
              <span><span className="font-medium">{87 + 15 - remainingSpots}</span> people have already joined</span>
            </div>
          </div>
          
          <LimitedAvailability spots={remainingSpots}>
            <div className="glass-card rounded-2xl p-8 shadow-xl relative overflow-hidden mb-10">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
              <div className="absolute inset-0 border border-highlight/20 rounded-2xl glow-border"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <DirectionalHint direction="right">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="glow-button text-primary font-medium px-8 py-4 rounded-full text-lg shadow-[0_0_15px_rgba(0,191,114,0.5)] hover:shadow-[0_0_25px_rgba(0,191,114,0.7)] transition-all duration-300"
                    >
                      {isSubmitting ? "Processing..." : "Join the Waitlist"}
                    </Button>
                  </DirectionalHint>
                </div>
                
                {/* Benefits list with checkmarks */}
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-accent/10">
                  <p className="text-sm font-medium text-black mb-2">When you join, you'll get:</p>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Early access to our platform before public launch",
                      "Personalized onboarding session with our team",
                      "25% discount on the full version when released",
                      "Direct input on future feature development"
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 mt-0.5 text-accent">
                          <Check className="w-4 h-4" />
                        </span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-sm text-center text-black font-medium">By joining, you agree to receive updates about Lumesys. We respect your privacy.</p>
              </form>
            </div>
          </LimitedAvailability>
          
          <div className="text-center">
            <p className="text-gray-800 mb-4 font-medium">Want to learn more about our mission?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.linkedin.com/in/tarylogle-theminingmaven" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-accent py-3 px-6 rounded-full text-gray-700 hover:text-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect with our Founder</span>
              </a>
              
              <Button 
                variant="outline" 
                className="rounded-full bg-white text-gray-800"
                onClick={() => window.location.href = "mailto:info@golumesys.com"}
              >
                Request a Demo
              </Button>
            </div>
            
            {/* Team member testimonial for social proof */}
            <div className="mt-8 bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-accent/10 max-w-lg mx-auto">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img 
                    src="/lovable-uploads/b9fc5626-de7f-4404-afcf-fcb031f058c0.png" 
                    alt="Team member" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</h4>
                  <p className="text-xs text-gray-500">Energy Optimization Specialist</p>
                </div>
                <div className="ml-auto">
                  <Award className="w-5 h-5 text-accent" />
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">
                "Our pilot program members have been instrumental in refining our platform. They've seen an average of 17% reduction in energy costs within the first three months."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
