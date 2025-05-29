import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // dynamicIO: true,
    // serverActions: {
    //   serverActions: {
    //     allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
    //   },
    // },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  webpack: (config) => {
    // Add GraphQL loader
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [{ loader: 'graphql-tag/loader' }],
    })
    return config
  },
}

export default withNextIntl(withPayload(nextConfig))
