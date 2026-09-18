import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['ds-scnewq70--3000.us-east-2.prod.proxy.devspaces.amazon.dev'],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
