import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';

const AppGlobalStyles = (): JSX.Element => {
  return (
    <GlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100%',
          width: '100%',
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        },
        body: {
          height: '100%',
          width: '100%',
        },
        '#app': {
          height: '100%',
          width: '100%',
        },
      }}
    />
  );
};

export default AppGlobalStyles;
