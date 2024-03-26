// 编写useInterval自定义钩子
import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void | null>();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

export default useInterval;