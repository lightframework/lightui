import { useEffect, useState } from 'react';

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const initialState = (): T => {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}
