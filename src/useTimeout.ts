import { useState, useEffect } from 'react';

export default function useTimeout(delay: number, callback?: () => void) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const [timeouted, setTimeouted] = useState(false);
    useEffect(() => {
        timer = setTimeout(() => {
            timer = undefined;
            if (typeof callback === 'function')
                callback();
            setTimeouted(true);
        }, delay);
        return function cleanup() {
            if (timer)
                clearInterval(timer);
        };
    }, []);
    return timeouted;
}
