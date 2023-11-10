const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['static.justgokul.dev', 'avatars.githubusercontent.com'],
  },
};

module.exports = withContentlayer(nextConfig);
