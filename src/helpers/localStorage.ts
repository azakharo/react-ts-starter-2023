// Loads and de-serializes data.
// Returns undefined on any error.
export const load = (key: string): Record<string, unknown> | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
