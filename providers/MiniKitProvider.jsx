'use client';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'wagmi/chains';

export function MiniKitContextProvider({ children }) {
  return (
    <MiniKitProvider 
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} 
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'snake', 
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Purple Pond',
          logo: process.env.NEXT_PUBLIC_APP_ICON || 'https://kuzikuu.github.io/toadgang/lily.png',
        },
      }}
    >
      {children}
    </MiniKitProvider>
  );
}
