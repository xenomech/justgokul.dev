/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
      },
      {
        hostname: 'uykefkymhklgwfhqqskt.supabase.co',
      },
      {
        hostname: 'media.licdn.com',
      },
    ],
  },
};

export default nextConfig;
