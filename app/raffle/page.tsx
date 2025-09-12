'use client';

import { useEffect } from 'react';

export default function RafflePage() {
  useEffect(() => {
    // Redirect to the external raffle bot
    window.location.href = 'https://raffle.toadgang.art/';
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
            click here
          </a>
        </p>
      </div>
    </div>
  );
}
