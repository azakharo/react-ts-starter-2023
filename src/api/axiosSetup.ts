import axios, {AxiosError, CancelTokenSource} from 'axios';

export let axi = axios.create();

let requestInterceptor: number | null = null;

let responseInterceptor: number | null = null;

export const init = (unauthCallback: () => void): void => {
  // Add a request interceptor
  requestInterceptor = axi.interceptors.request.use(
    /* eslint-disable-next-line arrow-body-style */
    config => {
      // const url = config.url;
      //
      // if (something) {
      //   // Disable the following rule because need to update request data
      //   /* eslint-disable-next-line no-param-reassign */
      //   config.data = {
      //     ...config.data,
      //     ...something,
      //   };
      // }

      return config;
    },
  );

  // Add a response interceptor
  responseInterceptor = axi.interceptors.response.use(
    /* eslint-disable-next-line arrow-body-style */
    response => {
      // if (not authorized here or in the error handler) {
      //   const {data} = response;
      //   const {
      //     extract some data
      //   } = data;
      //
      //   if (INVALID_SESSION) {
      //     unauthCallback();
      //   }
      //
      //   throw normalizedError;
      // }

      return response;
    },
    (error: AxiosError) => {
      if (error?.response?.status === 401) {
        unauthCallback();
      }

      return Promise.reject(error);
    },
  );
};

export const uninit = (): void => {
  if (requestInterceptor) {
    axi.interceptors.request.eject(requestInterceptor);
    requestInterceptor = null;
  }

  if (responseInterceptor) {
    axi.interceptors.response.eject(responseInterceptor);
    responseInterceptor = null;
  }

  // AZA:
  // Looks like the ejects above do not work.
  // So, recreate axios instance from scratch.
  axi = axios.create();
};

// Initialization
//---------------------------------------------------------------------------

//= =======================================
// Request cancellation

export const createCancelToken = (): CancelTokenSource => {
  const {CancelToken} = axios;

  return CancelToken.source();
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const isRequestCancelled = (error: any): boolean => {
  return axios.isCancel(error);
};

// Request cancellation
//= =======================================
