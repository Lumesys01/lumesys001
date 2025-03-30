
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MousePointerClick } from 'lucide-react';
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
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Preload images for smoother carousel experience
  useEffect(() => {
    const imageCache: Record<number, HTMLImageElement> = {};
    
    slides.forEach((slide, index) => {
      if (slide.src) {
        const img = new Image();
        
        img.onload = () => {
          setImagesLoaded((prev) => ({...prev, [index]: true}));
          imageCache[index] = img;
        };
        
        img.onerror = () => {
          console.error(`Failed to load image: ${slide.src}`);
          setImagesLoaded((prev) => ({...prev, [index]: true}));
        };
        
        img.src = slide.src;
      } else {
        setImagesLoaded((prev) => ({...prev, [index]: true}));
      }
    });
    
    // Clean up image cache on unmount
    return () => {
      Object.keys(imageCache).forEach((key) => {
        delete imageCache[Number(key)];
      });
    };
  }, [slides]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <>
      <div className="relative aspect-[16/9] bg-black">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;
          
          return (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              aria-hidden={!isActive}
            >
              {slide.isInteractive ? (
                <>
                  <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-3">
                    <div className="flex items-center justify-center gap-2 bg-accent/20 backdrop-blur-sm py-1 px-3 rounded-full w-fit mx-auto">
                      <MousePointerClick className="w-3 h-3 text-white/90" />
                      <p className="text-white text-xs">Interactive Dashboard - Select Building Above</p>
                    </div>
                  </div>
                  <BuildingDashboard buildingData={buildingData} />
                </>
              ) : slide.src ? (
                <>
                  <img 
                    src={slide.src} 
                    alt={slide.alt || slide.caption} 
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    onError={(e) => {
                      console.error(`Failed to load image: ${slide.src}`);
                      e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm md:text-base">{slide.caption}</p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <p className="text-white">No image available</p>
                </div>
              )}
            </div>
          );
        })}
        
        <button 
          onClick={prevSlide} 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all hover:scale-105 border border-white/20 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button 
          onClick={nextSlide} 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all hover:scale-105 border border-white/20 z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`transition-all ${
              activeSlide === index 
                ? 'bg-highlight w-8 h-2 shadow-md shadow-highlight/30 glow-border' 
                : 'bg-gray-300/40 w-2 h-2'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeSlide === index ? 'true' : 'false'}
            title={slide.isInteractive ? "Interactive Dashboard" : slide.caption}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardCarousel;
