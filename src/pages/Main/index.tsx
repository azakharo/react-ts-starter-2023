import React, {memo} from 'react';
import {Box, Button} from '@mui/material';

import useAuth from 'src/hooks/useAuth';
import errorImg from 'IMAGES/error-page-icon.png';

const areaColor = '#e2deed';

const asideMainCommonStyles = {
  minHeight: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  fontWeight: 'bold',
};

const Main = () => {
  const {logout, user} = useAuth();
  const username = user ? user.name : '';

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'grid',
        gridTemplateAreas: `"header header"
      "sidebar main"
      "footer footer"`,
        gridTemplateColumns: 'minmax(200px, 20%) 1fr',
        gridTemplateRows: '3rem 1fr 3rem',
        gap: '1rem',

        '&> *': {
          backgroundColor: areaColor,
        },
      }}
    >
      <Box
        component="header"
        sx={{
          gridArea: 'header',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
        }}
      >
        <Box
          component="img"
          sx={{
            height: '2rem',
            marginRight: 'auto',
          }}
          src={errorImg as string}
          alt="logo"
        />
        {username && (
          <Box
            sx={{
              marginRight: '16px',
            }}
          >
            <span>Hello </span>
            <Box
              component="span"
              sx={{
                fontWeight: 'bold',
              }}
            >
              {username}
            </Box>
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
      </Box>
      <Box
        component="aside"
        sx={{
          gridArea: 'sidebar',
          ...asideMainCommonStyles,
        }}
      >
        Sidebar
      </Box>
      <Box
        component="main"
        sx={{
          gridColumn: 'main',
          ...asideMainCommonStyles,
        }}
      >
        Main
      </Box>
      <Box
        component="footer"
        sx={{
          gridArea: 'footer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        Footer
      </Box>
    </Box>
  );
};

export default memo(Main);
