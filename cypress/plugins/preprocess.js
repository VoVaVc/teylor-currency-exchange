const webpack = require('cypress-webpack-preprocessor-v5')

const config = require('../webpack.config.js');

const options = {
  webpackOptions: config,
};

config.env.webpackFilename = 'webpack.config.js'
require('@cypress/react/plugins/load-webpack')(on, config)

module.exports = webpack(options)
