import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { AutoTab } from '../libs/index';
import 'jest-dom/extend-expect';

afterEach(cleanup);

const setup = () => {
  const utils = render(<AutoTab />);
  const input = utils.container.querySelector('#auto-tab-input');

  return {
    input,
    utils,
  };
};

test('输入内容超过默认6位截取', () => {
  const { input, } = setup();

  fireEvent.change(input, { target: { value: '1234567', }, });
  expect(input.value).toBe('123456');
});

test('非数字替换掉', () => {
  const { input, } = setup();

  fireEvent.change(input, { target: { value: '12xx', }, });
  expect(input.value).toBe('12');
});
