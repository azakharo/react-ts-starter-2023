import axios from 'axios';

import {axi} from 'src/api/axiosSetup';
import {BASE_URL} from 'src/api/config';

export const login = async (
  username: string,
  password: string,
): Promise<{id: number; name: string; token: string}> => {
  let response;

  try {
    // For successful login use:
    // "username": "eve.holt@reqres.in",
    // "password": "cityslicka"
    response = await axi.post(`${BASE_URL}/api/login`, {
      email: username,
      password,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as {
        error: string;
      };
      const message = errorData?.error;

      throw new Error(message);
    } else {
      throw error;
    }
  }

  // Get something from the response's data or headers
  // Store it in ApiService if necessary for later usage

  const {token} = response.data as {token: string};

  return {
    id: 1,
    name: 'alexey',
    token,
  };
};

export const logout = (): Promise<void> => {
  return Promise.resolve();
};
