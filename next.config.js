const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
      },
      {
        hostname: 'uykefkymhklgwfhqqskt.supabase.co',
      },
    ],
  },
};

module.exports = withContentlayer(nextConfig);
