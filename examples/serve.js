const connect = require('connect');
const http = require('http');
const chalk = require('chalk');
const pkg = require('./package.json');

const app = connect();
const serveStatic = require('serve-static');
const ip = require('ip').address();
// gzip/deflate outgoing responses
const compression = require('compression');

const config = require('config');

const PORT = config.get('port');
app.use(compression());

// store session state in browser cookie
const cookieSession = require('cookie-session');

app.use(
    cookieSession({
        keys: ['secret1', 'secret2'],
    }),
);

app.use(
    serveStatic(`target/${pkg.name}`, {
        index: ['index.html'],
    }),
);

http.createServer(app).listen(PORT);

console.log(
    chalk.cyan(
        `服务已启动！\n http://localhost:${PORT}/\n http://${ip}:${PORT}/`,
    ),
);