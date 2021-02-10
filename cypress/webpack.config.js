const path = require('path');

module.exports = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../../src/'),
    },
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      fs: false,
      child_process: false,
      readline: false,
      net: false,
      tls: false,
    }
  },
  node: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, '../src/'),
        loader: "ts-loader",
        options: { transpileOnly: true },
      }
    ]
  }
};
