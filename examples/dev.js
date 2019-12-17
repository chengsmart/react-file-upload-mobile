const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('config');
const devConf = require('./.config/webpack.dev.conf');

const port = config.get('port');
const domain = config.get('domain');

console.log(`----domain:${domain}`);
const proxy = config.get('proxy');
const ip = require('ip').address();
const chalk = require('chalk');

for (const key in devConf.entry) {
  // devConf.entry[key].unshift('react-hot-loader/patch');
  devConf.entry[key].unshift('webpack/hot/only-dev-server');
  devConf.entry[key].unshift(`webpack-dev-server/client?http:${domain}`);
}
const compiler = webpack(devConf);
const devServerOptions = {
  // webpack-dev-server options

  contentBase: path.resolve(process.cwd(), '__build/'),
  index: 'home.html',
  open: false,
  // Can also be an array, or: contentBase: "http://localhost/",
  hot: true,
  hotOnly: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: false,
  disableHostCheck: true,
  // Set this if you want to enable gzip compression for assets
  compress: true,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "**" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy,

  setup(app) {
    // Here you can access the Express app object and add your own custom middleware to it.
    // For example, to define custom handlers for some paths:
    // app.get('/some/path', function(req, res) {
    //   res.json({ custom: 'response' });
    // });
  },
  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {},
  logLevel: 'debug',
  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: false,
  overlay: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: true,
  },
  // It's a required option.
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  },
  stats: { colors: true },
};
WebpackDevServer.addDevServerEntrypoints(devConf, devServerOptions);
const server = new WebpackDevServer(compiler, devServerOptions);
server.listen(port, ip, () => {
  console.log(chalk.green(`Starting server on http:${domain}`));
});
