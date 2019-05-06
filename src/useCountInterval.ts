import { useState, useRef, useEffect } from 'react';

export default function useCountInterval(interval: number, initialCount: number = 0, stopped?: boolean, callback?: (count: number) => void) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [count, setCount] = useState(initialCount);
    useEffect(() => {
        if (!stopped) {
            timerRef.current = setInterval(() => setCount((lastCount) => {
                lastCount += 1;
                if (typeof callback === 'function')
                    callback(lastCount);
                return lastCount;
            }), interval);
        }
        return function cleanup() {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [stopped, interval]);
    return [count, setCount] as [typeof count, typeof setCount];
}
