import { useMemo, useRef } from 'react';

export default function useMemoWithLastValue<T>(initializer: (prev?: T) => T, deps?: any[]) {
    const lastValueRef = useRef<T | undefined>(undefined);
    const value = useMemo(() => initializer(lastValueRef.current), [deps]);
    lastValueRef.current = value;
    return value;
}
