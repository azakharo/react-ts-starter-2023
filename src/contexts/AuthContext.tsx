import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {init as apiInit, login as apiLogin, uninit as apiUninit} from 'src/api';
import {ROUTE__LOGIN, ROUTE__MAIN} from 'src/constants/routes';
import {
  getAuthToken as getAuthTokenFromLocalStorage,
  getUserId as getUserIdFromLocalStorage,
  remAuthToken as remAuthTokenFromLocalStorage,
  remUserId as remUserIdFromLocalStorage,
  setAuthToken as putAuthTokenToLocalStorage,
  setUserId as putUserIdToLocalStorage,
} from 'src/helpers/localStorage';
import UserLoggedIn from 'src/types/UserLoggedIn';

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

interface LocationState {
  returnUrl?: string;
}

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const navigate = useNavigate();
  const location = useLocation();

  const login = useCallback(
    async (username: string, password: string, redirect = true) => {
      const {id, name, token} = await apiLogin(username, password);

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
        const locationState = location.state as LocationState;
        const returnUrl = locationState?.returnUrl;
        navigate(
          returnUrl && !returnUrl.endsWith(ROUTE__LOGIN)
            ? returnUrl
            : ROUTE__MAIN,
          {
            replace: true,
          },
        );
      }
    },
    [navigate, location.state],
  );

  const logout = useCallback(() => {
    setSession();
    dispatch({type: ACTION__LOGOUT});
    navigate(ROUTE__LOGIN, {
      replace: true,
    });
  }, [navigate]);

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
      apiInit(logout);

      const redirectToLogin = () => {
        navigate(ROUTE__LOGIN, {
          state: {
            returnUrl: `${location.pathname}${location.search}${location.hash}`,
          },
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
            navigate(ROUTE__MAIN);
          }
        } else {
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
    return apiUninit;
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
