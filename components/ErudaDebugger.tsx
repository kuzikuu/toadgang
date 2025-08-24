'use client';

import { useEffect } from 'react';

export default function ErudaDebugger() {
  useEffect(() => {
    // Load Eruda on mobile devices (both dev and production)
    if (typeof window !== 'undefined') {
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent || navigator.vendor || (window as any).opera
      );
      
      if (isMobile) {
        console.log('📱 Mobile device detected, loading Eruda...');
        
        // Try to load Eruda from npm package first
        import('eruda').then((eruda) => {
          eruda.default.init();
          console.log('✅ Eruda loaded from npm package');
          
          // Add a visible debug button as fallback
          addDebugButton();
        }).catch((error) => {
          console.log('❌ NPM package failed, trying CDN...', error);
          
          // Fallback to CDN if npm package fails
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/eruda';
          script.onload = () => {
            if (typeof window.eruda !== 'undefined') {
              window.eruda.init();
              console.log('✅ Eruda loaded from CDN');
              addDebugButton();
            }
          };
          script.onerror = () => {
            console.log('❌ CDN failed, adding manual debug button');
            addDebugButton();
          };
          document.head.appendChild(script);
        });
      } else {
        console.log('🖥️ Desktop device detected, Eruda not needed');
      }
    }
  }, []);

  // Function to add a visible debug button
  const addDebugButton = () => {
    if (typeof window !== 'undefined' && !document.getElementById('debug-button')) {
      const button = document.createElement('button');
      button.id = 'debug-button';
      button.innerHTML = '🐛 Debug';
      button.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        background: #ff6b6b;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      `;
      
      button.onclick = () => {
        if (typeof window.eruda !== 'undefined') {
          window.eruda.show();
        } else {
          alert('Eruda not loaded. Check console for debug info.');
        }
      };
      
      document.body.appendChild(button);
    }
  };

  return null; // This component doesn't render anything
}
