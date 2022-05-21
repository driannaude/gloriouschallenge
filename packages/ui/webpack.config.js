// Helper for combining webpack config objects
const { merge } = require('webpack-merge');
const webpack = require('webpack');

module.exports = (config, context) => {
  const mergedConfig = merge(config, {
    plugins: [
      ...config.plugins,
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      },
    },
  });

  return mergedConfig;
};
