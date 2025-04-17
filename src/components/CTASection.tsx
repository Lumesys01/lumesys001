
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Linkedin, Clock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  AttentionPulse, 
  DirectionalHint, 
  FloatingElement
} from './ui/MicroInteractions';
import WaitlistForm from './WaitlistForm';

const CTASection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 0, minutes: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const { toast } = useToast();

  // Set the countdown based on a real 30-day period from now
  useEffect(() => {
    // Set end date to 30 days from when the site goes live
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Time's up
        return { days: 0, hours: 0, minutes: 0 };
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      return { days, hours, minutes };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every minute
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !hasInteracted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasInteracted]);

  useEffect(() => {
    if (hasInteracted && !localStorage.getItem('waitlist_joined')) {
      const timeoutId = setTimeout(() => {
        toast({
          title: "Limited time offer",
          description: "Our pilot program is now open for registration!",
          variant: "default",
        });
      }, 30000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [hasInteracted, toast]);

  const formatTimeValue = (value: number) => value.toString().padStart(2, '0');

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-white to-highlight/10 animate-gradient-flow bg-[length:200%_200%]"></div>
      
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-accent/20 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-highlight/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
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
              </div>
            </FloatingElement>
            
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
              Join Our <span className="gradient-text font-normal">Exclusive</span> Pilot Program
            </h2>
            
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
            
            <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
              Get priority access to the future of energy optimization and receive exclusive updates as we prepare for launch.
            </p>
            
            <div className="mb-6 p-3 bg-accent/10 rounded-lg inline-block">
              <p className="text-sm md:text-base font-medium text-accent">
                We are committed to advancing the Just Energy Transition
              </p>
            </div>
          </div>
          
          <WaitlistForm />
          
          <div className="text-center">
            <p className="text-gray-800 mb-4 font-medium">Want to learn more about our mission?</p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
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
            
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Response time: Within 24 hours during business days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
