import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from '@/store';
import GlobalStyles from '@/components/GlobalStyles';
import Routes from './Routes';

const App = (): JSX.Element => (
  <Provider store={store}>
    <Router>
      <GlobalStyles/>
      <Routes/>
    </Router>
  </Provider>
);

export default App;
