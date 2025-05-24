"use client"

import { useEffect } from 'react';

export default function ScriptLoader() {
  useEffect(() => {
    // Add the script programmatically on the client side
    const script = document.createElement('script');
    script.src = '/js/nav-fallback.js';
    script.async = true;
    document.body.appendChild(script);

    // This runs client-side only
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
    
    // Check for touch support
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.documentElement.classList.add('touch');
    } else {
      document.documentElement.classList.add('no-touch');
    }

    return () => {
      // Cleanup if needed
      document.body.removeChild(script);
    };
  }, []);

  // Return null as this component doesn't render anything visible
  return null;
}
