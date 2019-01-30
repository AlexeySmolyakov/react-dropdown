import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);
export default hot(App);