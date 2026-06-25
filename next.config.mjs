/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // bypass optimasi di lokal jika server Next.js salah mendeteksi IP Supabase sebagai Private IP
    unoptimized: process.env.NODE_ENV === 'development', 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fbxuyfmmjkdmpprskhdc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;