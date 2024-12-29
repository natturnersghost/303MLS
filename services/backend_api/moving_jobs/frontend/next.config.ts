import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/sign_in',
                destination: 'http://backend:8000/sign_in', // Using the Docker service name
            },
        ]
    },
    // Optional performance optimizations
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    }
}

export default nextConfig
