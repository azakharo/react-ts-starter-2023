const KEY__AUTH_TOKEN = 'authToken';
const KEY__USER_ID = 'userId';

/// //////////////////////////////////////////////////////////////////
// User ID

export const getUserId = (): number | null => {
  const userId = localStorage.getItem(KEY__USER_ID);

  if (!userId) {
    return null;
  }

  return Number.parseInt(userId, 10);
};

export const setUserId = (id: number): void =>
  localStorage.setItem(KEY__USER_ID, id.toString());

export const remUserId = (): void => localStorage.removeItem(KEY__USER_ID);

/// //////////////////////////////////////////////////////////////////
// Auth Token

export const getAuthToken = (): string | null =>
  localStorage.getItem(KEY__AUTH_TOKEN);

export const setAuthToken = (token: string): void =>
  localStorage.setItem(KEY__AUTH_TOKEN, token);

export const remAuthToken = (): void =>
  localStorage.removeItem(KEY__AUTH_TOKEN);
