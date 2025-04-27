const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // disables PWA in dev mode
});

module.exports = withPWA({
  reactStrictMode: true,
  // Add any other Next.js config here
});
