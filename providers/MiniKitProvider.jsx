'use client';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'wagmi/chains';

export function MiniKitContextProvider({ children }) {
  return (
    <MiniKitProvider 
      apiKey={import.meta.env.VITE_ONCHAINKIT_API_KEY} 
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'snake', 
          name: import.meta.env.VITE_ONCHAINKIT_PROJECT_NAME || 'Purple Pond',
          logo: import.meta.env.VITE_APP_ICON || 'https://kuzikuu.github.io/toadgang/lily.png',
        },
      }}
    >
      {children}
    </MiniKitProvider>
  );
}
