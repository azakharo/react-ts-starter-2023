import React, {FC} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from '@/constants/routes';
import Login from '@/views/Login';
import Main from '@/views/Main';
import useAuth from '@/hooks/useAuth';

const Routes: FC = () => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path={ROUTE__LOGIN} exact component={Login} />
        <Redirect to={ROUTE__LOGIN} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path={ROUTE__MAIN} component={Main} />
      <Redirect to={ROUTE__MAIN} />
    </Switch>
  );
};

export default Routes;
