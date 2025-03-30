
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BuildingDashboard from './BuildingDashboard';

interface DashboardSlide {
  src?: string;
  alt?: string;
  caption: string;
  isInteractive?: boolean;
}

interface DashboardCarouselProps {
  slides: DashboardSlide[];
  buildingData: Record<string, any>;
}

const DashboardCarousel: React.FC<DashboardCarouselProps> = ({ slides, buildingData }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <div className="relative aspect-[16/9] bg-black">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${activeSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {slide.isInteractive ? (
              <BuildingDashboard buildingData={buildingData} />
            ) : (
              <>
                <img 
                  src={slide.src} 
                  alt={slide.alt || slide.caption} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm md:text-base">{slide.caption}</p>
                </div>
              </>
            )}
          </div>
        ))}
        
        <button 
          onClick={prevSlide} 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button 
          onClick={nextSlide} 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === index ? 'bg-highlight w-6' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardCarousel;
