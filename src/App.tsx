import React, {memo} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {AuthProvider} from 'src/contexts/AuthContext';
import GlobalStyles from 'src/GlobalStyles';
import AppRoutes from 'src/AppRoutes';

const App = (): JSX.Element => (
  <BrowserRouter>
    <AuthProvider>
      <GlobalStyles />
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default memo(App);
