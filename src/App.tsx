import React, {memo} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';

import {AuthProvider} from 'src/contexts/AuthContext';
import AppGlobalStyles from 'src/AppGlobalStyles';
import AppRoutes from 'src/AppRoutes';

const theme = createTheme();

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <AppGlobalStyles />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default memo(App);
