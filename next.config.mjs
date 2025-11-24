/** @type {import('next').NextConfig} */
const nextConfig = {
    reactProductionProfiling: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ucarecdn.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
}

export default nextConfig
