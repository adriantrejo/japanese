/** @type {import('next').NextConfig} */
const nextConfig = {
  // For GitHub Pages (NOW)
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/japanese' : '',
  images: {
    unoptimized: true,
  },
  
  // i18n config (for future with SSR)
  // When you have backend, remove 'output: export' and enable:
  // i18n: {
  //   locales: ['en', 'es', 'ja'],
  //   defaultLocale: 'en',
  // },
}

module.exports = nextConfig
