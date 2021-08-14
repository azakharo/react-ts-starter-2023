import {load as loadFromLocalStorage} from './localStorage';

const STATE_KEY = 'state';

export const loadState = (): Record<string, unknown> | undefined =>
  loadFromLocalStorage(STATE_KEY);

export const saveState = (state: Record<string, unknown>): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (err) {
    /* eslint-disable-next-line  no-console */
    console.exception(err);
  }
};
