import { useCallback, useRef } from 'react';

const useDebouncing = <T extends (...args: any[]) => void>(callback: T, delay: number): T => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(() => {
    if (timer.current) clearTimeout(timer.current!);

    timer.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]) as T;
};

export default useDebouncing;
