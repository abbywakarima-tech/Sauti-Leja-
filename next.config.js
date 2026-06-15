/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'sw', 'sheng'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
