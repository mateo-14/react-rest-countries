import { useEffect, useState } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(setDebouncedValue, delay, value);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
