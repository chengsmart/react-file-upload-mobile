const path = require("path");
const ExtractTextWebapckPlugin = require("extract-text-webpack-plugin"); //CSS文件单独提取出来
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清空打包目录的插件

const extractLess = new ExtractTextWebapckPlugin({
  filename: "index.css",
  disable: process.env.NODE_ENV === "development"
});
module.exports = {
  // entry: path.resolve(process.cwd(), "entry.js"),
  entry: path.resolve(process.cwd(), "src", "index.tsx"),
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "index.js"
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  module: {
    // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [path.join(process.cwd(), "node_modules")],
        include: path.join(process.cwd(), "src"),
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        //file-loader 解决css等文件中引入图片路径的问题
        // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: "images/", // 图片输出的路径
            limit: 10 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    extractLess,
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), "dist")]
    })
  ]
};
