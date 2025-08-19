export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://kuzikuu.github.io/toadgang';
  return Response.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    baseBuilder: {
      allowedAddresses: [] // Add your allowed addresses here if needed
    },
    frame: {
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Purple Pond',
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON || 'https://kuzikuu.github.io/toadgang/purplepond.png',
      homeUrl: URL,
      imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || 'https://kuzikuu.github.io/toadgang/purplepond.png',
      buttonTitle: 'Launch App',
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Interactive lily pad interface for Toad Gang Zora community members',
      primaryCategory: 'social',
      tags: ['zora', 'toadgang', 'community', 'nft']
    }
  });
}
