
import React, { useState } from 'react';
import { Play, Pause, X, Maximize, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const VideoShowcase: React.FC = () => {
  // State to track if the video is playing in the modal
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Function to handle opening the video modal
  const openVideoModal = () => {
    setIsVideoPlaying(true);
    // Auto-play when modal opens
    setTimeout(() => {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 300);
  };

  // Function to handle closing the video modal
  const closeVideoModal = () => {
    setIsVideoPlaying(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Toggle play/pause
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Toggle mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative py-16 md:py-24 bg-white">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[150px] z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-highlight/5 rounded-full blur-[150px] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
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
                <div className="absolute inset-x-0 bottom-12 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white animate-bounce shadow-lg">
                    Click to Watch Demo
                  </div>
                </div>
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
      
      {/* Enhanced Video Modal */}
      {isVideoPlaying && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in" 
          onClick={closeVideoModal}
        >
          <div 
            className={cn(
              "relative w-full max-w-6xl p-4 transform transition-all duration-500",
              isVideoPlaying ? "scale-100 opacity-100" : "scale-95 opacity-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-highlight bg-black/50 rounded-full p-2 transition-all duration-300 hover:bg-black/70 z-20"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {/* Actual video player */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/lovable-uploads/9f0aac31-e231-48e8-925e-2ad8c7249407.png"
                onClick={togglePlayPause}
              >
                {/* Add your video source - for demonstration we'll use a placeholder */}
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video controls overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 text-white bg-gradient-to-b from-black/50 via-transparent to-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg md:text-xl font-medium drop-shadow-lg">Lumesys Energy Management Platform</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:text-highlight hover:bg-black/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          videoRef.current.requestFullscreen();
                        }
                      }
                    }}
                  >
                    <Maximize className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:text-highlight hover:bg-black/30"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:text-highlight hover:bg-black/30"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  
                  <div className="flex-grow h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-highlight w-1/3 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video details */}
            <div className="mt-4 text-white">
              <h3 className="text-xl font-medium">Lumesys Energy Management Platform Demo</h3>
              <p className="text-white/70 mt-1">See how our AI-powered platform can help you reduce energy costs by at least 10% while improving operational efficiency and sustainability.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoShowcase;
