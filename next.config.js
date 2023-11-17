/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf')

const remotes = ( isServer,) => ({
  finderNewsComponents: `finderNewsComponents@http://localhost:3001/_next/static/${ isServer ? 'ssr' : 'chunks' }/remoteEntry.js`,
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config, options) {
    const { isServer } = options
    config.experiments = { topLevelAwait: true}
    config.plugins.push(
      new NextFederationPlugin({
        name: 'finderNews',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes('finderNewsComponents', 3001, isServer),
        shared: {},
      }),
    )
    return config
  },
}

module.exports = nextConfig
