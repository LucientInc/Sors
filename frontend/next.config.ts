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
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://192.168.0.106:3000'
  ]
};

export default nextConfig;
