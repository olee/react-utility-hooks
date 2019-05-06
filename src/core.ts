import {
    useState,
    useRef,
    SetStateAction,
    useEffect,
} from 'react';

export function unwrapSetStateAction<T>(value: SetStateAction<T>, previousValue: T | undefined): T {
    return typeof value === 'function' ? (value as (p: T | undefined) => T)(previousValue) : value;
}

export function useConstant<T>(value: T) {
    return useRef<T>(value).current;
}

const EMPTY_CONSTANT = {} as any;

export function useConstantFactory<T>(factory: () => T) {
    const ref = useRef<T>(EMPTY_CONSTANT);
    if (ref.current === EMPTY_CONSTANT)
        ref.current = factory();
    return ref.current;
}

export function useIsMounted() {
    const resultRef = useRef(false);
    useEffect(() => {
        resultRef.current = true;
        return () => {
            resultRef.current = false;
        }
    }, []);
    return resultRef.current;
}

export function useForceUpdate() {
    const [, setValue] = useState(0);
    return useConstant(() => setValue(v => v + 1));
}
