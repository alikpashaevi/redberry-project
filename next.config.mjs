/** @type {import('next').NextConfig} */
const nextConfig = {  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'api.real-estate-manager.redberryinternship.ge',
      port: '',
      pathname: '/storage/images/**',
    },
    
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
},reactStrictMode: false};

export default nextConfig;
