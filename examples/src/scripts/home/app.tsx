import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { hot } from 'react-hot-loader';
import ReactFileUploadMobile from '../../../../libs/index';
import './index.less';

const App = props => {
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const clearAttachment = () => {};
  const onUpload = file => {
    // upload api
    console.log('upload api');
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
    />
  );
};

export default hot(module)(App);
