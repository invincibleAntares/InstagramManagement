import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use a custom loader for Instagram images in development
    loader: process.env.NODE_ENV === 'development' ? 'custom' : 'default',
    loaderFile: process.env.NODE_ENV === 'development' ? './src/lib/imageLoader.js' : undefined,
    
    remotePatterns: [
      // Comprehensive Instagram/Facebook CDN patterns
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'instagram.**.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.**.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-**.xx.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'instagram.com',
        port: '',
        pathname: '/**',
      }
    ],
    
    // Fallback domains for specific CDN endpoints
    domains: [
      'instagram.fblr11-1.fna.fbcdn.net',
      'instagram.fblr1-1.fna.fbcdn.net', 
      'instagram.fblr1-2.fna.fbcdn.net',
      'instagram.fblr11-2.fna.fbcdn.net',
      'instagram.fblr2-1.fna.fbcdn.net',
      'instagram.fblr2-2.fna.fbcdn.net',
      'scontent.cdninstagram.com',
      'instagram.com',
      'scontent-blr1-1.xx.fbcdn.net',
      'scontent-blr1-2.xx.fbcdn.net',
      'fbcdn.net'
    ],
    
    // Image optimization settings
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
