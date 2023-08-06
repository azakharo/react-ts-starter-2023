import {FC, memo} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from 'src/constants/routes';
import useAuth from 'src/hooks/useAuth';
import Login from 'src/pages/Login';
import Main from 'src/pages/Main';

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

export default memo(AppRoutes);
