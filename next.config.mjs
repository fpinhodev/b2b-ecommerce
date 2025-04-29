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
}

export default withNextIntl(withPayload(nextConfig))
