/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf')

const remotes = ( isServer ) => ({
  finderNewsComponents: `finderNewsComponents@${process.env.REMOTE_URL}${ isServer ? 'ssr' : 'chunks' }/remoteEntry.js`,
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
    config.experiments = { 
      topLevelAwait: true,
      layers: true
    }
    config.plugins.push(
      new NextFederationPlugin({
        name: 'finderNews',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes('finderNewsComponents', isServer),
        shared: {},
      }),
    )
    return config
  },
}

module.exports = nextConfig
