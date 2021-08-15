import React from 'react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from '@/store';
import history from '@/history';
import GlobalStyles from '@/components/GlobalStyles';
import Routes from './Routes';

const App = (): JSX.Element => (
  <Provider store={store}>
    <Router history={history}>
      <GlobalStyles/>
      <Routes/>
    </Router>
  </Provider>
);

export default App;
