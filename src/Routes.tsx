import React, {FC} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from 'src/constants/routes';
import Login from 'src/views/Login';
import Main from 'src/views/Main';
import useAuth from 'src/hooks/useAuth';

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
