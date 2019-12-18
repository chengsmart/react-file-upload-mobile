/**
 * Copyright (c) 2017-present y.boy2012@gmail.com Holding Limited
 * @author liying <ly.boy2012@gmail.com>
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const conf = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const src = conf.src;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')
const cwd = process.cwd();
const config = require('config');
const domain = config.get('domain');
/**
 * 获得入口文件
 */
const getEntries = () => {
  let scripts = path.resolve(src, 'scripts');
  let entryDir = path.resolve(scripts, 'entry');
  let names = fs.readdirSync(entryDir);
  let map = {};

  names.forEach((name) => {
    let m = name.match(/(.+)\.(js|tsx?)?$/);
    let entry = m ? m[1] : '';
    let entryPath = entry ? path.resolve(entryDir, name) : '';

    let paths = [];

    paths.push(entryPath);
    if (entry) map[entry] = paths;
  });

  return map;
};

const getOutput = () => {
  return {
    libraryTarget: "umd"
  };
};

const addHtmlPluginConf = (config) => {
  let pages = fs.readdirSync(src);
  pages.forEach((filename) => {
    let m = filename.match(/(.+)\.html$/);
    if (m) {
      // @see https://github.com/kangax/html-minifier
      var conf = {
        template: path.resolve(src, filename),
        // @see https://github.com/kangax/html-minifier
        // minify: {
        //     collapseWhitespace: true,
        //     removeComments: true
        // },
        /*
                  title: 用来生成页面的 title 元素
                  filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
                  template: 模板文件路径，支持加载器，比如 html!./index.html
                  inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
                  favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
                  minify: {} | false , 传递 html-minifier 选项给 minify 输出
                  hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
                  cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
                  showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
                  chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
                  chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
                  excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块) 
                  */
        hash: true,
        filename: `${filename}`,
        base_home: domain,
        alwaysWriteToDisk: true
      };

      if (m[1] in config.entry) {
        conf.inject = 'body';
        conf.chunks = [m[1]];
      }
      config.plugins.push(new HtmlWebpackPlugin(conf)); //打包时候连同html一起打包
    }

  });
};

const addPlugins = (config) => {
  addHtmlPluginConf(config);
  addDllRerencePluginConf(config);
};

const addDllRerencePluginConf = (config) => {
  if (fs.existsSync(conf.dllOutput)) {
    config.plugins.push(new webpack.DllReferencePlugin({
      context: cwd,
      manifest: require(path.join(conf.dllOutput, 'react-manifest.json'))
    }));

  }

};



const baseConfig = {
  context: process.cwd(),
  entry: getEntries(),
  output: getOutput(),
  resolve: {
    modules: [path.resolve(cwd, "src"), path.resolve(cwd, "node_modules")],

    extensions: ['.web.js', '.js', '.json', '.tsx', '.ts', '.ejs', '.jsx', '.css', '.png', '.jpg', '.less'],
    //开启后缀名的自动补全 默认是.js .json 如果自定义要 '.js','.json' 也要加上
  },

  externals: {
    'jquery': 'jQuery',
    'jquery': '$',
  },

  module: {
    rules: [


      {
        test: /\.(tsx?|js)$/,
        exclude: [path.join(cwd, 'node_modules'), path.join(cwd, 'src', 'dll')],
        include: [src, path.join(cwd, '../', 'libs')],
        use: [{
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  libraryName: 'antd-mobile',
                  libraryDirectory: 'es', //lib antd 嵌套会报错 
                  style: false,
                })]
              }),

            },
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2,
            minetype: 'images/jpg',
            name: 'img/[name]_[hash].[ext]', //注意后面的name=xx，这里很重要否则打包后会出现找不到资源的
            //publicPath: '../'
          }
        }
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8421,
            name: 'fonts/[name].[ext]',
            //publicPath: '../'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.Quill': 'quill',
      'window.hljs': 'highlight.js',
      /* 'hljs': 'highlight.js' */
    }),
    new CopyWebpackPlugin([{
        from: conf.dllOutput,
        to: 'lib',
        ignore: ['*.json'],
        debug: 'info',
        context: cwd
      },
      {
        from: path.join(src, 'scripts', 'lib', 'min'),
        to: 'lib',
        ignore: ['*.json'],
        debug: 'info',
        context: cwd,
        flatten: true
      },
    ])


  ]
};
addPlugins(baseConfig);

module.exports = baseConfig;
