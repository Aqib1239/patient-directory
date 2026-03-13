/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'gov.uk',
      'blog.com',
      'via.placeholder.com',
      'placehold.co',
      'picsum.photos',
      'images.unsplash.com',
      'randomuser.me',
      'cloudflare.com',
      'friendfeed.com',
      
    ],
    // Alternative: use remotePatterns for more control (Next.js 13+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows all hostnames (use cautiously)
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig