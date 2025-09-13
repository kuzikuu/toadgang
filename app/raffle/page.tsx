'use client';

import { useEffect } from 'react';

export default function RafflePage() {
  useEffect(() => {
    // Test multiple URLs to find what works
    const testUrls = [
      'https://raffle.toadgang.art/',
      'http://raffle.toadgang.art/',
      'http://161.153.9.61:80/',
      'http://161.153.9.61:3001/'
    ];
    
    let currentIndex = 0;
    
    const tryNextUrl = () => {
      if (currentIndex < testUrls.length) {
        const url = testUrls[currentIndex];
        console.log(`Trying URL: ${url}`);
        
        fetch(url, { mode: 'no-cors' })
          .then(() => {
            console.log(`Success with: ${url}`);
            window.location.href = url;
          })
          .catch(() => {
            console.log(`Failed: ${url}`);
            currentIndex++;
            setTimeout(tryNextUrl, 1000);
          });
      } else {
        console.log('All URLs failed, staying on redirect page');
      }
    };
    
    tryNextUrl();
  }, []);

  return (
    <div className="min-h-screen bg-purple-950 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold mb-2">Redirecting to Raffle Bot...</h1>
        <p className="text-fuchsia-200">Taking you to the LilyToby Raffle Bot</p>
        <p className="text-sm text-fuchsia-300 mt-4">
          Testing multiple URLs... Check browser console for details.
          <br />
          <a href="https://raffle.toadgang.art/" className="underline hover:text-fuchsia-100 mr-2" target="_blank">HTTPS Subdomain</a>
          <a href="http://raffle.toadgang.art/" className="underline hover:text-fuchsia-100 mr-2" target="_blank">HTTP Subdomain</a>
          <a href="http://161.153.9.61:80/" className="underline hover:text-fuchsia-100 mr-2" target="_blank">IP:80</a>
          <a href="http://161.153.9.61:3001/" className="underline hover:text-fuchsia-100" target="_blank">IP:3001</a>
        </p>
      </div>
    </div>
  );
}
