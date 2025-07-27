module.exports = {
  images: {
    domains: ['img.freepik.com'],
  },
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: 'http://cart-app:3001/cart/:path*', // Docker Compose container name
      },
    ];
  },
}; 