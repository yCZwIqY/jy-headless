import { useCallback, useRef } from 'react';

const useThrottling = <T extends (...args: any[]) => void>(callback: T, delay: number): T => {
  const lastCalled = useRef<number>(0);

  return useCallback(
    (...args: any[]) => {
      const now = Date.now();
      if (now - lastCalled.current >= delay) {
        lastCalled.current = now;
        callback(...args);
      }
    },
    [callback, delay],
  ) as T;
};

export default useThrottling;
