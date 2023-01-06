import React, {memo} from 'react';
import {BrowserRouter} from 'react-router-dom';
import ThemeProvider from '@mui/styles/ThemeProvider';
import {createTheme} from '@mui/material';

import {AuthProvider} from 'src/contexts/AuthContext';
import GlobalStyles from 'src/GlobalStyles';
import AppRoutes from 'src/AppRoutes';

const theme = createTheme();

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyles />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default memo(App);
