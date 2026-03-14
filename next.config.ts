import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  logging: {
    incomingRequests: {
      // ingest постоянно флудит в логи (для HMR)
      ignore: [/^\/api\/inngest(?:\/.*)?$/],
    },
  },
}

export default nextConfig
