import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { hot } from 'react-hot-loader';
import { Toast } from 'antd-mobile';
import ReactFileUploadMobile from '../../../../libs/index';
import './index.less';

const App = props => {
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const clearAttachment = () => {
    setImage('');
    setImageName('');
  };
  const onUpload = file => {
    // upload api
    setTimeout(() => {
      setImage(
        'https://tva1.sinaimg.cn/large/006tNbRwly1ga0nb696a8j31400u0u0y.jpg',
      );
      setImageName('example.jpg');
    }, 500);
  };
  const preview = () => {
    // preview picture
    console.log(`preview pic,url = ${image}`);
  };
  return (
    <ReactFileUploadMobile
      fileUrl={image}
      fileName={imageName}
      displayOnly={false}
      preview={preview}
      compressImg={0.8}
      onFileDelete={clearAttachment}
      onFileUpload={onUpload}
      uploadSuffix={[
        'docx',
        'doc',
        'xlsx',
        'xls',
        'pptx',
        'ppt',
        'jpg',
        'png',
        'gif',
        'jpeg',
        'mp4',
        'avi',
        'zip',
        'rar',
      ]}
      uploadImgSuffix={['jpg', 'png', 'gif', 'jpeg']}
    />
  );
};

export default hot(module)(App);
