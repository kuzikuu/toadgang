import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MiniKitContextProvider } from '@/providers/MiniKitProvider';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://kuzikuu.github.io/toadgang';
  return {
    title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Purple Pond - Toad Gang Zora Community',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Interactive lily pad interface for Toad Gang Zora community members',
    openGraph: {
      title: process.env.NEXT_PUBLIC_APP_OG_TITLE || 'Purple Pond - Toad Gang Zora Community',
      description: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION || 'Interactive lily pad interface for Toad Gang Zora community members. Discover and connect with NFT creators and community members through an engaging, animated pond experience.',
      url: URL,
      siteName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Purple Pond',
      images: [
        {
          url: process.env.NEXT_PUBLIC_APP_OG_IMAGE || 'https://kuzikuu.github.io/toadgang/purplepond.png',
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
      title: process.env.NEXT_PUBLIC_APP_OG_TITLE || 'Purple Pond - Toad Gang Zora Community',
      description: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION || 'Interactive lily pad interface for Toad Gang Zora community members',
      images: [process.env.NEXT_PUBLIC_APP_OG_IMAGE || 'https://kuzikuu.github.io/toadgang/purplepond.png'],
    },
    other: {
      'fc:frame': JSON.stringify({
        version: 'next',
        imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || 'https://kuzikuu.github.io/toadgang/purplepond.png',
        button: {
          title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Purple Pond'}`,
          action: {
            type: 'launch_frame',
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Purple Pond',
            url: URL,
            splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE || 'https://kuzikuu.github.io/toadgang/purplepond.png',
            splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || '#581c87',
          },
        },
      }),
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
      <body className={inter.className}>
        <MiniKitContextProvider>
          {children}
        </MiniKitContextProvider>
      </body>
    </html>
  );
}
