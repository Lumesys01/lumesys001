
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from './ui/button';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  image: string;
  quote: string;
  rating: number;
}

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Mercer",
      company: "EnergyCorp Inc.",
      position: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      quote: "Lumesys has revolutionized our energy management strategy, reducing our operational costs by 22% in just three months. The AI-powered insights are nothing short of transformative.",
      rating: 5
    },
    {
      id: 2,
      name: "Sophia Chen",
      company: "TechFusion Global",
      position: "Head of Operations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
      quote: "The anomaly detection system flagged an issue that would have cost us millions. Lumesys paid for itself within the first month of implementation.",
      rating: 5
    },
    {
      id: 3,
      name: "Marcus Johnson",
      company: "IndustrialNow",
      position: "Sustainability Director",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      quote: "The centralized dashboard gives us complete visibility across all our facilities. We're now able to implement energy-saving strategies with pinpoint precision.",
      rating: 4
    }
  ];
  
  // Auto-advance testimonials
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume auto-advance after 10 seconds
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume auto-advance after 10 seconds
  };

  return (
    <section className="section-padding relative bg-darkblue py-24">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-neonpurple/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            What Our <span className="gradient-text font-normal">Clients</span> Say
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover how Lumesys is transforming energy management across industries.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial card with parallax effect */}
          <div 
            className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="absolute inset-0 bg-glow-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
            
            {/* Quote design element */}
            <div className="absolute top-6 left-6 text-9xl text-accent/10 font-serif">"</div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              {/* Profile image */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-highlight/30 glow-border">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-3">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-highlight fill-highlight" />
                  ))}
                  {[...Array(5 - testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i + testimonials[activeIndex].rating} className="w-5 h-5 text-white/20" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-white/90 italic mb-6">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div>
                  <h4 className="text-xl font-medium gradient-text">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-white/70">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-surface/20 backdrop-blur-sm hover:bg-surface/40"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {/* Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-highlight scale-125' : 'bg-white/30'
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 10000);
                  }}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-surface/20 backdrop-blur-sm hover:bg-surface/40"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Company logos */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <p className="text-center text-white/50 text-sm mb-10">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-16 items-center opacity-70">
            {/* Placeholder company logos - replace with actual client logos */}
            <div className="w-32 h-12 bg-white/10 rounded-md flex items-center justify-center text-white/30">
              Company A
            </div>
            <div className="w-32 h-12 bg-white/10 rounded-md flex items-center justify-center text-white/30">
              Company B
            </div>
            <div className="w-32 h-12 bg-white/10 rounded-md flex items-center justify-center text-white/30">
              Company C
            </div>
            <div className="w-32 h-12 bg-white/10 rounded-md flex items-center justify-center text-white/30">
              Company D
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
