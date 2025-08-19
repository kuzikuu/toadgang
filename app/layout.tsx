import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MiniKitContextProvider } from '@/providers/MiniKitProvider';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://kuzikuu.github.io/toadgang';
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
        version: 'next',
        imageUrl: 'https://kuzikuu.github.io/toadgang/purplepond.png',
        button: {
          title: 'Launch Purple Pond',
          action: {
            type: 'launch_frame',
            name: 'Purple Pond',
            url: URL,
            splashImageUrl: 'https://kuzikuu.github.io/toadgang/purplepond.png',
            splashBackgroundColor: '#581c87',
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
