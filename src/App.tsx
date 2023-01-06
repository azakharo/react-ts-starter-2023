import React, {memo} from 'react';
import {BrowserRouter} from 'react-router-dom';
import ThemeProvider from '@mui/styles/ThemeProvider';
import {createTheme} from '@mui/material';
import {Theme} from '@mui/material/styles';

import {AuthProvider} from 'src/contexts/AuthContext';
import GlobalStyles from 'src/GlobalStyles';
import AppRoutes from 'src/AppRoutes';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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
