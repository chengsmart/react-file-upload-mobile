# react-file-upload-mobile

---

单文件上传的 React 组件

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/react-file-upload-mobile.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-file-upload-mobile
[download-image]: https://img.shields.io/npm/dm/react-file-upload-mobile.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/react-file-upload-mobile

## Screenshots

- 上传模式-待上传  
  <img src="https://tva1.sinaimg.cn/large/006tNbRwly1ga37iqxscoj30ae05bdfv.jpg" width="375"/>

- 上传模式-已上传  
   <img src="https://tva1.sinaimg.cn/large/006tNbRwly1ga37jly75yj30ad04zgmb.jpg" width="375"/>

- 展示模式  
  <img src="https://tva1.sinaimg.cn/large/006tNbRwly1ga37lpz0r8j30ae03t0sp.jpg" width="375" />

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
    const onUpload = (file) => {
        // upload api
    }
    const preview = () => {
        // preview picture
    }
    // 上传模式
    <ReactFileUploadMobile
        fileUrl={image}
        fileName={imageName}
        displayOnly={false}
        preview={preview}
        compressImg={0.8}
        onFileDelete={clearAttachment}
        onFileUpload={onUpload}
        showNote={true}
        uploadSuffix={['docx', 'doc', 'jpg', 'png', 'jpeg', 'zip']}
        uploadImgSuffix={['jpg', 'png', 'jpeg']}
    />
    // 展示模式
    <ReactFileUploadMobile
        fileUrl={'//xxx.com/xxx.jpg'}
        fileName={'xxx.jpg'}
        preview={preview}
        download={true}
        displayOnly={true}
    />
```

## API

| Properties      | Descrition                                                                                                                                                                            | Type    | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| wrapCls         | 外部 className                                                                                                                                                                        | string  | -       |
| fileUrl         | 文件绝对路径                                                                                                                                                                          | string  | -       |
| fileName        | 文件名                                                                                                                                                                                | string  | -       |
| displayOnly     | 是否为纯展示的情况                                                                                                                                                                    | boolean | false   |
| compressImg     | 图片压缩率，_仅当`displayOnly`为`false`时候生效_,使用 [compressorjs](https://github.com/fengyuanchen/compressorjs) 进行压缩，默认使用 0.8 压缩率，0-1 之间的一位小数，0 或 1 为不压缩 | number  | 0.8     |
| download        | 是否支持下载附件 _仅当`displayOnly`为`true`时候生效_                                                                                                                                  | boolean | false   |
| showNote        | 是否展示底部文字，_仅当`displayOnly`为`false`时候生效_                                                                                                                                | boolean | false   |
| uploadSuffix    | 上传文件的后缀限制，_仅当`displayOnly`为`false`时候生效_                                                                                                                              | Array   | []      |
| uploadImgSuffix | 图片文件的后缀，uploadSuffix 的子集，_仅当`displayOnly`为`false`时候生效_                                                                                                             | Array   | []      |

### Methods

- preview() - 点击缩略图回调,用于查阅大图等功能,可在回调中使用 [react-image-lightbox](https://github.com/frontend-collective/react-image-lightbox) 进行大图查看
- onFileDelete() - 点击删除按钮后的回调 _仅当`displayOnly`为`false`时候生效_
- onFileUpload(file: File) - 文件上传的回调 _仅当`displayOnly`为`false`时候生效_

## Development

修改`source`下的文件，`npm run build`即可编译，其他功能尚未实现

## TODOs

- 添加参数：文件后缀限制(Done)
- 添加参数：压缩比例(Done)
- 完善文档：默认参数(Done)
- 添加参数：文件名长度限制
- 添加参数：文件大小限制

## Example

## Tips

## Test Case

## Coverage

## License

react-file-upload-mobile is released under the MIT license.
