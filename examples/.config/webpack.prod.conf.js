const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const conf = require('./config');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackIncludeSiblingChunksPlugin = require('html-webpack-include-sibling-chunks-plugin')

const ComboPlugin = require('html-webpack-combo-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ip = require('ip').address();
const util = require('util');
const theme = require('../theme');
const config = require('config');
const domain = config.get('domain');
const hostname = config.get('hostname');
const apiDomain = config.get('apiDomain');
const configDomain = config.get('configDomain');
const cdnDomain = config.get('cdnDomain');
const configImgDomain = config.get('configImgDomain');
const needTrack = config.get('needTrack');
const cwd = process.cwd();
const src = conf.src;
let webpackConfig = merge.smart(baseWebpackConfig, {
  output: {
    path: conf.build.output,
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].common.js',
    publicPath: conf.build.publicPath
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: [path.join(cwd, 'node_modules'), path.join(cwd, 'src', 'dll'), ],
        include: [src],
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: true,
            //importLoaders: 1
            //minimize: true ,
            sourceMap: true,
            cacheDirectory: true

          }
        }]
      },
      {
        test: /\.css$/,
        use: [{

            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../' //定义资源前缀路径 ../img ../fonts
            }

          },

          {
            loader: 'css-loader',
            options: {
              minimize: true,
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [{

            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../' //定义资源前缀路径 ../img ../fonts
            }

          },

          {
            loader: 'css-loader',
            options: {
              minimize: true,
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: theme
            }
          }
        ]


      }
    ]
  },
  mode: 'production',

});
webpackConfig.plugins.push(new MiniCssExtractPlugin({
  filename: "css/[name].css",
  chunkFilename: "css/commons.css",

  //ignoreOrder: true,
}));
var chunks = Object.keys(webpackConfig.entry);
webpackConfig.optimization = {
  namedModules: true, // NamedModulesPlugin()
  splitChunks: { // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    cacheGroups: {
      styles: {
        name: 'commons',
        test: /\.(css|less|sass|scss)$/,
        chunks: 'all',
        minChunks: 2,
        reuseExistingChunk: true,
        enforce: true,
        minSize: 0,
      },
      js: {
        name: "commons",
        test: /\.(js|tsx?)$/,
        chunks: "all",
        minChunks: chunks.length,
        minSize: 0
      },
    }
  },
  occurrenceOrder: true,
  noEmitOnErrors: true, // NoEmitOnErrorsPlugin
  concatenateModules: true //ModuleConcatenationPlugin
};

webpackConfig.plugins.unshift(new HtmlWebpackIncludeSiblingChunksPlugin()); //必须在html-plugin 之前 ？

/* webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({ //提取公用的代码打包到独立文件
    name: 'common',
    chunks: chunks,
    // Modules must be shared between all entries
    minChunks: chunks.length, // 提取所有chunks共同依赖的模块

})); */
/* webpackConfig.plugins.push(new ParallelUglifyPlugin({
    cacheDir: '.cache/',
    uglifyJS: {
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    }
})); */




webpackConfig.plugins.push(new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  DOMAIN: JSON.stringify(domain),
  API_DOMAIN: JSON.stringify(apiDomain),
  'HOST_NAME': conf.build.publicPath,
  CONFIG_DOMAIN: JSON.stringify(configDomain),
  CDN_DOMAIN: JSON.stringify(cdnDomain),
  CONFIG_IMG_DOMAIN: JSON.stringify(configImgDomain),
  DEBUGUID: JSON.stringify(''),
  NEEDTRACK: JSON.stringify(needTrack),
}));

webpackConfig.plugins.push(new ComboPlugin({
  baseUri: `${domain}??`,
  splitter: ',',
  async: false,
  replaceCssDomain: hostname,
  replaceScriptDomain: hostname
}))



module.exports = webpackConfig;
