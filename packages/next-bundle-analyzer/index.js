module.exports = (bundleAnalyserProps = { enabled: true }) => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const pluginProps = typeof bundleAnalyserProps === 'function' ? bundleAnalyserProps(options) : bundleAnalyserProps
      if (pluginProps.enabled) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: options.isServer
              ? '../analyze/server.html'
              : './analyze/client.html',
              ...pluginProps,
          })
        )
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  })
}
