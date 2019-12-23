import React from 'react';
import {
  cleanup,
  fireEvent,
  render
} from 'react-testing-library';
import {
  ReactFileUploadMobile
} from '../libs/react-file-upload-mobile';
import 'jest-dom/extend-expect';

afterEach(cleanup);

const setup = () => {
  const utils = render( < ReactFileUploadMobile / > );
  const upload = utils.container.querySelector('.file-upload');

  return {
    upload,
    utils,
  };
}; {
  /* 
  test('输入内容超过默认6位截取', () => {
    const {
      upload,
    } = setup();

    fireEvent.change(upload, {
      target: {
        value: '1234567',
      },
    });
    expect(input.value).toBe('123456');
  });

  test('非数字替换掉', () => {
    const {
      input,
    } = setup();

    fireEvent.change(input, {
      target: {
        value: '12xx',
      },
    });
    expect(input.value).toBe('12');
  }); */
}
