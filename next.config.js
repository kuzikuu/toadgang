/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['kuzikuu.github.io'],
  },
  async headers() {
    return [
      {
        source: '/.well-known/farcaster.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
