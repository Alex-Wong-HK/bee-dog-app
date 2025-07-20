'use client';

import { useEffect } from 'react';

interface ScrollSnapProps {
  sections: string[];
  snapThreshold?: number;
}

export default function ScrollSnap({ sections, snapThreshold = 0.6 }: ScrollSnapProps) {
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // If this is the start of scrolling, add subtle feedback
      if (!isScrolling) {
        isScrolling = true;
        
        // Add subtle scroll indicator
        document.body.classList.add('scroll-indicator');
      }
      
      clearTimeout(scrollTimeout);
      
              // After a very short delay, gently guide to the correct position
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          
          // Remove scroll indicator
          document.body.classList.remove('scroll-indicator');
          
          // Find the closest section and gently guide to it
          const windowHeight = window.innerHeight;
          let targetSection = sections[0];
          let minDistance = Infinity;
          
          sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const distance = Math.abs(rect.top);
              
              if (distance < minDistance) {
                minDistance = distance;
                targetSection = sectionId;
              }
            }
          });

          // Only guide if we're not already close to the target
          const targetElement = document.getElementById(targetSection);
          if (targetElement) {
            const targetRect = targetElement.getBoundingClientRect();
            const isNearTarget = Math.abs(targetRect.top) < windowHeight * 0.6;
            
            if (!isNearTarget) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        }, 400); // Longer delay for less aggressive snapping
    };

    // Throttled scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
      document.body.classList.remove('scroll-indicator');
    };
  }, [sections, snapThreshold]);

  return null; // This component doesn't render anything
} 