import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from '@/constants/routes';
import ApiService from '@/services/ApiService';
import {init, uninit} from '@/store/slices/appInit';
import {logout as appLogout} from '@/store/slices/auth';
import Login from '@/views/Login';
import Main from '@/views/Main';
import {RootState} from "@/store";

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  logout: appLogout,
  appInit: init,
  appUninit: uninit,
};

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;

const Routes = ({logout, appInit, appUninit, isAuthenticated}: Props) => {

  useEffect(() => {
    ApiService.init(logout);
    appInit();

    return () => {
      appUninit();
      ApiService.uninit();
    };
    // Need to run once
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path={ROUTE__LOGIN} exact component={Login}/>
        <Redirect to={ROUTE__LOGIN}/>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path={ROUTE__MAIN} component={Main}/>
      <Redirect to={ROUTE__MAIN}/>
    </Switch>
  );
}

export default connector(Routes);
