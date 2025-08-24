import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MiniKitContextProvider } from '../providers/MiniKitProvider';
import ErudaDebugger from '../components/ErudaDebugger';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://www.toadgang.art';
  return {
    title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Purple Pond',
    description: 'Interactive lily pad interface for Toad Gang Zora community members',
    openGraph: {
      title: 'Purple Pond - Toad Gang Zora Community',
      description: 'Interactive lily pad interface for Toad Gang Zora community members',
      url: URL,
      siteName: 'Purple Pond',
      images: [
        {
          url: 'https://www.toadgang.art/purplepond.png',
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
      images: ['https://www.toadgang.art/purplepond.png'],
    },
    other: {
      'fc:frame': 'vNext',
      'fc:frame:image': 'https://www.toadgang.art/purplepond.png',
      'fc:frame:button:1': 'Launch Purple Pond',
      'fc:frame:post_url': URL,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster Frame Meta Tags */}
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://www.toadgang.art/purplepond.png" />
        <meta name="fc:frame:button:1" content="Launch Purple Pond" />
        <meta name="fc:frame:post_url" content="https://www.toadgang.art" />
      </head>
      <body className={inter.className}>
        <MiniKitContextProvider>
          {children}
        </MiniKitContextProvider>
        <ErudaDebugger />
      </body>
    </html>
  );
}
