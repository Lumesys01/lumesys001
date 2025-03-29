
import React from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';

const VideoShowcase: React.FC = () => {
  // State to track if the video is playing in the modal
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  // Function to handle opening the video modal
  const openVideoModal = () => {
    setIsVideoPlaying(true);
  };

  // Function to handle closing the video modal
  const closeVideoModal = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className="relative py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light mb-4 text-black">
            See <span className="gradient-text font-normal">Lumesys</span> in Action
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Get a glimpse into our powerful energy management dashboard and discover how our platform can transform your operations.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl group">
            {/* Video thumbnail with overlay */}
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
              {/* Video thumbnail images in a grid */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-1 gap-1">
                <div className="relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/9f0aac31-e231-48e8-925e-2ad8c7249407.png" 
                    alt="Lumesys Dashboard" 
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="grid grid-rows-2 gap-1">
                  <div className="relative overflow-hidden">
                    <img 
                      src="/lovable-uploads/b9fc5626-de7f-4404-afcf-fcb031f058c0.png" 
                      alt="Lumesys Statistics" 
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden">
                    <img 
                      src="/lovable-uploads/44afb2a2-5b6d-4a11-8690-39da443709f4.png" 
                      alt="Lumesys Reports" 
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
              
              {/* Play button overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300"
                onClick={openVideoModal}
              >
                <Button 
                  className="rounded-full w-20 h-20 bg-white/90 hover:bg-white text-accent hover:text-highlight flex items-center justify-center transition-all group-hover:scale-110 duration-300 shadow-lg"
                  aria-label="Play demo video"
                >
                  <Play className="h-8 w-8 ml-1" fill="currentColor" />
                </Button>
              </div>
            </div>
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white text-xl md:text-2xl font-medium">Lumesys Energy Management Dashboard</h3>
              <p className="text-white/80 text-sm md:text-base">Discover how our AI-powered analytics drive real energy savings</p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-black/60">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 inline-block rounded-full bg-accent"></span>
              Real-time Monitoring
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 inline-block rounded-full bg-highlight"></span>
              Energy Analytics 
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 inline-block rounded-full bg-secondary"></span>
              Cost Optimization
            </span>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={closeVideoModal}>
          <div className="relative w-full max-w-6xl p-4">
            <button 
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-highlight"
              aria-label="Close video"
            >
              Close ✕
            </button>
            <div className="relative aspect-video bg-black">
              {/* This is where the actual video would be embedded */}
              <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/placeholder?autoplay=1" 
                  title="Lumesys Platform Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoShowcase;
