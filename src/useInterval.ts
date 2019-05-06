import { useEffect, useRef } from 'react';

export default function useInterval(callback: () => void, delay: number) {
    // Remember the latest callback.
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    // Set up the interval.
    useEffect(() => {
        function tick() {
            callbackRef.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
