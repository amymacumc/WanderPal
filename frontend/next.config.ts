import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://cataas.com/cat')],
  },

  async rewrites() {
    return [
      {
        source: '/user/:path*',
        destination: 'http://localhost:8000/user/:path*',
      },
      {
        source: '/chat',
        destination: 'http://localhost:8000/chat',
      },
      {
        source: '/history',
        destination: 'http://localhost:8000/history',
      },
      {
        source: '/plan/detail',
        destination: 'http://localhost:8000/plan/detail'
      },
      {
        source: '/plan/list',
        destination: 'http://localhost:8000/plan/list'
      },
      {
        source: '/plan/save',
        destination: 'http://localhost:8000/plan/save'
      }
    ];
  },
};

export default nextConfig;
