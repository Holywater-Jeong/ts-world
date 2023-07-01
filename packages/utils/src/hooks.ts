import { useState, useEffect } from 'react';

type Debounce<T> = {
  value: T;
  delay: number;
};

export function useDebounce<T>({ value, delay }: Debounce<T>) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}
