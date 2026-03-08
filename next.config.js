/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'newsapi.org',
      },
      {
        protocol: 'https',
        hostname: '**.newsapi.org',
      },
    ],
  },
};

module.exports = nextConfig;
