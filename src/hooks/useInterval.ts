import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // run the function
  useEffect(() => {
    savedCallback.current();
  }, []);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    savedCallback.current();
  }, [delay]);
}

export default useInterval;
