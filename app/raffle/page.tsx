'use client';

import { useEffect } from 'react';

export default function RafflePage() {
  useEffect(() => {
    // Try the subdomain first, fallback to IP if needed
    const raffleUrl = 'https://raffle.toadgang.art/';
    const fallbackUrl = 'http://161.153.9.61:80/';
    
    // Test if subdomain is accessible
    fetch(raffleUrl, { mode: 'no-cors' })
      .then(() => {
        window.location.href = raffleUrl;
      })
      .catch(() => {
        console.log('Subdomain not accessible, using fallback');
        window.location.href = fallbackUrl;
      });
  }, []);

  return (
    <div className="min-h-screen bg-purple-950 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold mb-2">Redirecting to Raffle Bot...</h1>
        <p className="text-fuchsia-200">Taking you to the LilyToby Raffle Bot</p>
        <p className="text-sm text-fuchsia-300 mt-4">
          If you're not redirected automatically,{' '}
          <a 
            href="https://raffle.toadgang.art/" 
            className="underline hover:text-fuchsia-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            try subdomain
          </a>
          {' '}or{' '}
          <a 
            href="http://161.153.9.61:80/" 
            className="underline hover:text-fuchsia-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            direct IP
          </a>
        </p>
      </div>
    </div>
  );
}
