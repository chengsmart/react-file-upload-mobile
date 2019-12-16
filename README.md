# react-file-upload-mobile

---

React Mobile File Upload Component

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/react-file-upload-mobile.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-file-upload-mobile
[download-image]: https://img.shields.io/npm/dm/react-file-upload-mobile.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/react-file-upload-mobile

# _当前版本不稳定，bug 修复中_

## Screenshots

上传模式
<img src="https://i.bmp.ovh/imgs/2019/11/20ce1d9429a1b5c7.png" width="375"/>

展示模式  
<img src="https://i.bmp.ovh/imgs/2019/11/f61ecc74c0b22cfe.png" width="375" />

## install

[![react-file-upload-mobile](https://nodei.co/npm/react-file-upload-mobile.png)](https://npmjs.org/package/react-file-upload-mobile)

## Usage

```javascript
    import ReactFileUploadMobile from 'react-file-upload-mobile';

    const [image, setImage] = useState();
    const [imageName, setImageName] = useState();
    const clearAttachment = () => {
        setImage('');
        setImageName('');
    }
    const onUpload = (file){
        // upload api
    }
    // 上传模式
    <ReactFileUploadMobile
        fileUrl={image}
        fileName={imageName}
        displayOnly={false}
        preview={true}
        compressImg={true}
        onFileDelete={clearAttachment}
        onFileUpload={onUpload}
    />
    // 展示模式
    <ReactFileUploadMobile
        fileUrl={'//xxx.com/xxx.jpg'}
        fileName={'xxx.jpg'}
        preview={true}
        download={true}
        displayOnly={true}
    />
```

## API

| Properties  | Descrition                                                                                                                                         | Type    | Default |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| wrapCls     | 外部 className                                                                                                                                     | string  | -       |
| fileUrl     | 文件绝对路径                                                                                                                                       | string  | -       |
| fileName    | 文件名                                                                                                                                             | string  | -       |
| preview     | 点击缩略图查阅大图,使用 [react-image-lightbox](https://github.com/frontend-collective/react-image-lightbox) 进行大图查看                           | boolean | -       |
| displayOnly | 是否为纯展示的情况                                                                                                                                 | boolean | -       |
| compressImg | 是否压缩图片，_仅当`displayOnly`为`false`时候生效_,使用 [compressorjs](https://github.com/fengyuanchen/compressorjs) 进行压缩，默认使用 0.8 压缩率 | boolean | -       |
| download    | 是否支持下载附件 _仅当`displayOnly`为`true`时候生效_                                                                                               | boolean | -       |

### Methods

- onFileDelete() - 点击删除按钮后的回调 _仅当`displayOnly`为`false`时候生效_
- onFileUpload(file: File) - 文件上传的回调 _仅当`displayOnly`为`false`时候生效_

## Tips

## Development

## Example

## TODOs

- 添加参数：文件名长度限制
- 添加参数：文件大小限制
- 添加参数：文件后缀限制
- 添加参数：压缩比例
- 完善文档：默认参数

## Test Case

## Coverage

## License

react-file-upload-mobile is released under the MIT license.
