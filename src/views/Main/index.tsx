import React, {useCallback, memo} from 'react';
import {Button, makeStyles, createStyles} from '@material-ui/core';
import {CSSProperties} from "@material-ui/styles";

import errorImg from 'IMAGES/error-page-icon.png';
import {logout, selectUsername} from '@/store/slices/auth';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';

const areaColor = '#e2deed';

const asideMainCommonStyles: CSSProperties = {
  minHeight: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  fontWeight: 'bold',
};

const useStyles = makeStyles(() => createStyles({
    container: {
      height: '100vh',
      display: 'grid',
      gridTemplateAreas: `"header header"
      "sidebar main"
      "footer footer"`,
      gridTemplateColumns: 'minmax(200px, 20%) 1fr',
      gridTemplateRows: '3rem 1fr 3rem',
      gridGap: '1rem',

      '&> *': {
        backgroundColor: areaColor,
      },
    },

    header: {
      gridArea: 'header',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 16px',
    },

    logo: {
      height: '2rem',
      marginRight: 'auto',
    },

    greeting: {
      marginRight: '16px',
    },

    username: {
      fontWeight: 'bold',
    },

    main: {
      gridColumn: 'main',
      ...asideMainCommonStyles,
    },

    aside: {
      gridArea: 'sidebar',
      ...asideMainCommonStyles,
    },

    footer: {
      gridArea: 'footer',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
    },
  }));

const Main = () => {
  const classes  = useStyles();
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername);

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <img className={classes.logo} src={errorImg as string} alt="logo" />
        {username && (
          <span className={classes.greeting}>
            <span>Hello </span>
            <span className={classes.username}>{username}</span>
          </span>
        )}
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <aside className={classes.aside}>Sidebar</aside>
      <main className={classes.main}>Main</main>
      <footer className={classes.footer}>Footer</footer>
    </div>
  );
};

export default memo(Main);
