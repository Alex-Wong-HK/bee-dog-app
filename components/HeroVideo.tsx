'use client';

import { useState, useRef } from 'react';

export default function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    // Reset to poster when paused
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      // Force poster to show by reloading the video
      videoRef.current.load();
    }
  };

  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative w-64 md:w-80 lg:w-96 rounded-3xl overflow-hidden shadow-2xl group">
        {/* Video with custom styling */}
        <video
          ref={videoRef}
          className="w-full h-auto object-cover focus:outline-none"
          controls
          poster="/bee-dog.webp"
          preload="metadata"
          onPlay={handlePlay}
          onPause={handlePause}
        >
          <source src="/beedog.mp4" type="video/mp4" />
          <source src="/beedog.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Custom play button overlay - shows when paused */}
        <div className={`video-overlay absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        } group-hover:opacity-0 group-focus-within:opacity-0`}>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-6 shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Video title overlay - shows when paused */}
        <div className={`video-overlay absolute bottom-4 left-4 right-4 text-white pointer-events-none transition-all duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        } group-hover:opacity-0 group-focus-within:opacity-0`}>
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
            <p className="font-semibold text-lg mb-1">它因为一个表情爆红网络</p>
            <p className="text-sm opacity-90">Because of an emoji that went viral on the Internet</p>
          </div>
        </div>
      </div>
    </div>
  );
} 