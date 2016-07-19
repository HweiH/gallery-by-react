'use strict';

var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./base');
var defaultSettings = require('./defaults');

// Add needed plugins here
var BowerWebpackPlugin = require('bower-webpack-plugin');

var config = Object.assign({}, baseConfig, {
  entry: ['webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port, 'webpack/hot/only-dev-server', './src/index'],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), new BowerWebpackPlugin({
    searchResolveModulesDirectories: false
  })],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(config.additionalPaths, [path.join(__dirname, '/../src')])
});

module.exports = config;

//# sourceMappingURL=dev-compiled.js.map