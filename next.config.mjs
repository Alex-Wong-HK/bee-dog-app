import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:locale/game',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://www.gameflare.com; frame-ancestors 'self';"
          }
        ]
      }
    ];
  },
};

export default withNextIntl(nextConfig); 