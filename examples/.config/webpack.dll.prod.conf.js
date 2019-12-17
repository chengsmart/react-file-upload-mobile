const webpack = require('webpack');
const path = require('path');
const conf = require('./config');
const prodConf = require('./webpack.prod.conf');
const cwd = process.cwd();
let webpackConfig = {
  mode: 'production',
  entry: conf.dllEntry,
  module: prodConf.module,
  output: {
    filename: '[name].js',
    path: path.join(conf.dllOutput),

    // The name of the global variable which the library's
    // require() function will be assigned to
    libraryTarget: "umd",
    library: '[name]'
  },
  resolve: prodConf.resolve,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      }
    }),
    new webpack.DllPlugin({
      path: path.join(conf.dllOutput, "[name]-manifest.json"),
      name: "[name]",
      context: cwd
    })
  ]
};

module.exports = webpackConfig;