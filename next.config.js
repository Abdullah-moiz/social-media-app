/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ 'firebasestorage.googleapis.com'
      ,'png.pngtree.com' , 'images.pexels.com' , 'ages.pexels.com'],
  },
}

module.exports = nextConfig
