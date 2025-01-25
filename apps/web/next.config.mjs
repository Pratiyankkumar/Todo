/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["drive.google.com", "images.unsplash.com"], // Add this line
  },
};

export default nextConfig;
