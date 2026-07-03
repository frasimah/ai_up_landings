/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactCompiler: true,
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [768, 1024, 1280, 1440, 1920, 2048],
    imageSizes: [16, 24, 28, 32, 40, 48, 56, 64, 96, 128, 256, 384, 450, 640],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.ai-up.ru',
        pathname: '/uploads/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/knowledge',
        destination: '/knowledge-base',
        permanent: true,
      },
      {
        source: '/knowledge/:sectionSlug',
        destination: '/knowledge-base/:sectionSlug',
        permanent: true,
      },
      {
        source: '/knowledge/:sectionSlug/:articleSlug',
        destination: '/knowledge-base/:sectionSlug/:articleSlug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
