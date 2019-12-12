# react-file-upload-mobile
---

React Mobile File Upload Component

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/react-file-upload-mobile.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-file-upload-mobile
[download-image]: https://img.shields.io/npm/dm/react-file-upload-mobile.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/react-file-upload-mobile

## Screenshots

<img src="https://i.bmp.ovh/imgs/2019/11/20ce1d9429a1b5c7.png" width="375"/>
<img src="https://i.bmp.ovh/imgs/2019/11/f61ecc74c0b22cfe.png" width="375" />

## Development

## Example

## install

## Usage

## API

Properties | Descrition | Type | Default
-----------|------------|------|--------
fileUrl | 文件绝对路径 | string | -
fileName | 文件名 | string | -
preview | 点击缩略图查阅大图,使用 [react-image-lightbox](https://github.com/frontend-collective/react-image-lightbox) 进行大图查看 | boolean | -
displayOnly | 是否为纯展示的情况 | boolean | -
compressImg | 是否压缩图片，*仅当`displayOnly`为`false`时候生效*,使用 [compressorjs](https://github.com/fengyuanchen/compressorjs) 进行压缩，默认使用0.8压缩率 | boolean | -
download | 是否支持下载附件 *仅当`displayOnly`为`true`时候生效* | boolean | -
### Methods

- onFileDelete() - 点击删除按钮后的回调 *仅当`displayOnly`为`false`时候生效*
- onAfterUpload(url: string, name: string) - 文件上传成功的回调 *仅当`displayOnly`为`false`时候生效*
    - url 文件的绝对路径
    - name 文件名


## Tips


## Test Case

## Coverage

## License

react-file-upload-mobile is released under the MIT license.
