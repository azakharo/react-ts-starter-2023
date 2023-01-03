import React from 'react';
import {Router} from 'react-router-dom';

import {AuthProvider} from 'src/contexts/AuthContext';
import history from 'src/utils/history';
import GlobalStyles from 'src/components/GlobalStyles';
import Routes from './Routes';

const App = (): JSX.Element => (
  <Router history={history}>
    <AuthProvider>
      <GlobalStyles />
      <Routes />
    </AuthProvider>
  </Router>
);

export default App;
