/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize native modules
      config.externals.push('better-sqlite3')
      // Mark bun:sqlite as external to prevent webpack from trying to bundle it
      config.externals['bun:sqlite'] = 'commonjs bun:sqlite'
    }
    return config
  },
}

export default nextConfig
