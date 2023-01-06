import React, {FC} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from 'src/constants/routes';
import Login from 'src/views/Login';
import Main from 'src/views/Main';
import useAuth from 'src/hooks/useAuth';

const AppRoutes: FC = () => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path={ROUTE__LOGIN} element={<Login />} />
        <Route path="*" element={<Navigate to={ROUTE__LOGIN} replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={ROUTE__MAIN} element={<Main />} />
      <Route path="*" element={<Navigate to={ROUTE__MAIN} replace />} />
    </Routes>
  );
};

export default AppRoutes;
