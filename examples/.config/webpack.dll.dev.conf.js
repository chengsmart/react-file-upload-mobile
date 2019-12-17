const path = require('path');
const webpack = require('webpack');
const conf = require('./config');
const devConf = require('./webpack.dev.conf');
const cwd = process.cwd();
const webpackConfig = {
  mode: 'development',
  entry: conf.dllEntry,
  module: devConf.module,

  output: {
    filename: '[name].js',
    path: conf.dllOutput,

    // The name of the global variable which the library's
    // require() function will be assigned to
    libraryTarget: "umd",
    library: '[name]'
  },
  resolve: devConf.resolve,
  plugins: [
    new webpack.DllPlugin({
      path: path.join(conf.dllOutput, "[name]-manifest.json"),
      name: "[name]",
      context: cwd
    })
  ]
};

module.exports = webpackConfig;