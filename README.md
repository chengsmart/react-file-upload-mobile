# react-file-upload-mobile

---

React Mobile Single File Upload Component

- [中文版](./README_zh.md)

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/react-file-upload-mobile.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-file-upload-mobile
[download-image]: https://img.shields.io/npm/dm/react-file-upload-mobile.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/react-file-upload-mobile

## Screenshots

- Upload mode - To be uploaded  
  <img src="https://tva1.sinaimg.cn/large/006tNbRwly1ga37iqxscoj30ae05bdfv.jpg" width="375"/>

- Upload mode - Uploaded  
  <img src="https://tva1.sinaimg.cn/large/006tNbRwly1ga37jly75yj30ad04zgmb.jpg" width="375"/>

- Display mode  
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
    // Upload mode
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
    // Display mode
    <ReactFileUploadMobile
        fileUrl={'//xxx.com/xxx.jpg'}
        fileName={'xxx.jpg'}
        preview={preview}
        download={true}
        displayOnly={true}
    />
```

## API

| Properties      | Descrition                                                                                           | Type    | Default |
| --------------- | ---------------------------------------------------------------------------------------------------- | ------- | ------- |
| wrapCls         | Wrap className                                                                                       | string  | -       |
| fileUrl         | File url                                                                                             | string  | -       |
| fileName        | File name                                                                                            | string  | -       |
| displayOnly     | Display mode or upload mode                                                                          | boolean | false   |
| download        | Downloading file _Display mode only_                                                                 | boolean | false   |
| compressImg     | Picture compression ratio, _Upload mode only_, One decimal place between 0-1, 0 or 1 is uncompressed | number  | 0.8     |
| showNote        | Show bottom text, _Upload mode only_                                                                 | boolean | false   |
| uploadSuffix    | Suffix restrictions on uploaded files, _Upload mode only_                                            | Array   | []      |
| uploadImgSuffix | Picture file suffix,Subset of uploadSuffix, _Upload mode only_                                       | Array   | []      |

### Methods

- preview() - Click thumbnail callback
- onFileDelete() - Clicking delete button callback, _Upload mode only_
- onFileUpload(file: File) - File upload callback, _Upload mode only_

## Development

Modify the file under `source`,`npm run build` will compile, other functions have not been implemented yet

## TODOs

- Globalization
- Add parameter: file name length limit
- Add parameter: file size limit

## Example

## Tips

## Test Case

## Coverage

## License

react-file-upload-mobile is released under the MIT license.
