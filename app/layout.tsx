import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MiniKitContextProvider } from '@/providers/MiniKitProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Purple Pond - Toad Gang Zora Community',
  description: 'Interactive lily pad interface for Toad Gang Zora community members',
  openGraph: {
    title: 'Purple Pond - Toad Gang Zora Community',
    description: 'Interactive lily pad interface for Toad Gang Zora community members. Discover and connect with NFT creators and community members through an engaging, animated pond experience.',
    url: 'https://kuzikuu.github.io/toadgang',
    siteName: 'Purple Pond',
    images: [
      {
        url: 'https://kuzikuu.github.io/toadgang/purplepond.png',
        width: 1200,
        height: 630,
        alt: 'Purple Pond - Toad Gang Zora Community',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purple Pond - Toad Gang Zora Community',
    description: 'Interactive lily pad interface for Toad Gang Zora community members',
    images: ['https://kuzikuu.github.io/toadgang/purplepond.png'],
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'vNext',
      imageUrl: 'https://kuzikuu.github.io/toadgang/purplepond.png',
      button: {
        title: 'Launch Purple Pond',
        action: {
          type: 'launch_frame',
          name: 'Purple Pond',
          url: 'https://kuzikuu.github.io/toadgang',
          splashImageUrl: 'https://kuzikuu.github.io/toadgang/purplepond.png',
          splashBackgroundColor: '#581c87',
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MiniKitContextProvider>
          {children}
        </MiniKitContextProvider>
      </body>
    </html>
  );
}
