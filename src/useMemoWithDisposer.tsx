import { useMemo, useRef, useEffect } from 'react';

export default function useMemoWithDisposer<T>(initializer: () => T, disposer: (value: T) => void, deps?: any[]) {
    const lastValueRef = useRef<T | undefined>(undefined);
    const value = useMemo(() => {
        if (lastValueRef.current !== undefined)
            disposer(lastValueRef.current);
        return initializer();
    }, deps);
    lastValueRef.current = value;
    useEffect(() => () => {
        if (lastValueRef.current !== undefined)
            disposer(lastValueRef.current);
    }, []);
    return value;
}
