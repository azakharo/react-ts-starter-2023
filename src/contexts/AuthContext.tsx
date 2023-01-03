import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  FC,
  useCallback,
  useMemo,
} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {
  getAuthToken as getAuthTokenFromLocalStorage,
  setAuthToken as putAuthTokenToLocalStorage,
  remAuthToken as remAuthTokenFromLocalStorage,
  getUserId as getUserIdFromLocalStorage,
  setUserId as putUserIdToLocalStorage,
  remUserId as remUserIdFromLocalStorage,
} from '@/helpers/localStorage';
import UserLoggedIn from '@/types/UserLoggedIn';
import {ROUTE__LOGIN, ROUTE__MAIN} from '@/constants/routes';
import ApiService from '@/services/ApiService';

export interface AuthState {
  isAuthenticated: boolean;
  isInitialised: boolean;
  user: UserLoggedIn | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const setSession = (token?: string, userId?: number): void => {
  if (token) {
    putAuthTokenToLocalStorage(token);
    putUserIdToLocalStorage(userId as number);
  } else {
    remAuthTokenFromLocalStorage();
    remUserIdFromLocalStorage();
  }
};

const ACTION__APP_INIT = 'ACTION__APP_INIT';
const ACTION__LOGIN = 'ACTION__LOGIN';
const ACTION__LOGOUT = 'ACTION__LOGOUT';

interface AppInitAction {
  type: typeof ACTION__APP_INIT;
  payload: UserLoggedIn | null;
}

interface LoginAction {
  type: typeof ACTION__LOGIN;
  payload: UserLoggedIn;
}

interface LogoutAction {
  type: typeof ACTION__LOGOUT;
}

const reducer = (
  state: AuthState,
  action: AppInitAction | LoginAction | LogoutAction,
) => {
  switch (action.type) {
    case ACTION__APP_INIT: {
      const user = action.payload;

      return {
        ...state,
        isAuthenticated: !!user,
        isInitialised: true,
        user,
      };
    }
    case ACTION__LOGIN: {
      const user = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case ACTION__LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return {...state};
    }
  }
};

export interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const history = useHistory();
  const location = useLocation<{returnUrl?: string}>();

  const login = useCallback(
    async (username: string, password: string, redirect = true) => {
      const {id, name, token} = await ApiService.login(username, password);

      setSession(token, id);

      const user = {
        id,
        name,
      };

      dispatch({
        type: ACTION__LOGIN,
        payload: user,
      });

      if (redirect) {
        const returnUrl = location.state?.returnUrl;
        history.replace(
          returnUrl && !returnUrl.endsWith(ROUTE__LOGIN)
            ? returnUrl
            : ROUTE__MAIN,
        );
      }
    },
    [history, location.state?.returnUrl],
  );

  const logout = useCallback(() => {
    setSession();
    dispatch({type: ACTION__LOGOUT});
    history.replace(ROUTE__LOGIN);
  }, [history]);

  const contextValue = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state, login, logout],
  );

  useEffect(() => {
    const initApp = () => {
      ApiService.init(logout);

      const redirectToLogin = () => {
        history.push(ROUTE__LOGIN, {
          returnUrl: `${location.pathname}${location.search}${location.hash}`,
        });
      };

      try {
        const accessToken = getAuthTokenFromLocalStorage();
        const userId = getUserIdFromLocalStorage();

        if (accessToken && userId) {
          // TODO Request current user info - check whether auth-ed or not
          const user = {
            id: userId,
            name: 'Alexey',
          };

          setSession(accessToken, userId);

          dispatch({
            type: ACTION__APP_INIT,
            payload: user,
          });

          if (location.pathname === ROUTE__LOGIN) {
            history.push(ROUTE__MAIN);
          }
        } else {
          redirectToLogin();

          dispatch({
            type: ACTION__APP_INIT,
            payload: null,
          });
        }
      } catch (err) {
        /* eslint-disable-next-line no-console */
        console.error(err);

        redirectToLogin();

        dispatch({
          type: ACTION__APP_INIT,
          payload: null,
        });
      }
    };

    initApp();

    // Call Api.uninit on unmount
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return ApiService.uninit;
    // Have to run this effect only once on the app startup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.isInitialised) {
    return <span>Loading...</span>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
