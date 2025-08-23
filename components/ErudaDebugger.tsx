'use client';

import { useEffect } from 'react';

export default function ErudaDebugger() {
  useEffect(() => {
    // Only load Eruda in development and not on localhost
    if (typeof window !== 'undefined' && 
        process.env.NODE_ENV === 'development' && 
        !window.location.hostname.includes('localhost')) {
      
      // Try to load Eruda from npm package first
      import('eruda').then((eruda) => {
        eruda.default.init();
        console.log('Eruda loaded from npm package');
      }).catch(() => {
        // Fallback to CDN if npm package fails
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/eruda';
        script.onload = () => {
          if (typeof window.eruda !== 'undefined') {
            window.eruda.init();
            console.log('Eruda loaded from CDN');
          }
        };
        document.head.appendChild(script);
      });
    }
  }, []);

  return null; // This component doesn't render anything
}
