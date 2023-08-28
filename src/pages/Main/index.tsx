import {memo, useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';

import {getUsers} from 'src/api/users';
import useAuth from 'src/hooks/useAuth';
import User from 'src/types/users/User';
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
  const {logout, user: currentUser} = useAuth();
  const username = currentUser ? currentUser.name : '';

  const [users, setUsers] = useState<User[]>([]);

  const getUsersFromApi = async () => {
    const usersFromApi = await getUsers();
    setUsers(usersFromApi);
  };

  useEffect(() => {
    void getUsersFromApi();
  }, []);

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
        <Box display="flex" flexWrap="wrap" gap={2}>
          {Array.isArray(users) &&
            users.length > 0 &&
            users.map(user => {
              return (
                <div key={user.id}>
                  <p>
                    <strong>{user.first_name}</strong>
                  </p>
                  <div>{user.email}</div>
                  <img
                    key={user.avatar}
                    src={user.avatar}
                    alt={user.first_name}
                  />
                </div>
              );
            })}
        </Box>
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
