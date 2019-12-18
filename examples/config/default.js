const ip = require('ip').address();
// const ip = '127.0.0.1';
const PORT = 9999;
let cookie;
const API_DOMAIN = 'http://localhost:8080';

module.exports = {
  port: PORT,
  hostname: `${ip}:${PORT}/`, // combo 将要替换的域名
  domain: `//${ip}:${PORT}/`, // 替换后域名
  apiDomain: `//${ip}:${PORT}/mapi`,
  configDomain: '//downloadtest.10101111.com/ucarcdnstore/ucar/agreement/', // 协议文件地址
  cdnDomain: '//downloadtest.10101111.com/ucarcdnstore/', // 协议文件地址
  configImgDomain: '//img01test.10101111.com/download/ucarcdnstore/ucar/app/', // 图片地址
  debugUID: '', // 本地调试uid
  proxy: {
    '/mapi/*': {
      target: API_DOMAIN,
      changeOrigin: true,
      onProxyRes(proxyRes, req, res) {
        const cookies = proxyRes.headers['set-cookie'];
        if (!cookie) {
          cookie = cookies;
          // TODO 如有其他cookie需求再做filter
        }
      },
      onProxyReq(proxyReq) {
        if (cookie) {
          proxyReq.setHeader('Cookie', cookie);
        }
      },

    },
  },
  isOpenBrowser: true,
  needTrack: false,
};
