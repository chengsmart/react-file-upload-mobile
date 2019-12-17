import React from 'react';
import { hot } from 'react-hot-loader';
import { AutoTab } from '../../../../libs/index';
import './index.less';
const onChange = (val: any, clear: any) => {
  console.log(val);
};
const App = () => <AutoTab onChange={onChange} />;

export default hot(module)(App);
