/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['kuzikuu.github.io', 'www.toadgang.art'],
  },
};

module.exports = nextConfig;
