const path = require('path');
const src = path.resolve(process.cwd(), 'src');
const ip = require('ip').address();
const config = require('config');
const domain = config.get('domain');
const pkg = require('../package.json')
module.exports = {
    src: src,
    dllEntry: {
        react: ['react', 'react-dom']
    },
    dllOutput: path.resolve(process.cwd(), 'src', 'dll'),
    dev: {
        publicPath: domain,
        output: path.resolve(process.cwd(), '__build')
    },
    build: {
        publicPath: domain,
        output: path.resolve(process.cwd(), 'target', `${pkg.name}`)
    }
};