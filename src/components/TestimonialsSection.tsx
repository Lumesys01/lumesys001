import React, { useState, useEffect, useCallback } from 'react';
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
  
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, [testimonials.length]);
  
  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  return (
    <section className="section-padding relative bg-white py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-light mb-4 text-black">
          What Our <span className="gradient-text font-normal">Clients</span> Say
        </h2>
        <p className="text-lg text-black/70 max-w-2xl mx-auto mb-16">
          Discover how Lumesys is transforming energy management across industries.
        </p>
        
        <div className="max-w-4xl mx-auto relative">
          <div 
            className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden group bg-white shadow-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="absolute top-6 left-6 text-9xl text-accent/10 font-serif">"</div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-highlight/30">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-3">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-highlight fill-highlight" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-black mb-6">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div>
                  <h4 className="text-xl font-medium text-black">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-black/70">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white hover:bg-gray-50"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2" role="navigation" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-highlight scale-125' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 10000);
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white hover:bg-gray-50"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="mt-20 pt-16 border-t border-black/10">
          <p className="text-center text-black/70 text-sm mb-10 uppercase tracking-wider font-medium">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-16 items-center">
            {['Company A', 'Company B', 'Company C', 'Company D'].map((company, index) => (
              <div 
                key={index}
                className="w-32 h-12 bg-gray-50 rounded-md flex items-center justify-center text-black/70 border border-gray-200"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
