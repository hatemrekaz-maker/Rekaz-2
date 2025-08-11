const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  workboxOptions: {
    navigateFallback: '/offline',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/(fonts\.gstatic|fonts\.googleapis)\.com\/.*$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 }
        }
      },
      {
        urlPattern: ({ request }) => request.destination === 'image',
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }
        }
      },
    ]
  }
});

module.exports = withPWA({
  reactStrictMode: true,
  experimental: { appDir: true },
});