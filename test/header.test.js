import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { Header } from '../libs/index';
import 'jest-dom/extend-expect';

afterEach(cleanup);

const setup = () => {
  const utils = render(<Header />);
  const input = utils.container.querySelector('.header');

  return {
    input,
    utils
  };
};

test('1', () => {
  expect('1').toBe('1');
});
