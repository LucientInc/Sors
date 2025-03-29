import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.statically.io',
        port: '',
        pathname: '/gh/BrunoV7/images/main/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
